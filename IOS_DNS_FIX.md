# iOS Safari "Server Can't Be Found" - DNS Configuration Fix

## Problem
iOS Safari shows "server can't be found" error while Windows and Android work fine. This is a **DNS/server configuration issue**, not a code problem.

## Root Cause
iOS Safari prefers IPv6 (AAAA records) for DNS resolution, but Vercel (and most hosting providers) only support IPv4. When iOS tries to connect via IPv6, it fails.

## Solution: DNS Configuration

### If Using Vercel (Most Likely)

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Select your project: `Riyhana-18`

2. **Check Domain Configuration**
   - Go to **Settings** → **Domains**
   - Verify `riyhana18.website` is added
   - Check DNS records

3. **DNS Records Required (IPv4 ONLY)**
   
   **For apex domain (riyhana18.website):**
   - Type: `A`
   - Name: `@` or blank
   - Value: Vercel's IPv4 addresses (check Vercel dashboard for current IPs)
   - TTL: 3600

   **For www subdomain (www.riyhana18.website):**
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com` (or your Vercel CNAME)
   - TTL: 3600

4. **CRITICAL: Remove AAAA Records**
   - Go to your DNS provider (where you manage riyhana18.website)
   - **Delete any AAAA records** (IPv6 records)
   - iOS will try IPv6 first, and if it exists but points nowhere, it fails
   - Only keep A records (IPv4)

5. **Verify SSL Certificate**
   - In Vercel Dashboard → Settings → Domains
   - Ensure SSL certificate is issued and valid
   - Wait for certificate provisioning (can take a few minutes)

### If Using Other Hosting Provider

1. **Check DNS Settings**
   - Ensure only IPv4 (A) records exist
   - Remove any AAAA (IPv6) records
   - Verify CNAME records point correctly

2. **Check SSL Certificate**
   - Ensure valid SSL certificate is installed
   - iOS Safari is strict about SSL

## Testing After DNS Changes

1. **Wait for DNS Propagation** (15 minutes to 48 hours)
   - Use: https://dnschecker.org
   - Check `riyhana18.website` globally
   - Verify only A records exist (no AAAA)

2. **Test on iOS Device**
   - Clear Safari cache: Settings → Safari → Clear History and Website Data
   - Try accessing: https://riyhana18.website
   - If still fails, try: http://riyhana18.website (to test if SSL is the issue)

3. **Test DNS Resolution**
   - On iOS device, try: `nslookup riyhana18.website`
   - Should return IPv4 addresses only
   - No IPv6 addresses should appear

## Alternative Quick Fix

If DNS changes take too long, you can temporarily:

1. **Use Vercel's Default Domain**
   - Access via: `riyhana-18.vercel.app`
   - This should work on iOS immediately
   - Then fix DNS for custom domain

2. **Check Vercel Project Settings**
   - Ensure domain is properly connected
   - Check for any domain verification requirements

## Code Changes Made

I've removed the problematic rewrite rule from `vercel.json` that could cause routing issues. The file now only contains safe headers.

## Next Steps

1. **Fix DNS** (most important):
   - Remove AAAA records
   - Ensure only A records exist
   - Wait for propagation

2. **Verify SSL** in Vercel dashboard

3. **Test** on iOS device after DNS propagates

4. **If still failing**, check Vercel deployment logs for errors

## Contact Vercel Support

If DNS is correct but iOS still fails:
- Contact Vercel support
- Mention: "iOS Safari can't resolve domain, IPv6 issue"
- They can check server-side configuration

---

**Note**: This is a hosting/DNS issue, not a code issue. The code changes I made (removing problematic rewrites) help, but the main fix is DNS configuration.
