# Quick Setup for Vercel - Copy & Paste Ready! 🚀

## Step 1: Copy the Minified JSON

I've created a minified version of your credentials. Open this file:
- `credentials/google-service-account-minified.txt`

**Copy the entire contents** (it's all on one line).

## Step 2: Add to Vercel Environment Variables

1. Go to: https://vercel.com/dashboard
2. Select your project: **riyhana18** (or your project name)
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**

### Variable 1: `GOOGLE_SHEETS_CREDENTIALS`
- **Key**: `GOOGLE_SHEETS_CREDENTIALS`
- **Value**: Paste the entire content from `google-service-account-minified.txt`
- **Environment**: ✅ Production ✅ Preview ✅ Development (select all)
- Click **Save**

### Variable 2: `GOOGLE_SHEET_ID`
- **Key**: `GOOGLE_SHEET_ID`
- **Value**: `1Pkl0ZtshbOWe-aNHQceRRDNhfarLWpN2h-6WJLBMCek`
- **Environment**: ✅ Production ✅ Preview ✅ Development (select all)
- Click **Save**

## Step 3: Verify Google Sheet Sharing

**Important**: Make sure your Google Sheet is shared with the service account!

1. Open your Google Sheet:
   https://docs.google.com/spreadsheets/d/1Pkl0ZtshbOWe-aNHQceRRDNhfarLWpN2h-6WJLBMCek/edit

2. Click **Share** button (top right)

3. Add this email: `riyhana-18@riyhana-2.iam.gserviceaccount.com`

4. Set permission to **Editor**

5. Uncheck "Notify people" (optional)

6. Click **Share**

## Step 4: Redeploy

After adding the environment variables:

1. Go to **Deployments** tab
2. Click **"..."** on your latest deployment
3. Click **Redeploy**
4. Wait for it to finish

**OR** push a commit:
```bash
git commit --allow-empty -m "Add environment variables"
git push
```

## Step 5: Test! 🎉

1. Visit: https://riyhana18.website
2. Go to RSVP section
3. Fill out the form
4. Submit
5. Check your Google Sheet - you should see a new row!

## Troubleshooting

### Still seeing "RSVP service is temporarily unavailable"?

1. **Check Vercel logs**:
   - Dashboard → Deployments → Latest deployment → Functions → `/api/rsvp`
   - Look for error messages

2. **Verify variables are set**:
   - Settings → Environment Variables
   - Make sure both variables exist
   - Make sure they're enabled for **Production**

3. **Check sheet sharing**:
   - Verify `riyhana-18@riyhana-2.iam.gserviceaccount.com` has Editor access
   - Wait a few minutes after sharing (permissions can take time)

---

**That's it!** Your RSVP form should now work in production! 🎊
