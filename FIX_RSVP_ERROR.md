# Fix RSVP Error: "RSVP service is temporarily unavailable"

## Problem
The RSVP form shows the error: **"RSVP service is temporarily unavailable. Please try again later."**

This happens because Google Sheets credentials are not configured in your production environment (Vercel).

## Quick Fix for Production (Vercel)

### Step 1: Get Your Google Service Account Credentials

If you already have credentials:
1. Locate your service account JSON file (from `credentials/google-service-account.json` or your downloads)
2. Open it in a text editor

If you don't have credentials yet, follow the setup guide in `GOOGLE_SHEETS_SETUP.md`

### Step 2: Prepare Credentials for Vercel

**Important**: Vercel requires credentials as a JSON string (not a file path).

1. Open your service account JSON file
2. Copy the entire JSON content
3. Use an online JSON minifier to convert it to a single line:
   - Go to: https://www.jsonformatter.org/json-minify
   - Paste your JSON
   - Click "Minify"
   - Copy the result

**Example format:**
```json
{"type":"service_account","project_id":"your-project","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"your-service-account@project.iam.gserviceaccount.com",...}
```

### Step 3: Add Environment Variables in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: **riyhana18** (or your project name)
3. Go to **Settings** → **Environment Variables**
4. Add these two variables:

#### Variable 1: `GOOGLE_SHEETS_CREDENTIALS`
- **Name**: `GOOGLE_SHEETS_CREDENTIALS`
- **Value**: Paste your minified JSON string (the entire credentials as one line)
- **Environment**: Select all (Production, Preview, Development)
- Click **Save**

#### Variable 2: `GOOGLE_SHEET_ID`
- **Name**: `GOOGLE_SHEET_ID`
- **Value**: `1Pkl0ZtshbOWe-aNHQceRRDNhfarLWpN2h-6WJLBMCek`
- **Environment**: Select all (Production, Preview, Development)
- Click **Save**

### Step 4: Verify Google Sheet Sharing

Make sure your Google Sheet is shared with the service account email:

1. Open your Google Sheet:
   https://docs.google.com/spreadsheets/d/1Pkl0ZtshbOWe-aNHQceRRDNhfarLWpN2h-6WJLBMCek/edit

2. Click **Share** (top right)

3. Find the `client_email` field in your JSON credentials file
   - Example: `riyhana-18@riyhana-2.iam.gserviceaccount.com`

4. Add that email address with **Editor** permissions

5. Uncheck "Notify people" (optional)

6. Click **Share**

### Step 5: Redeploy

After adding environment variables:

1. Go to **Deployments** tab in Vercel
2. Click the **"..."** menu on your latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

**OR** simply push a new commit to trigger a redeploy:
```bash
git commit --allow-empty -m "Trigger redeploy for RSVP fix"
git push
```

### Step 6: Test

1. Visit your site: https://riyhana18.website
2. Navigate to the RSVP section
3. Fill out the form
4. Submit
5. Check your Google Sheet - you should see a new row!

## Troubleshooting

### Still seeing the error?

1. **Check Vercel logs**:
   - Go to Vercel Dashboard → Your Project → Deployments
   - Click on the latest deployment
   - Go to **Functions** tab
   - Check logs for `/api/rsvp` route
   - Look for error messages starting with `✗`

2. **Verify environment variables**:
   - In Vercel Dashboard → Settings → Environment Variables
   - Make sure both variables are set
   - Make sure they're enabled for **Production** environment
   - The JSON string should be on ONE line (no line breaks)

3. **Check Google Sheet permissions**:
   - Verify the service account email has **Editor** access
   - Wait a few minutes after sharing (permissions can take time)

4. **Verify sheet ID**:
   - Make sure `GOOGLE_SHEET_ID` matches your sheet URL
   - Sheet URL format: `https://docs.google.com/spreadsheets/d/SHEET_ID/edit`

5. **Check sheet headers**:
   - Your sheet should have these headers in Row 1:
   - `Name | Address | Contact Number | Email Address | Facebook Profile | Confirmation | Message | No. of Guest | Relationship`

## Common Errors

### "Failed to parse GOOGLE_SHEETS_CREDENTIALS JSON"
- The JSON string has syntax errors
- Make sure it's on a single line
- Use a JSON validator to check: https://jsonlint.com/

### "Permission denied" or "does not have permission"
- The Google Sheet is not shared with the service account email
- Check the `client_email` field in your credentials JSON
- Share the sheet with that email address

### "Spreadsheet not found"
- The `GOOGLE_SHEET_ID` is incorrect
- Verify the ID from your sheet URL

## Need Help?

Check the detailed setup guide: `GOOGLE_SHEETS_SETUP.md`
