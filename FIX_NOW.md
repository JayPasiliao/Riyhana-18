# 🚀 FIX RSVP ERROR - Step by Step

Follow these steps **in order** to fix the RSVP error.

---

## ✅ Step 1: Add Environment Variables to Vercel

### 1.1 Go to Vercel Dashboard
1. Open: https://vercel.com/dashboard
2. Click on your project: **Riyhana18** (or your project name)
3. Go to **Settings** → **Environment Variables**

### 1.2 Add First Variable: `GOOGLE_SHEETS_CREDENTIALS`
1. Click **"Add New"** button
2. **Key**: `GOOGLE_SHEETS_CREDENTIALS`
3. **Value**: Copy the ENTIRE content from `credentials/google-service-account-minified.txt`
   - Open that file
   - Select ALL (Ctrl+A)
   - Copy (Ctrl+C)
   - Paste it here
4. **Environment**: Check ALL boxes ✅ Production ✅ Preview ✅ Development
5. Click **Save**

### 1.3 Add Second Variable: `GOOGLE_SHEET_ID`
1. Click **"Add New"** button again
2. **Key**: `GOOGLE_SHEET_ID`
3. **Value**: `1Pkl0ZtshbOWe-aNHQceRRDNhfarLWpN2h-6WJLBMCek`
4. **Environment**: Check ALL boxes ✅ Production ✅ Preview ✅ Development
5. Click **Save**

---

## ✅ Step 2: Share Google Sheet with Service Account

### 2.1 Open Your Google Sheet
Go to: https://docs.google.com/spreadsheets/d/1Pkl0ZtshbOWe-aNHQceRRDNhfarLWpN2h-6WJLBMCek/edit

### 2.2 Click Share Button
Click the **"Share"** button (top right corner, blue button)

### 2.3 Add Service Account Email
1. In the "Add people and groups" field, paste:
   ```
   riyhana-18@riyhana-2.iam.gserviceaccount.com
   ```
2. Click the dropdown next to it
3. Select **"Editor"** (NOT Viewer!)
4. **Uncheck** "Notify people" (optional)
5. Click **"Share"** button

### 2.4 Verify
You should see the service account email listed in the sharing dialog with "Editor" permission.

---

## ✅ Step 3: Redeploy Your Site

### Option A: Redeploy from Vercel Dashboard (Easiest)
1. Go to **Deployments** tab in Vercel
2. Find your latest deployment
3. Click the **"..."** (three dots) menu
4. Click **"Redeploy"**
5. Wait for deployment to complete (usually 1-2 minutes)

### Option B: Push a Commit (Alternative)
Open terminal in your project folder and run:
```bash
git commit --allow-empty -m "Fix RSVP - add environment variables"
git push
```
Then wait for Vercel to automatically deploy.

---

## ✅ Step 4: Test the RSVP Form

1. Visit your site: https://riyhana18.website
2. Scroll to the **RSVP** section
3. Fill out the form with test data:
   - Name: Test User
   - Contact Number: 1234567890
   - Email Address: test@example.com
   - Confirmation: Yes
   - (Other fields optional)
4. Click **"Submit RSVP"**
5. You should see: **"Thank you for responding!"** ✅
6. Check your Google Sheet - a new row should appear!

---

## 🔍 Troubleshooting

### Still seeing "RSVP service is temporarily unavailable"?

1. **Check Vercel Logs**:
   - Vercel Dashboard → Deployments → Latest deployment
   - Click on it → Go to **"Functions"** tab
   - Click on `/api/rsvp`
   - Look for error messages (they start with `✗`)

2. **Verify Environment Variables**:
   - Settings → Environment Variables
   - Make sure BOTH variables exist
   - Make sure they're enabled for **Production**
   - Click on each variable to verify the values are correct

3. **Check Sheet Sharing**:
   - Open your Google Sheet
   - Click Share button
   - Verify `riyhana-18@riyhana-2.iam.gserviceaccount.com` is listed
   - Verify it has **Editor** permission (not Viewer)
   - Wait 2-3 minutes after sharing (permissions can take time)

4. **Verify Sheet ID**:
   - Make sure `GOOGLE_SHEET_ID` value is exactly: `1Pkl0ZtshbOWe-aNHQceRRDNhfarLWpN2h-6WJLBMCek`
   - No extra spaces or characters

---

## 📋 Quick Reference

**Service Account Email:**
```
riyhana-18@riyhana-2.iam.gserviceaccount.com
```

**Google Sheet ID:**
```
1Pkl0ZtshbOWe-aNHQceRRDNhfarLWpN2h-6WJLBMCek
```

**Google Sheet URL:**
```
https://docs.google.com/spreadsheets/d/1Pkl0ZtshbOWe-aNHQceRRDNhfarLWpN2h-6WJLBMCek/edit
```

**Credentials File:**
```
credentials/google-service-account-minified.txt
```

---

## ✅ Success Checklist

- [ ] Added `GOOGLE_SHEETS_CREDENTIALS` to Vercel
- [ ] Added `GOOGLE_SHEET_ID` to Vercel
- [ ] Shared Google Sheet with service account email
- [ ] Service account has Editor permission
- [ ] Redeployed the site
- [ ] Tested RSVP form - it works! ✅

---

**That's it!** Follow these steps and your RSVP form will work! 🎉
