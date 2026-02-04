# How to Get Your Google Service Account JSON File

## Quick Steps

### 1. Go to Google Cloud Console
Visit: https://console.cloud.google.com/

### 2. Select or Create a Project
- If you already have a project, select it from the dropdown
- If not, click "Select a project" → "New Project"
- Name it (e.g., "Riyhana RSVP")
- Click "Create"

### 3. Enable Google Sheets API
1. In your project, go to **APIs & Services** → **Library**
2. Search for "Google Sheets API"
3. Click on it and press **Enable**

### 4. Create a Service Account
1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **Service Account**
3. Fill in:
   - **Service account name**: `rsvp-sheets-writer` (or any name)
   - **Service account ID**: Auto-generated
   - Click **Create and Continue**
4. Skip role assignment (click **Continue**)
5. Click **Done**

### 5. Create and Download the JSON Key
1. In **Credentials**, find your service account (click on the email address)
2. Go to the **Keys** tab
3. Click **Add Key** → **Create new key**
4. Choose **JSON** format
5. Click **Create** — **the JSON file will download automatically**

### 6. Save the File
1. The downloaded file will have a name like: `your-project-id-xxxxx.json`
2. **Rename it to**: `google-service-account.json`
3. **Move it to**: `credentials/google-service-account.json` in your project folder

### 7. Important: Save the Service Account Email
- Open the JSON file
- Find the `"client_email"` field
- **Copy this email address** - you'll need it to share your Google Sheet

Example email format:
```
rsvp-sheets-writer@your-project-id.iam.gserviceaccount.com
```

## What the JSON File Looks Like

Your downloaded JSON file will have this structure:

```json
{
  "type": "service_account",
  "project_id": "your-actual-project-id",
  "private_key_id": "abc123def456...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n",
  "client_email": "rsvp-sheets-writer@your-project-id.iam.gserviceaccount.com",
  "client_id": "123456789012345678901",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/rsvp-sheets-writer%40your-project-id.iam.gserviceaccount.com"
}
```

## Next Steps After Getting the JSON File

### Option A: For Local Development (Using File Path)
1. Place the file at: `credentials/google-service-account.json`
2. Create/update `.env.local`:
   ```env
   GOOGLE_SHEETS_CREDENTIALS_PATH=credentials/google-service-account.json
   GOOGLE_SHEET_ID=1Pkl0ZtshbOWe-aNHQceRRDNhfarLWpN2h-6WJLBMCek
   ```

### Option B: For Production/Vercel (Using JSON String)
1. Open the JSON file
2. Copy the entire contents
3. Use a JSON minifier: https://www.jsonformatter.org/json-minify
4. Paste and minify to get a single-line version
5. Add to Vercel Environment Variables:
   - Variable: `GOOGLE_SHEETS_CREDENTIALS`
   - Value: (paste the minified single-line JSON)
   - Variable: `GOOGLE_SHEET_ID`
   - Value: `1Pkl0ZtshbOWe-aNHQceRRDNhfarLWpN2h-6WJLBMCek`

### Don't Forget: Share Your Google Sheet
1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1Pkl0ZtshbOWe-aNHQceRRDNhfarLWpN2h-6WJLBMCek/edit
2. Click **Share** button
3. Paste the `client_email` from your JSON file
4. Give it **Editor** permissions
5. Click **Share**

## Security Notes

⚠️ **IMPORTANT**: 
- Never commit the JSON file to Git (it's already in `.gitignore`)
- Keep your credentials secure
- Don't share the JSON file publicly
- If compromised, delete the key and create a new one

## Troubleshooting

### "File not found" error
- Make sure the file is at: `credentials/google-service-account.json`
- Check the path in `.env.local` matches exactly

### "Invalid credentials" error
- Verify the JSON file is valid (use https://jsonlint.com/)
- Make sure you didn't modify the file contents
- Try downloading a new key from Google Cloud Console

### "Permission denied" error
- Make sure you shared the Google Sheet with the `client_email` from the JSON
- Verify the service account has "Editor" permissions
