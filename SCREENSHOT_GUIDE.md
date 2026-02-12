# Project Screenshot Guide

## How to Add Real Project Screenshots

### Step 1: Capture Screenshots

Visit each project and take high-quality screenshots:

1. **Prank Wizard**
   - URL: https://prankwizard.netlify.app
   - Capture: Main wizard interface or 3D ballpit background
   - Save as: `prank-wizard.png`

2. **KampusKart**
   - URL: https://kampuskart.netlify.app
   - Capture: Dashboard or main campus map view
   - Save as: `kampuskart.png`

3. **Onam Festival Website**
   - URL: https://onammitadt.netlify.app
   - Capture: Festival homepage or registration page
   - Save as: `onam-festival.png`

4. **Coming Soon**
   - Create a simple placeholder or use a gradient
   - Save as: `coming-soon.png`

### Screenshot Specifications

- **Resolution**: 1920x1080 or 1600x900 (16:9 aspect ratio)
- **Format**: PNG (preferred) or JPG
- **Quality**: High quality, no compression artifacts
- **Content**: Show the most impressive/representative part of your project

### Tools for Screenshots

**Windows:**
- Windows Snipping Tool (Win + Shift + S)
- Full page screenshot browser extensions

**Browser Extensions:**
- GoFullPage (Chrome/Edge)
- Awesome Screenshot
- Fireshot

### Step 2: Add Files to Project

Place your screenshots in:
```
Gaurav_Khandelwal/public/projects/
```

File structure:
```
public/
  projects/
    prank-wizard.png       ← Add this
    kampuskart.png         ← Add this
    onam-festival.png      ← Add this
    coming-soon.png        ← Add this
```

### Step 3: Update Code

After adding the files, update `src/lib/constants/projects.ts`:

```typescript
// Change from:
image: '/projects/mobile-banking-app.svg',

// To:
image: '/projects/prank-wizard.png',
```

Do this for all 4 projects.

### Step 4: Test

1. Restart dev server: `npm run dev`
2. Visit http://localhost:3000
3. Check if images load in 3D gallery
4. No CORS errors should appear

## Alternative: Use Placeholder Service

If you don't have screenshots yet, you can temporarily use:

```typescript
image: 'https://placehold.co/1600x900/667eea/white?text=Prank+Wizard',
```

But real screenshots are much better!

## Need Help?

If you have the screenshots but need help adding them, just let me know and I'll guide you through the process.
