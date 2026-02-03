# Complete Step-by-Step Google Sheets Setup Guide

Follow these instructions exactly to set up RSVP form submissions to your Google Sheet.

---

## Step 1: Create a Google Cloud Project

### 1.1 Go to Google Cloud Console
1. Open your web browser
2. Go to: **https://console.cloud.google.com/**
3. Sign in with your Google account (the same account that owns the Google Sheet)

### 1.2 Create New Project
1. At the top of the page, click the **project dropdown** (it may show "Select a project" or your current project name)
2. Click **"New Project"** button
3. In the "New Project" window:
   - **Project name**: Enter `Riyhana RSVP` (or any name you prefer)
   - **Organization**: Leave as default (or select if you have one)
   - **Location**: Leave as default
4. Click **"Create"** button
5. Wait for the project to be created (usually 10-30 seconds)
6. You'll see a notification: "Project created successfully"

### 1.3 Select Your Project
1. Make sure your new project is selected in the project dropdown at the top
2. If not, click the dropdown and select "Riyhana RSVP"

---

## Step 2: Enable Google Sheets API

### 2.1 Navigate to API Library
1. In the left sidebar, hover over **"APIs & Services"**
2. Click **"Library"** (or go directly to: https://console.cloud.google.com/apis/library)

### 2.2 Search for Google Sheets API
1. In the search bar at the top, type: **"Google Sheets API"**
2. Click on **"Google Sheets API"** from the search results

### 2.3 Enable the API
1. On the Google Sheets API page, click the blue **"Enable"** button
2. Wait for the API to be enabled (usually 5-10 seconds)
3. You'll see a confirmation message and the page will show "API enabled"

---

## Step 3: Create a Service Account

### 3.1 Navigate to Credentials
1. In the left sidebar, click **"APIs & Services"**
2. Click **"Credentials"** (or go to: https://console.cloud.google.com/apis/credentials)

### 3.2 Create Service Account
1. At the top of the page, click **"+ CREATE CREDENTIALS"** button
2. From the dropdown menu, select **"Service account"**

### 3.3 Fill in Service Account Details
1. **Service account name**: Enter `rsvp-sheets-writer` (or any name)
2. **Service account ID**: This will auto-fill based on the name (you can leave it as is)
3. **Service account description** (optional): Enter `Service account for RSVP form submissions`
4. Click **"Create and Continue"** button

### 3.4 Skip Role Assignment (Optional)
1. On the "Grant this service account access to project" page:
   - You can skip this step for now
   - Click **"Continue"** button
   - Or assign a role like "Editor" if you want (not required)

### 3.5 Complete Service Account Creation
1. On the "Grant users access to this service account" page:
   - You can skip this step
   - Click **"Done"** button
2. You'll be redirected to the Credentials page
3. You should see your new service account listed

---

## Step 4: Create and Download Service Account Key

### 4.1 Open Service Account Details
1. In the Credentials page, find your service account (named `rsvp-sheets-writer`)
2. Click on the service account name to open its details

### 4.2 Navigate to Keys Tab
1. In the service account details page, click the **"Keys"** tab at the top
2. You'll see an empty list of keys

### 4.3 Create New Key
1. Click **"Add Key"** button
2. Select **"Create new key"** from the dropdown

### 4.4 Choose Key Type
1. A popup window will appear
2. Select **"JSON"** (this is important!)
3. Click **"Create"** button

### 4.5 Download the Key File
1. A JSON file will automatically download to your computer
2. The file will be named something like: `rsvp-sheets-writer-xxxxx-xxxxx.json`
3. **IMPORTANT**: Save this file in a safe location (e.g., your Downloads folder or Desktop)
4. **DO NOT** share this file publicly or commit it to Git

### 4.6 Note the Service Account Email
1. Open the downloaded JSON file in a text editor (Notepad, VS Code, etc.)
2. Find the line that says `"client_email":`
3. Copy the email address (it will look like: `rsvp-sheets-writer@your-project-id.iam.gserviceaccount.com`)
4. **Save this email** - you'll need it in the next step
   - Example: `rsvp-sheets-writer@riyhana-rsvp-123456.iam.gserviceaccount.com`

---

## Step 5: Share Your Google Sheet with Service Account

### 5.1 Open Your Google Sheet
1. Go to: **https://docs.google.com/spreadsheets/d/1Pkl0ZtshbOWe-aNHQceRRDNhfarLWpN2h-6WJLBMCek/edit**
2. Make sure you're signed in with the same Google account

### 5.2 Open Share Settings
1. Click the **"Share"** button in the top-right corner of the sheet
2. A "Share with people and groups" window will appear

### 5.3 Add Service Account Email
1. In the "Add people and groups" field, paste the service account email you copied in Step 4.6
   - Example: `rsvp-sheets-writer@riyhana-rsvp-123456.iam.gserviceaccount.com`
2. Click on the email field to ensure it's entered correctly

### 5.4 Set Permissions
1. Next to the email, click the dropdown that says **"Viewer"**
2. Change it to **"Editor"** (this allows the service account to write data)
3. **Uncheck** the "Notify people" checkbox (optional, but recommended since it's a service account)

### 5.5 Complete Sharing
1. Click the **"Share"** button
2. The service account email should now appear in the "People with access" list
3. Close the share window

### 5.6 Verify Sheet Headers
Make sure your Google Sheet has these exact column headers in **Row 1**:

| Column A | Column B | Column C | Column D | Column E | Column F | Column G |
|----------|----------|----------|----------|----------|----------|----------|
| Timestamp | Full Name | Contact | Attendance | Guest Count | Meal Preference | Notes |

If your headers are different, update them to match exactly (case-sensitive).

---

## Step 6: Configure Environment Variables

### 6.1 Locate Your Project Folder
1. Navigate to your project folder: `d:\Riyhanna at 18`
2. Make sure you're in the root directory (where `package.json` is located)

### 6.2 Create .env.local File
1. In the project root, create a new file named: `.env.local`
   - **Important**: The file must start with a dot (`.env.local`)
   - If you're using Windows, you may need to create it as `env.local` first, then rename it to `.env.local`
   - Or use VS Code: File → New File → Save as `.env.local`

### 6.3 Choose Configuration Method

You have **two options**. Choose the one that's easier for you:

---

### **Option A: Using File Path (EASIER - Recommended)**

#### 6.3A.1 Create Credentials Folder
1. In your project root (`d:\Riyhanna at 18`), create a new folder named: `credentials`
2. Move your downloaded JSON file into this folder
3. Rename it to: `google-service-account.json` (optional, but cleaner)

#### 6.3A.2 Add to .env.local
Open `.env.local` and add these lines:

```env
GOOGLE_SHEETS_CREDENTIALS_PATH=credentials/google-service-account.json

GOOGLE_SHEET_ID=1Pkl0ZtshbOWe-aNHQceRRDNhfarLWpN2h-6WJLBMCek
```

**Important**: 
- Replace `google-service-account.json` with your actual filename if different
- Make sure there are no extra spaces or quotes
- Save the file

---

### **Option B: Using JSON String (For Production)**

#### 6.3B.1 Prepare JSON String
1. Open your downloaded JSON file in a text editor
2. Select all content (Ctrl+A) and copy it (Ctrl+C)
3. The JSON should look like this:
```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "rsvp-sheets-writer@...",
  ...
}
```

#### 6.3B.2 Convert to Single Line
1. You need to convert this multi-line JSON to a single line
2. Remove all line breaks and extra spaces
3. Replace actual newlines in the private key with `\n`
4. The result should be one continuous line

**Easier method**: Use an online JSON minifier:
- Go to: https://www.jsonformatter.org/json-minify
- Paste your JSON
- Click "Minify"
- Copy the result

#### 6.3B.3 Add to .env.local
Open `.env.local` and add:

```env
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account","project_id":"your-project-id","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n","client_email":"rsvp-sheets-writer@...","client_id":"...","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"..."}

GOOGLE_SHEET_ID=1Pkl0ZtshbOWe-aNHQceRRDNhfarLWpN2h-6WJLBMCek
```

**Important**:
- Replace the entire JSON string with your actual credentials
- Make sure it's all on one line
- Escape backslashes: `\n` becomes `\\n` in the private key
- No quotes around the entire value
- Save the file

---

## Step 7: Verify Setup

### 7.1 Check Your Files
Make sure you have:
- ✅ `.env.local` file in project root with environment variables
- ✅ Service account JSON file (either in `credentials/` folder or referenced in `.env.local`)
- ✅ Google Sheet shared with service account email

### 7.2 Test the Integration
1. Open a terminal/command prompt
2. Navigate to your project: `cd "d:\Riyhanna at 18"`
3. Start the development server: `npm run dev`
4. Wait for the server to start (you'll see "Ready" message)
5. Open your browser and go to: `http://localhost:3000`
6. Navigate to the RSVP section
7. Fill out the form with test data:
   - Full Name: `Test User`
   - Contact: `test@example.com`
   - Attendance: `Yes`
   - Guest Count: `1`
   - Meal Preference: `Chicken`
   - Notes: `Test submission`
8. Click **"Submit RSVP"**
9. You should see a confirmation message: "Thank you for responding!"
10. Open your Google Sheet and check if a new row was added

### 7.3 Troubleshooting

**If you see an error:**

- **"GOOGLE_SHEETS_CREDENTIALS environment variable is not set"**
  - Make sure `.env.local` exists in the project root
  - Restart your dev server (`npm run dev`)
  - Check for typos in variable names

- **"Failed to parse GOOGLE_SHEETS_CREDENTIALS JSON"**
  - If using Option B, verify the JSON is valid and on one line
  - Check that backslashes are escaped (`\\n` not `\n`)

- **"The caller does not have permission"**
  - Verify you shared the sheet with the service account email
  - Make sure permissions are set to "Editor"
  - Wait a few minutes after sharing (permissions can take time)

- **"Requested entity was not found"**
  - Check that `GOOGLE_SHEET_ID` matches your sheet ID
  - Verify the sheet exists and is accessible

---

## Step 8: Security Checklist

Before deploying to production:

- ✅ `.env.local` is in `.gitignore` (already configured)
- ✅ `credentials/` folder is in `.gitignore` (already configured)
- ✅ Service account JSON file is NOT committed to Git
- ✅ Service account has minimal permissions (only Editor on the specific sheet)
- ✅ You've tested the integration successfully

---

## Quick Reference

**Service Account Email Format:**
```
your-service-account-name@your-project-id.iam.gserviceaccount.com
```

**Google Sheet ID:**
```
1Pkl0ZtshbOWe-aNHQceRRDNhfarLWpN2h-6WJLBMCek
```

**Required Sheet Headers (Row 1):**
```
Timestamp | Full Name | Contact | Attendance | Guest Count | Meal Preference | Notes
```

---

## Need Help?

If you encounter issues:
1. Check the server console for error messages
2. Verify all environment variables are set correctly
3. Ensure the service account email matches exactly
4. Confirm the Google Sheet is shared with Editor permissions
5. Wait a few minutes after sharing (permissions can take time to propagate)

---

**You're all set!** Your RSVP form will now save submissions directly to your Google Sheet. 🎉
