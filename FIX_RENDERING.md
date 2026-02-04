# Fix Site Rendering Issues

## Quick Fix Steps:

1. **Clear Next.js cache and rebuild:**
   ```bash
   rm -rf .next
   npm run build
   ```

2. **If on Vercel, trigger a fresh deployment:**
   - Go to Vercel Dashboard
   - Settings → General → Clear Build Cache
   - Redeploy

3. **Verify CSS is loading:**
   - Check browser DevTools → Network tab
   - Look for `_next/static/css/` files
   - Ensure they're loading with 200 status

4. **Check for hydration errors:**
   - Open browser console
   - Look for React hydration warnings
   - Fix any mismatches between server and client HTML
