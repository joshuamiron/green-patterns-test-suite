# 🌱 Green Software Patterns Test Suite (Vite + React 18)

A modern React 18 application built with **Vite** for testing each [Green Software Foundation](https://patterns.greensoftware.foundation/catalog/web/) pattern individually with toggle switches to compare optimized vs unoptimized performance.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server (opens at http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## What's Included

### 12 Individual Test Pages

### Fully Interactive Tests

1. **Defer Offscreen Images** - Lazy loading vs eager loading
2. **Avoid Excessive DOM Size** - Flat vs nested DOM structures  
3. **Optimize Image Size** - Properly sized vs oversized images
4. **Keep Request Counts Low** - Bundled vs separate requests

### Placeholder Tests (Ready to Expand)
<!-- TODO: Update this list of placeholders -->
5. Minimize Main Thread Work
6. Avoid Chaining Critical Requests
7. Enable Text Compression
8. Deprecate GIFs for Animated Content
9. Serve Images in Modern Formats
10. Remove Unused CSS
11. Minify Web Assets
12. Avoid Tracking Unnecessary Data

## How to Test Each Pattern

### Basic Workflow

1. Start the app: `npm run dev`
2. Navigate to a test page from the home screen
3. Open Chrome DevTools **(F12)**
4. Go to Network tab and clear it 🚫
5. Toggle optimization **ON** or **OFF**
6. **Observe the differences in:**
   - Request count and sizes
   - Load times
   - Resource waterfall
   - Total data transferred

### Example: Testing "Defer Offscreen Images"

1. Open `/defer-offscreen-images`
2. Open DevTools → Network tab
3. **With optimization OFF**:
   - All 30 images load immediately
   - ~1.5MB transferred instantly
   - 30+ requests right away
4. **With optimization ON**:
   - Only 5-10 images load initially
   - ~250KB transferred
   - More images load as you scroll

## Key Metrics to Measure

| Metric | Where to Check | Tool |
|--------|---------------|------|
| **Data Transfer** | Network tab (bottom) | DevTools |
| **Request Count** | Network tab (bottom) | DevTools |
| **Performance Score** | Lighthouse | DevTools |
| **DOM Nodes** | Console: `$$('*').length` | DevTools |
| **Memory Usage** | Memory profiler | DevTools |
| **CPU Usage** | Performance tab | DevTools |

## Expected Results

### Defer Offscreen Images

- **OFF**: 30 requests, ~1.5MB, all load immediately
- **ON**: 5-10 requests, ~250KB, load on scroll
- **Savings**: ~80% initial bandwidth

### Avoid Excessive DOM  

- **OFF**: ~2000 nodes, higher memory
- **ON**: ~800 nodes, lower memory
- **Savings**: ~60% fewer nodes

### Optimize Image Size

- **OFF**: ~6MB (oversized images)
- **ON**: ~600KB (right-sized images)  
- **Savings**: ~90% data reduction

## Project Structure

```text
green-patterns-vite/
├── index.html              # Entry HTML (Vite serves from root)
├── vite.config.js          # Vite configuration
├── package.json
├── src/
│   ├── main.jsx            # App entry point
│   ├── App.jsx             # Main app with routing
│   ├── index.css           # Global styles
│   ├── components/         # Reusable components
│   │   ├── Home.jsx
│   │   └── TestContainer.jsx
│   └── tests/              # Individual pattern tests
│       ├── DeferOffscreenImages.jsx
│       ├── AvoidExcessiveDOM.jsx
│       └── ... (10 more)
└── README.md
```

## ⚡ Why Vite?

- ✅ **Fast**: Lightning-fast HMR (Hot Module Replacement)
- ✅ **Modern**: Uses native ES modules
- ✅ **React 18**: Latest React version with concurrent features
- ✅ **No CRA**: CRA is deprecated, Vite is the modern standard
- ✅ **Smaller Bundles**: Production build is automatically optimized with:
  - Code splitting
  - Tree shaking  
  - Minification
  - Asset optimization

## DevTools Testing Guide

### Network Tab

```text
1. Open DevTools (F12)
2. Click "Network" tab
3. Check "Disable cache"
4. Reload page with optimization **OFF**
5. Note: requests, size, time
6. Toggle optimization **ON**
7. Reload and compare!
```

### Performance Tab

```text
1. Click "Performance" tab
2. Click Record (⚫)
3. Interact with page
4. Stop recording
5. Analyze:
   - Main thread work
   - Layout/Paint times
   - Long tasks (>50ms)
```

### Lighthouse Audit

```text
1. Click "Lighthouse" tab
2. Select "Performance" category
3. Run with optimization OFF → note score
4. Run with optimization ON → compare!
```

## Resources

- [Vite Documentation](https://vitejs.dev/)
- [React 18 Docs](https://react.dev/)
- [Green Software Patterns](https://patterns.greensoftware.foundation/catalog/web/)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)

## Extending Tests

Each test follows the same pattern. To enhance a placeholder test:

```jsx
import { useState } from 'react';
import TestContainer from '../components/TestContainer';

function MyPattern() {
  const [optimized, setOptimized] = useState(false);
  
  return (
    <TestContainer
      title="My Pattern"
      description="What this tests"
      patternUrl="https://..."
      optimized={optimized}
      setOptimized={setOptimized}
      metrics={{ 'Metric': optimized ? 'Good' : 'Bad' }}
    >
      {/* Demo content */}
    </TestContainer>
  );
}

export default MyPattern;
```

## Vite vs Create React App

| Feature | Vite | Create React App |
|---------|------|-----|
| **Status** | 🟢 Active | 🔴 [Deprecated](https://create-react-app.dev/docs/getting-started/) |
| **Dev Start** | ~100ms | ~5s |
| **Hot Module Replacement** | Instant | Slow |
| **React Version** | 18.3+ | 18.2 |
| **Bundle Size** | Smaller | Larger |
| **Build Tool** | Rollup | Webpack |

## Notes

- Uses [Picsum Photos](https://picsum.photos/) for placeholder images
- No backend required
- Works offline after initial load
- Fully responsive

---

Built with ⚡ Vite + ⚛️ React 18 to test 🌱 Green Software patterns

**Happy Testing!**
