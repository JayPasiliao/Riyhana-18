import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { readFileSync } from "fs";
import { join } from "path";

/**
 * Saves RSVP form data directly to Google Sheets.
 * 
 * Required environment variables:
 * - GOOGLE_SHEETS_CREDENTIALS: JSON string of service account credentials
 *   OR GOOGLE_SHEETS_CREDENTIALS_PATH: Path to credentials JSON file
 * - GOOGLE_SHEET_ID: The Google Sheet ID (from the sheet URL)
 * 
 * Sheet headers: Name | Address | Contact Number | Email Address | Facebook Profile | Confirmation | Message | No. of Guest | Relationship
 * 
 * Setup instructions:
 * 1. Create a service account in Google Cloud Console
 * 2. Enable Google Sheets API for your project
 * 3. Download the service account JSON key
 * 4. Share your Google Sheet with the service account email (found in the JSON)
 * 5. Set GOOGLE_SHEETS_CREDENTIALS to the JSON string OR GOOGLE_SHEETS_CREDENTIALS_PATH to file path
 * 6. Set GOOGLE_SHEET_ID to your sheet ID
 */

const SHEET_ID = process.env.GOOGLE_SHEET_ID || "1Pkl0ZtshbOWe-aNHQceRRDNhfarLWpN2h-6WJLBMCek";
const SHEET_RANGE = "Sheet1!A:I"; // Name | Address | Contact Number | Email | Facebook | Confirmation | Message | Guest Count | Relationship

async function getAuthClient() {
  // Don't fail the entire site if credentials aren't configured - return null and handle gracefully
  const credentialsPath = process.env.GOOGLE_SHEETS_CREDENTIALS_PATH;
  const credentialsJson = process.env.GOOGLE_SHEETS_CREDENTIALS;
  
  let credentials;

  // Try reading from file path first (for local development)
  if (credentialsPath) {
    try {
      const filePath = join(process.cwd(), credentialsPath);
      const fileContent = readFileSync(filePath, "utf-8");
      credentials = JSON.parse(fileContent);
      console.log("✓ Loaded credentials from file:", credentialsPath);
    } catch (err) {
      console.error(`✗ Failed to read credentials file at ${credentialsPath}:`, err);
      return null; // Return null instead of throwing to prevent site crash
    }
  } 
  // Otherwise try environment variable (for production/Vercel)
  else if (credentialsJson) {
    try {
      credentials = typeof credentialsJson === "string" 
        ? JSON.parse(credentialsJson) 
        : credentialsJson;
      console.log("✓ Loaded credentials from environment variable");
    } catch (err) {
      console.error("✗ Failed to parse GOOGLE_SHEETS_CREDENTIALS JSON:", err);
      return null; // Return null instead of throwing
    }
  } else {
    console.error("✗ Google Sheets credentials not configured. Set GOOGLE_SHEETS_CREDENTIALS or GOOGLE_SHEETS_CREDENTIALS_PATH");
    return null; // Return null instead of throwing
  }

  // Validate credentials structure
  if (!credentials.client_email || !credentials.private_key) {
    console.error("✗ Invalid credentials: missing client_email or private_key");
    return null;
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    return auth;
  } catch (err) {
    console.error("✗ Failed to create Google Auth client:", err);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, address, contactNumber, emailAddress, facebookProfile, confirmation, message, guestCount, relationship } = body;

    // Validate required fields
    if (!name || !contactNumber || !emailAddress || !confirmation) {
      return NextResponse.json(
        { error: "Missing required fields: name, contactNumber, emailAddress, confirmation" },
        { status: 400 }
      );
    }

    const auth = await getAuthClient();
    if (!auth) {
      console.error("RSVP submission failed: Google Sheets credentials not configured");
      return NextResponse.json(
        { error: "RSVP service is temporarily unavailable. Please try again later." },
        { status: 503 }
      );
    }

    let sheets;
    try {
      sheets = google.sheets({ version: "v4", auth });
    } catch (err) {
      console.error("Failed to initialize Google Sheets client:", err);
      return NextResponse.json(
        { error: "RSVP service is temporarily unavailable. Please try again later." },
        { status: 503 }
      );
    }

    // Prepare row data matching sheet headers: Name | Address | Contact Number | Email Address | Facebook Profile | Confirmation | Message | No. of Guest | Relationship
    const values = [[
      name.trim(),
      address.trim() || "",
      contactNumber.trim(),
      emailAddress.trim(),
      facebookProfile.trim() || "",
      confirmation,
      message.trim() || "",
      guestCount || 1,
      relationship.trim() || "",
    ]];

    // Append the row to the sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: SHEET_RANGE,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values,
      },
    });

    if (!response.data) {
      throw new Error("No response from Google Sheets API");
    }

    console.log("✓ RSVP submitted successfully to Google Sheets");
    return NextResponse.json({ 
      success: true,
      message: "RSVP submitted successfully"
    });
  } catch (err) {
    console.error("✗ RSVP submission error:", err);
    
    // Provide more specific error messages for common issues
    let errorMessage = "Failed to submit RSVP. Please try again.";
    let statusCode = 500;

    if (err instanceof Error) {
      const errorMsg = err.message.toLowerCase();
      
      // Check for permission errors
      if (errorMsg.includes("permission") || errorMsg.includes("does not have permission")) {
        errorMessage = "RSVP service configuration error. Please contact the administrator.";
        console.error("Permission error - ensure the Google Sheet is shared with the service account email");
      }
      // Check for sheet not found errors
      else if (errorMsg.includes("not found") || errorMsg.includes("spreadsheet")) {
        errorMessage = "RSVP service configuration error. Please contact the administrator.";
        console.error("Sheet not found - verify GOOGLE_SHEET_ID is correct");
      }
      // Check for authentication errors
      else if (errorMsg.includes("auth") || errorMsg.includes("credential") || errorMsg.includes("invalid")) {
        errorMessage = "RSVP service is temporarily unavailable. Please try again later.";
        statusCode = 503;
        console.error("Authentication error - verify credentials are correct");
      }
      else {
        errorMessage = err.message;
      }
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    );
  }
}
