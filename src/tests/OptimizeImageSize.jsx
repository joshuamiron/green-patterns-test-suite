import { useState } from 'react';
import TestContainer from '../components/TestContainer.jsx';
import useLocalStorage from '../hooks/useLocalStorage.js';
import usePerformanceLogging from '../hooks/usePerformanceLogging.js';
import './TestPage.css';

function OptimizeImageSize() {
  const [optimized, setOptimized] = useLocalStorage('optimize-image-size-optimized', false);
  
  // Cache-buster to ensure fresh loads
  const [cacheBuster] = useState(() => Date.now());
  
  // Log performance after 5 seconds
  usePerformanceLogging(optimized, 'OptimizeImageSize', 5000);

  const images = Array.from({ length: 12 }, (_, i) => {
    // Use specific image IDs: 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200
    const imageId = 100 + (i * 100);
    
    return {
      id: i + 1,
      // Optimized: right-sized (400×300), Unoptimized: oversized (2000×1500)
      url: optimized 
        ? `https://picsum.photos/id/${imageId}/400/300?t=${cacheBuster}`
        : `https://picsum.photos/id/${imageId}/2000/1500?t=${cacheBuster}`
    };
  });

  const perImageSavings = optimized ? 0 : 90; // ~90% savings per image
  const totalUnoptimized = 12 * 500; // ~6000KB
  const totalOptimized = 12 * 50;    // ~600KB
  const totalSavings = optimized ? 0 : ((totalUnoptimized - totalOptimized) / totalUnoptimized * 100).toFixed(0);

  return (
    <TestContainer
      title="Properly Size Images"
      description="Serve images at their actual display size, not oversized versions that get scaled down."
      patternUrl="https://patterns.greensoftware.foundation/catalog/web/properly-sized-images"
      optimized={optimized}
      setOptimized={setOptimized}
      metrics={{
        'Per Image': optimized ? '~50KB (400×300)' : '~500KB (2000×1500)',
        'Total Transfer': optimized ? '~600KB' : '~6MB',
        'Savings': optimized ? '0%' : `${totalSavings}% (~${((totalUnoptimized - totalOptimized) / 1024).toFixed(1)}MB saved)`
      }}
    >
      <div className="test-explanation">
        <h3>What's Being Tested</h3>
        <div className="explanation-grid">
          <div className="explanation-item">
            <strong>❌ Unoptimized (Oversized):</strong>
            <p>Loading 2000×1500px images (500KB each) but displaying them at 400×300px. Downloads and decodes 25× more pixels than needed - wastes 96% of each image!</p>
          </div>
          <div className="explanation-item">
            <strong>✅ Optimized (Properly Sized):</strong>
            <p>Loading 400×300px images (50KB each) - exactly the display size. No wasted bandwidth, no unnecessary decoding work. ~90% file size reduction per image.</p>
          </div>
        </div>
      </div>

      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        backgroundColor: optimized ? '#e8f5e9' : '#ffebee', 
        borderRadius: '8px',
        border: optimized ? '2px solid #4caf50' : '2px solid #f44336'
      }}>
        <h4>Current Configuration: {optimized ? 'Properly Sized ✅' : 'Oversized ❌'}</h4>
        <div style={{ marginTop: '15px' }}>
          <div style={{ marginBottom: '10px' }}>
            <strong>Image Dimensions:</strong> {optimized ? '400×300px (matches display)' : '2000×1500px (scaled down to 400×300px)'}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Per Image Size:</strong> {optimized ? '~50KB' : '~500KB'}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Total for 12 Images:</strong> <span style={{ color: optimized ? '#2e7d32' : '#c62828', fontWeight: 'bold' }}>{optimized ? '~600KB' : '~6MB'}</span>
          </div>
          {!optimized && (
            <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#fff3cd', borderRadius: '6px' }}>
              <strong style={{ color: '#856404' }}>⚠️ Waste per Image:</strong>
              <ul style={{ margin: '8px 0', paddingLeft: '20px', color: '#856404' }}>
                <li>Downloaded: 3,000,000 pixels (2000×1500)</li>
                <li>Displayed: 120,000 pixels (400×300)</li>
                <li>Wasted: 2,880,000 pixels (96% thrown away!)</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="image-grid">
        {images.map((img) => (
          <div key={img.id} className="image-item">
            <img 
              src={img.url} 
              alt={`Gallery ${img.id}`} 
              className="test-image"
              style={{ width: '400px', height: '300px' }}
            />
            <span className="image-label">
              {optimized ? '✅ 400×300px' : `❌ 2000×1500px → 400×300px`}
            </span>
          </div>
        ))}
      </div>

      <div className="devtools-tips">
        <h4>💡 What to Check</h4>
        <ul>
          <li><strong>Network Tab:</strong> Look for the picsum.photos requests - compare sizes (~500KB vs ~50KB each)</li>
          <li><strong>Total Transfer:</strong> Check bottom of Network tab - should show ~6MB unoptimized, ~600KB optimized (~90% savings)</li>
          <li><strong>Decode Time:</strong> Performance profiler shows image decode - smaller images = faster</li>
          <li><strong>Rendered vs Intrinsic:</strong> Hover over image in DevTools Elements - shows "Rendered: 400×300, Intrinsic: 2000×1500" when oversized</li>
        </ul>
      </div>

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#e3f2fd', borderRadius: '8px', border: '2px solid #2196f3' }}>
        <h4>🔧 How to Fix in Production</h4>
        <p style={{ marginBottom: '15px' }}>Use responsive images with <code>srcset</code> to serve appropriate sizes:</p>
        <pre style={{ 
          backgroundColor: '#263238', 
          color: '#aed581', 
          padding: '15px', 
          borderRadius: '6px', 
          overflow: 'auto',
          fontSize: '13px'
        }}>{`<img 
  srcset="image-400w.jpg 400w,
          image-800w.jpg 800w,
          image-1600w.jpg 1600w"
  sizes="(max-width: 600px) 400px,
         (max-width: 1200px) 800px,
         1600px"
  src="image-400w.jpg"
  alt="Responsive image"
/>`}</pre>
        <p style={{ marginTop: '15px', fontSize: '14px', color: '#1565c0' }}>
          Or use modern CDNs/image services that auto-resize (Cloudinary, Imgix, Next.js Image component)
        </p>
      </div>
    </TestContainer>
  );
}

export default OptimizeImageSize;