import { useEffect } from 'react';

/**
 * Custom hook to log performance metrics from the browser
 * Logs to console and localStorage for correlation with powermetrics data
 * 
 * @param {boolean} optimized - Whether optimization is enabled
 * @param {string} testName - Name of the test (e.g., "DeferOffscreenImages")
 * @param {number} delay - Milliseconds to wait before capturing metrics (default: 5000)
 */
function usePerformanceLogging(optimized, testName, delay = 5000) {
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        // Get all resources loaded
        const resources = performance.getEntriesByType('resource');
        const images = resources.filter(r => r.initiatorType === 'img');
        
        // Calculate totals
        const totalBytes = resources.reduce((sum, r) => sum + (r.transferSize || 0), 0);
        const imageBytes = images.reduce((sum, r) => sum + (r.transferSize || 0), 0);
        
        // Get timing info
        const nav = performance.timing;
        const loadTime = nav.loadEventEnd - nav.navigationStart;
        const domContentLoaded = nav.domContentLoadedEventEnd - nav.navigationStart;
        
        // Get DOM metrics
        const domNodes = document.querySelectorAll('*').length;
        
        // Compile metrics
        const metrics = {
          timestamp: new Date().toISOString(),
          testName: testName,
          optimized: optimized,
          
          // Resource counts
          totalResources: resources.length,
          imageCount: images.length,
          
          // Transfer sizes (bytes)
          totalBytes: totalBytes,
          imageBytes: imageBytes,
          totalKB: (totalBytes / 1024).toFixed(2),
          imageKB: (imageBytes / 1024).toFixed(2),
          
          // Timing (milliseconds)
          loadTime: loadTime,
          domContentLoaded: domContentLoaded,
          
          // DOM
          domNodeCount: domNodes,
          
          // Memory (if available)
          jsHeapSize: performance.memory ? performance.memory.usedJSHeapSize : 'N/A'
        };
        
        // Log to console (table format for easy reading)
        console.group(`📊 Performance Metrics: ${testName} (${optimized ? 'Optimized' : 'Unoptimized'})`);
        console.table(metrics);
        console.groupEnd();
        
        // Also log individual image details if there are images
        if (images.length > 0) {
          console.group(`🖼️ Image Details (${images.length} images)`);
          images.forEach((img, i) => {
            console.log(`${i + 1}. ${img.name.split('/').pop()} - ${(img.transferSize / 1024).toFixed(1)} KB, ${img.duration.toFixed(0)}ms`);
          });
          console.groupEnd();
        }
        
        // Save to localStorage for later retrieval
        const storageKey = `perf_${testName}_${optimized ? 'opt' : 'unopt'}_${Date.now()}`;
        localStorage.setItem(storageKey, JSON.stringify(metrics));
        
        // Log storage location
        console.log(`💾 Metrics saved to localStorage: ${storageKey}`);
        console.log(`   To retrieve: localStorage.getItem('${storageKey}')`);
        
      } catch (error) {
        console.error('Error capturing performance metrics:', error);
      }
    }, delay);
    
    return () => clearTimeout(timer);
  }, [optimized, testName, delay]);
}

export default usePerformanceLogging;
