# Screenshot Placeholders

## Screenshots to be Added

The following screenshots should be captured and added to this directory:

### 1. hero-screenshot.png
- **Description**: Main application interface showing the animated gradient background and a featured quote
- **Size**: 1200x800px recommended
- **Content**: Should show the full app layout with quote display, buttons, and background animation

### 2. main-interface.png
- **Description**: Clean view of the main quote display area
- **Size**: 1000x600px recommended
- **Content**: Focus on the quote container with glass-morphism effect

### 3. category-filter.png
- **Description**: Category filtering section with highlighted active filter
- **Size**: 800x400px recommended
- **Content**: Show the category buttons with one selected

### 4. quote-detail.png
- **Description**: Close-up of a quote with author attribution and category tag
- **Size**: 800x500px recommended
- **Content**: Detailed view of quote typography and styling

### 5. mobile-view.png
- **Description**: Mobile responsive layout
- **Size**: 375x812px (iPhone 13 Pro dimensions)
- **Content**: Vertical layout optimized for mobile screens

## How to Capture Screenshots

### Using Browser Developer Tools
1. Open the app in your browser
2. Press F12 to open Developer Tools
3. Click the device toolbar icon (mobile/tablet icon)
4. Select the desired screen size
5. Use the browser's screenshot feature

### Using Browser Extensions
- **Full Page Screen Capture** (Chrome/Edge)
- **FireShot** (Chrome/Firefox)
- **Nimbus Screenshot** (Chrome/Firefox)

### Manual Process
1. Navigate to the app
2. Wait for animations to load
3. Use your operating system's screenshot tool:
   - **Windows**: Windows + Shift + S
   - **Mac**: Command + Shift + 4
   - **Linux**: Screenshot application

### Screenshot Guidelines
- **High quality**: Use at least 1080p resolution
- **Clean state**: Ensure no browser UI is visible (use full-screen mode)
- **Representative content**: Show meaningful quotes, not lorem ipsum
- **Consistent lighting**: Capture during the same animation phase
- **Multiple states**: Capture both with and without category filters active

## File Naming Convention
- Use lowercase with hyphens: `main-interface.png`
- Include descriptive names: `category-filter-active.png`
- Add dimensions if multiple sizes: `mobile-view-375x812.png`

## Integration with Documentation
Once screenshots are captured:
1. Replace placeholder paths in `README.md`
2. Update `USER_GUIDE.md` with actual screenshots
3. Add captions and alternative text for accessibility

## Alternative: Automated Screenshots
For automated screenshot generation, consider:
- Puppeteer for programmatic browser control
- Playwright for cross-browser testing
- Cypress for end-to-end testing with screenshots

Example automated screenshot script:
```javascript
const puppeteer = require('puppeteer');

async function captureScreenshots() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:5000');
  await page.setViewport({ width: 1200, height: 800 });
  await page.screenshot({ path: 'docs/images/hero-screenshot.png' });
  
  await browser.close();
}
```