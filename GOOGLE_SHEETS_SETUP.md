# Google Sheets RSVP Integration Setup Guide

This guide will help you set up direct Google Sheets integration for RSVP form submissions.

## Prerequisites

- A Google account
- Access to Google Cloud Console
- Your Google Sheet URL: `https://docs.google.com/spreadsheets/d/1Pkl0ZtshbOWe-aNHQceRRDNhfarLWpN2h-6WJLBMCek/edit`

## Step-by-Step Setup

### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Name it (e.g., "Riyhana RSVP")
4. Click "Create"

### 2. Enable Google Sheets API

1. In your project, go to **APIs & Services** → **Library**
2. Search for "Google Sheets API"
3. Click on it and press **Enable**

### 3. Create a Service Account

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **Service Account**
3. Fill in:
   - **Service account name**: `rsvp-sheets-writer` (or any name)
   - **Service account ID**: Auto-generated
   - Click **Create and Continue**
4. Skip role assignment (click **Continue**)
5. Click **Done**

### 4. Create and Download Service Account Key

1. In **Credentials**, find your service account
2. Click on it to open details
3. Go to the **Keys** tab
4. Click **Add Key** → **Create new key**
5. Choose **JSON** format
6. Click **Create** — the JSON file will download automatically
7. **Important**: Save this file securely (it contains sensitive credentials)

### 5. Share Your Google Sheet

1. Open your Google Sheet: `https://docs.google.com/spreadsheets/d/1Pkl0ZtshbOWe-aNHQceRRDNhfarLWpN2h-6WJLBMCek/edit`
2. Click the **Share** button (top right)
3. Copy the **service account email** from the downloaded JSON file (look for `"client_email"` field)
   - Example: `rsvp-sheets-writer@your-project.iam.gserviceaccount.com`
4. Paste it into the "Add people and groups" field
5. Give it **Editor** permissions
6. Uncheck "Notify people" (optional)
7. Click **Share**

### 6. Prepare Your Google Sheet

Make sure your sheet has these column headers in row 1:

| Timestamp | Full Name | Contact | Attendance | Guest Count | Meal Preference | Notes |
|-----------|-----------|---------|------------|-------------|-----------------|-------|

The sheet name should be `Sheet1` (or update `SHEET_RANGE` in `src/app/api/rsvp/route.ts`).

### 7. Configure Environment Variables

You have two options:

#### Option A: Use JSON String (Recommended for production)

1. Open your downloaded service account JSON file
2. Copy the entire contents
3. Create a `.env.local` file in your project root (if it doesn't exist)
4. Add:

```env
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account","project_id":"your-project-id","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"your-service-account@project.iam.gserviceaccount.com","client_id":"...","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"..."}

GOOGLE_SHEET_ID=1Pkl0ZtshbOWe-aNHQceRRDNhfarLWpN2h-6WJLBMCek
```

**Important**: The JSON must be on a single line. Replace all newlines in the private key with `\n`.

#### Option B: Use File Path (Easier for development)

1. Place your service account JSON file in your project (e.g., `credentials/google-service-account.json`)
2. Add to `.gitignore`:
   ```
   credentials/
   *.json
   ```
3. In `.env.local`:

```env
GOOGLE_SHEETS_CREDENTIALS_PATH=credentials/google-service-account.json

GOOGLE_SHEET_ID=1Pkl0ZtshbOWe-aNHQceRRDNhfarLWpN2h-6WJLBMCek
```

### 8. Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to the RSVP section
3. Fill out and submit the form
4. Check your Google Sheet — you should see a new row with the submitted data

## Troubleshooting

### Error: "GOOGLE_SHEETS_CREDENTIALS environment variable is not set"

- Make sure your `.env.local` file exists in the project root
- Restart your development server after adding environment variables
- Verify the variable names match exactly (case-sensitive)

### Error: "Failed to parse GOOGLE_SHEETS_CREDENTIALS JSON"

- If using Option A, ensure the JSON is on a single line
- Check that all quotes are properly escaped
- Verify the JSON is valid (use a JSON validator)

### Error: "The caller does not have permission"

- Verify you shared the Google Sheet with the service account email
- Check that the service account has "Editor" permissions
- Wait a few minutes after sharing (permissions can take time to propagate)

### Error: "Requested entity was not found"

- Verify the `GOOGLE_SHEET_ID` matches your sheet ID from the URL
- Check that the sheet exists and is accessible
- Ensure the sheet name matches `Sheet1` (or update `SHEET_RANGE`)

### No data appears in the sheet

- Check the browser console and server logs for errors
- Verify the sheet headers match exactly (case-sensitive)
- Ensure the sheet is not protected/restricted

## Security Notes

- **Never commit** your service account JSON file or `.env.local` to Git
- Keep your service account credentials secure
- Consider rotating keys periodically
- Limit the service account permissions to only what's needed

## Support

If you encounter issues, check:
1. Server logs (`npm run dev` output)
2. Browser console for client-side errors
3. Google Cloud Console → APIs & Services → Credentials for service account status
