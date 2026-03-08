# Performance Logging Feature

## What It Does

Each test page now automatically logs performance metrics to the browser console after 5 seconds. This gives you browser-side metrics to correlate with your powermetrics measurements.

## What Gets Logged

When you load a test page, after 5 seconds you'll see in the console:

```javascript
📊 Performance Metrics: DeferOffscreenImages (Optimized)
┌───────────────────┬────────────────────────────────────┐
│ timestamp         │ 2026-03-03T12:34:56.789Z          │
│ testName          │ DeferOffscreenImages               │
│ optimized         │ true                               │
│ totalResources    │ 33                                 │
│ imageCount        │ 0  ← Lazy loading: no images yet! │
│ totalBytes        │ 45238                              │
│ imageBytes        │ 0                                  │
│ totalKB           │ 44.18                              │
│ imageKB           │ 0.00                               │
│ loadTime          │ 1234 ms                            │
│ domContentLoaded  │ 856 ms                             │
│ domNodeCount      │ 847                                │
└───────────────────┴────────────────────────────────────┘

🖼️ Image Details (0 images)
(no images loaded - lazy loading working!)

💾 Metrics saved to localStorage: perf_DeferOffscreenImages_opt_1709471696789
   To retrieve: localStorage.getItem('perf_DeferOffscreenImages_opt_1709471696789')
```

## How to Use

### During Testing:

1. Open Chrome DevTools (F12) → Console tab
2. Navigate to test page
3. Toggle optimization ON or OFF
4. Refresh the page
5. Wait 5 seconds
6. Check console for metrics table

### Comparing Optimized vs Unoptimized:

```javascript
// Test 1: Optimization OFF
// Refresh page → wait 5s → see console
// Note: imageCount: 30, imageKB: 6000

// Test 2: Optimization ON  
// Refresh page → wait 5s → see console
// Note: imageCount: 0, imageKB: 0
```

### Retrieving Saved Data:

All metrics are automatically saved to localStorage with timestamps. To retrieve them later:

```javascript
// List all saved metrics
Object.keys(localStorage).filter(k => k.startsWith('perf_'))

// Get specific metric
const metrics = JSON.parse(localStorage.getItem('perf_DeferOffscreenImages_opt_1709471696789'))
console.table(metrics)

// Clear all perf metrics
Object.keys(localStorage)
  .filter(k => k.startsWith('perf_'))
  .forEach(k => localStorage.removeItem(k))
```

## Correlation with Powermetrics

These browser metrics complement your powermetrics data:

| Metric | Source | What It Measures |
|--------|--------|------------------|
| Chrome CPU Time | powermetrics | Computational energy |
| Network Bytes (plist) | powermetrics | System-wide network activity |
| imageCount | Performance API | Exact # images loaded |
| imageBytes | Performance API | Exact bytes transferred for images |
| loadTime | Performance API | Total page load time |

**Use together:**
- powermetrics: Energy consumption (Chrome CPU + network bytes from plist)
- Performance API: Verification that optimization is working (image count, bytes)

## Tests With Logging Enabled

✅ Defer Offscreen Images  
✅ Avoid Excessive DOM  
✅ Optimize Image Size  
✅ Keep Request Counts Low  
✅ Minimize Main Thread Work  
✅ Avoid Chaining Requests  
✅ Remove Unused CSS  
✅ Serve Modern Formats  
✅ Minify Assets  

## Tests Without Logging (Info Only Placeholders)

ℹ️ Deprecate GIFs  
ℹ️ Enable Text Compression  
ℹ️ Avoid Unnecessary Tracking  

## Advanced: Export Metrics to CSV

You can export all localStorage metrics to CSV for analysis:

```javascript
// In browser console:
const metrics = Object.keys(localStorage)
  .filter(k => k.startsWith('perf_'))
  .map(k => JSON.parse(localStorage.getItem(k)));

// Convert to CSV
const csv = [
  Object.keys(metrics[0]).join(','),  // Header
  ...metrics.map(m => Object.values(m).join(','))  // Rows
].join('\n');

// Download
const blob = new Blob([csv], { type: 'text/csv' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'performance_metrics.csv';
a.click();
```

## Notes

- Metrics are captured **5 seconds after page load** by default
- This matches your powermetrics 5-second window
- Logging has minimal performance impact (~1-2ms)
- Data persists in localStorage until manually cleared
- Each test run gets a unique timestamp-based key
