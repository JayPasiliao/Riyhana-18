# SVG Scaling Fix - Local Dev vs Production

## Root Cause

**SVG normalization rules were inside a mobile-only media query**, causing them to only apply on screens ≤640px. In local dev (typically desktop >640px), SVGs had no size constraints, resulting in giant, oversized rendering.

### Why Production Worked

- Production build may have different viewport handling
- Or CSS cascade differences caused rules to apply differently
- The media query boundary created inconsistent behavior

### Why Local Dev Failed

- SVG normalization rules were inside `@media (max-width: 640px)` (line 1051)
- Desktop/local dev viewports are typically >640px
- Without normalization, SVGs expanded to fill available space
- Result: Giant arrows, circles, and icons

## Fix Applied

1. **Moved SVG normalization to global scope** (after `:root` block):
   ```css
   /* Global SVG normalization - MUST be outside media queries */
   svg {
     max-width: 100%;
     height: auto;
     display: block;
   }
   ```

2. **Added global rules for decorative SVGs**:
   - `.curved-hud-arc`, `.curved-hud-wave`, etc.
   - Ensures all decorative elements are constrained

3. **Added global rules for icon SVGs**:
   - `.details-body svg`, `.details-card-enter svg`
   - Fixed size: `1.25rem` (20px)

4. **Cleaned up mobile media query**:
   - Removed duplicate SVG rules
   - Kept only mobile-specific overrides if needed

## Files Changed

- `src/app/globals.css`:
  - Added global SVG normalization (line ~42)
  - Added global decorative SVG rules
  - Added global icon SVG rules
  - Removed duplicate rules from mobile media query

## Expected Result

After restarting dev server:

```bash
npm run dev
```

You should see:
- ✅ SVGs respect container size
- ✅ Icons render at intended scale (1.25rem)
- ✅ Decorative elements properly constrained
- ✅ No giant arrows or circles
- ✅ Layout proportions match production

## Why This Fix Works

- Global CSS rules apply to **all viewport sizes**
- No dependency on media query boundaries
- Consistent behavior in dev and prod
- SVGs are normalized before any component-specific styles

## Verification

Check that:
1. Icons (calendar, pin, clock) are ~20px (1.25rem)
2. Decorative dividers are constrained to container width
3. No SVGs overflow their containers
4. Layout matches production (Vercel)
