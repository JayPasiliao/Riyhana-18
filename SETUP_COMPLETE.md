# ✅ Google Sheets Integration - Setup Complete!

Your RSVP form is now configured to save directly to your Google Sheet.

## What Was Done

1. ✅ **Credentials File Secured**
   - Moved from `public/Background/` to `credentials/google-service-account.json`
   - This prevents the credentials from being publicly accessible

2. ✅ **Form Updated**
   - Form now collects all fields matching your Google Sheet:
     - Name (required)
     - Address
     - Contact Number (required)
     - Email Address (required)
     - Facebook Profile
     - Confirmation (Yes/No - required)
     - No. of Guest (1-10)
     - Relationship
     - Message

3. ✅ **API Route Updated**
   - Maps form data to correct sheet columns
   - Validates required fields
   - Saves to: `1Pkl0ZtshbOWe-aNHQceRRDNhfarLWpN2h-6WJLBMCek`

4. ✅ **Environment Configured**
   - Created `.env.local` with credentials path and sheet ID

## ⚠️ IMPORTANT: Share Your Google Sheet

**You MUST share your Google Sheet with the service account email:**

**Service Account Email:**
```
riyhana-18@riyhana-2.iam.gserviceaccount.com
```

### How to Share:

1. Open your Google Sheet:
   https://docs.google.com/spreadsheets/d/1Pkl0ZtshbOWe-aNHQceRRDNhfarLWpN2h-6WJLBMCek/edit

2. Click the **"Share"** button (top right)

3. Paste this email: `riyhana-18@riyhana-2.iam.gserviceaccount.com`

4. Set permission to **"Editor"**

5. Uncheck "Notify people" (optional)

6. Click **"Share"**

## Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Go to: http://localhost:3000

3. Navigate to the RSVP section

4. Fill out the form with test data

5. Click "Submit RSVP"

6. Check your Google Sheet - you should see a new row!

## Sheet Column Mapping

| Column | Field | Required |
|--------|-------|----------|
| A | Name | ✅ Yes |
| B | Address | No |
| C | Contact Number | ✅ Yes |
| D | Email Address | ✅ Yes |
| E | Facebook Profile | No |
| F | Confirmation | ✅ Yes |
| G | Message | No |
| H | No. of Guest | No (defaults to 1) |
| I | Relationship | No |

## Troubleshooting

**If you see "Permission denied" error:**
- Make sure you shared the sheet with `riyhana-18@riyhana-2.iam.gserviceaccount.com`
- Set permissions to "Editor"
- Wait a few minutes after sharing (permissions can take time)

**If data doesn't appear:**
- Check the browser console for errors
- Check the server console (terminal where `npm run dev` is running)
- Verify the sheet headers match exactly (case-sensitive)

**If you see "Credentials not found":**
- Make sure `.env.local` exists in the project root
- Restart your dev server after creating `.env.local`

## Files Changed

- ✅ `src/components/RSVPForm.tsx` - Updated form fields
- ✅ `src/app/api/rsvp/route.ts` - Updated API mapping
- ✅ `.env.local` - Created with configuration
- ✅ `credentials/google-service-account.json` - Credentials file (secure location)

## Security Notes

- ✅ Credentials file is NOT in the public folder (secure)
- ✅ `.env.local` is in `.gitignore` (won't be committed)
- ✅ `credentials/` folder is in `.gitignore` (won't be committed)

---

**You're all set!** Just share the Google Sheet with the service account email and you're ready to go! 🎉
