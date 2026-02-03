# Quick Setup Checklist

Use this checklist to track your progress. Follow the detailed guide in `SETUP_STEP_BY_STEP.md` for complete instructions.

---

## ✅ Setup Checklist

### Step 1: Google Cloud Project
- [ ] Go to https://console.cloud.google.com/
- [ ] Create new project: "Riyhana RSVP"
- [ ] Select the project

### Step 2: Enable API
- [ ] Go to APIs & Services → Library
- [ ] Search "Google Sheets API"
- [ ] Click Enable

### Step 3: Service Account
- [ ] Go to APIs & Services → Credentials
- [ ] Click "+ CREATE CREDENTIALS" → "Service account"
- [ ] Name: `rsvp-sheets-writer`
- [ ] Click "Create and Continue"
- [ ] Click "Continue" (skip roles)
- [ ] Click "Done"

### Step 4: Download Credentials
- [ ] Click on your service account name
- [ ] Go to "Keys" tab
- [ ] Click "Add Key" → "Create new key"
- [ ] Select "JSON"
- [ ] Click "Create" (file downloads)
- [ ] **SAVE THE EMAIL** from the JSON file (`client_email` field)

### Step 5: Share Google Sheet
- [ ] Open: https://docs.google.com/spreadsheets/d/1Pkl0ZtshbOWe-aNHQceRRDNhfarLWpN2h-6WJLBMCek/edit
- [ ] Click "Share" button
- [ ] Paste service account email
- [ ] Set permission to "Editor"
- [ ] Uncheck "Notify people"
- [ ] Click "Share"
- [ ] Verify headers in Row 1: `Timestamp | Full Name | Contact | Attendance | Guest Count | Meal Preference | Notes`

### Step 6: Environment Variables
- [ ] Create `.env.local` file in project root
- [ ] Choose Option A (file path) OR Option B (JSON string)

**Option A (Easier):**
- [ ] Create `credentials/` folder
- [ ] Move JSON file to `credentials/google-service-account.json`
- [ ] Add to `.env.local`:
  ```
  GOOGLE_SHEETS_CREDENTIALS_PATH=credentials/google-service-account.json
  GOOGLE_SHEET_ID=1Pkl0ZtshbOWe-aNHQceRRDNhfarLWpN2h-6WJLBMCek
  ```

**Option B (Production):**
- [ ] Copy JSON content
- [ ] Convert to single line (use JSON minifier)
- [ ] Add to `.env.local`:
  ```
  GOOGLE_SHEETS_CREDENTIALS={...single-line-json...}
  GOOGLE_SHEET_ID=1Pkl0ZtshbOWe-aNHQceRRDNhfarLWpN2h-6WJLBMCek
  ```

### Step 7: Test
- [ ] Run `npm run dev`
- [ ] Go to http://localhost:3000
- [ ] Fill out RSVP form
- [ ] Submit form
- [ ] See confirmation message
- [ ] Check Google Sheet for new row

---

## 🔑 Important Information to Save

**Service Account Email:**
```
_________________________________________________
(Copy from JSON file: "client_email" field)
```

**Google Sheet ID:**
```
1Pkl0ZtshbOWe-aNHQceRRDNhfarLWpN2h-6WJLBMCek
```

**Google Sheet URL:**
```
https://docs.google.com/spreadsheets/d/1Pkl0ZtshbOWe-aNHQceRRDNhfarLWpN2h-6WJLBMCek/edit
```

---

## 🚨 Common Issues

| Issue | Solution |
|-------|----------|
| "Credentials not set" | Restart dev server after creating `.env.local` |
| "Permission denied" | Share sheet with service account email, set to Editor |
| "JSON parse error" | Check JSON is valid, single line (Option B) |
| "Sheet not found" | Verify `GOOGLE_SHEET_ID` matches your sheet URL |
| No data in sheet | Check server console for errors, verify headers match |

---

## 📝 Sheet Headers (Must Match Exactly)

| Column A | Column B | Column C | Column D | Column E | Column F | Column G |
|----------|----------|----------|----------|----------|----------|----------|
| Timestamp | Full Name | Contact | Attendance | Guest Count | Meal Preference | Notes |

---

**Ready to start?** Open `SETUP_STEP_BY_STEP.md` for detailed instructions! 🚀
