import { useState, useEffect } from 'react';
import TestContainer from '../components/TestContainer.jsx';
import useLocalStorage from '../hooks/useLocalStorage.js';
import usePerformanceLogging from '../hooks/usePerformanceLogging.js';
import './TestPage.css';

function ServeModernFormats() {
  const [optimized, setOptimized] = useLocalStorage('serve-modern-formats-optimized', false);
  
  // Log performance metrics after 5 seconds
  usePerformanceLogging(optimized, 'ServeModernFormats', 5000);
  
  // Generate random image IDs on component mount to prevent caching
  // Use timestamp + random to ensure fresh images on each page load
  const [imageIds] = useState(() => {
    const timestamp = Date.now();
    const randomOffset = Math.floor(Math.random() * 900); // Random 0-899
    return Array.from({ length: 6 }, (_, i) => {
      // Use random IDs between 1-1000 from Picsum
      return (randomOffset + i) % 1000 + 1;
    });
  });

  const images = imageIds.map((id, i) => {
    // Add cache-busting query parameter using timestamp
    const cacheBuster = Date.now();
    return {
      id: `${id}-${i}`,
      // Modern format (WebP) vs legacy (JPEG)
      // Cache-buster ensures fresh images on every page load
      url: optimized
        ? `https://picsum.photos/id/${id}/400/300.webp?t=${cacheBuster}`
        : `https://picsum.photos/id/${id}/400/300.jpg?t=${cacheBuster}`,
      format: optimized ? 'WebP' : 'JPEG'
    };
  });

  // Approximate file sizes based on format
  const jpegSize = 50; // KB per image
  const webpSize = 25; // KB per image (typically 30-50% smaller)
  const totalSize = optimized ? webpSize * 6 : jpegSize * 6;
  const savings = ((jpegSize * 6 - webpSize * 6) / (jpegSize * 6) * 100).toFixed(0);

  return (
    <TestContainer
      title="Serve Images in Modern Formats"
      description="Compare modern WebP format vs legacy JPEG formats for image delivery."
      patternUrl="https://patterns.greensoftware.foundation/catalog/web/serve-images-in-modern-formats"
      optimized={optimized}
      setOptimized={setOptimized}
      metrics={{
        'Format': optimized ? 'WebP' : 'JPEG',
        'Est. Total Size': `~${totalSize}KB`,
        'Savings': optimized ? `~${savings}%` : '0%',
        'Images': '6 × 400×300px'
      }}
    >
      <div className="test-explanation">
        <h3>What's Being Tested</h3>
        <div className="explanation-grid">
          <div className="explanation-item">
            <strong>❌ Legacy Format (JPEG):</strong>
            <p>Older format with larger file sizes (~50KB per image). Widely supported but inefficient.</p>
          </div>
          <div className="explanation-item">
            <strong>✅ Modern Format (WebP):</strong>
            <p>30-50% smaller files (~25KB per image) with same quality. Faster loading, less bandwidth.</p>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '20px', padding: '15px', background: '#e3f2fd', borderRadius: '8px', border: '2px solid #2196f3' }}>
        <h4>🔄 Fresh Images on Every Load</h4>
        <p style={{ margin: '8px 0', fontSize: '0.9rem' }}>
          Each page refresh loads NEW random images from Picsum (IDs: {imageIds.join(', ')})
        </p>
        <p style={{ margin: '8px 0', fontSize: '0.9rem' }}>
          Cache-busting timestamp: {Date.now()}
        </p>
        <p style={{ margin: '8px 0', fontSize: '0.85rem', color: '#666' }}>
          This ensures accurate network measurements without cache interference.
        </p>
      </div>

      <div style={{ marginBottom: '30px', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
        <h4>Format Comparison</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginTop: '15px' }}>
          <div style={{ padding: '15px', background: 'white', borderRadius: '6px' }}>
            <strong>JPEG</strong>
            <p style={{ color: '#666', fontSize: '0.9rem', margin: '8px 0' }}>Legacy format</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#e74c3c' }}>~50KB</p>
          </div>
          <div style={{ padding: '15px', background: 'white', borderRadius: '6px' }}>
            <strong>WebP</strong>
            <p style={{ color: '#666', fontSize: '0.9rem', margin: '8px 0' }}>Modern format</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#27ae60' }}>~25KB</p>
            <p style={{ fontSize: '0.85rem', color: '#27ae60', marginTop: '5px' }}>✅ 50% smaller!</p>
          </div>
        </div>
      </div>

      <div className="image-grid-container">
        <h4>Image Gallery ({optimized ? 'WebP' : 'JPEG'} format)</h4>
        <p style={{ color: '#666', marginBottom: '15px' }}>
          Currently loading: <strong>{images[0].format}</strong> format (6 images)
        </p>
        <div className="image-grid">
          {images.map((img) => (
            <div key={img.id} className="image-item">
              <img
                src={img.url}
                alt={`Demo image`}
                className="test-image"
                loading="eager"
              />
              <span className="image-label">{img.format}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="devtools-tips">
        <h4>💡 What to Check</h4>
        <ul>
          <li><strong>Network Tab:</strong> Look at the Size column - WebP images should be ~50% smaller</li>
          <li><strong>Response Headers:</strong> Check Content-Type (image/webp vs image/jpeg)</li>
          <li><strong>Total Transfer:</strong> Should see ~150KB reduction (300KB JPEG → 150KB WebP)</li>
          <li><strong>Quality:</strong> WebP maintains same visual quality at smaller size</li>
        </ul>
      </div>

      <div style={{ padding: '20px', background: '#e3f2fd', borderRadius: '8px', marginTop: '20px', border: '2px solid #2196f3' }}>
        <h4>📘 Implementation Guide</h4>
        <p style={{ marginBottom: '15px' }}>Use the <code>&lt;picture&gt;</code> element for progressive enhancement:</p>
        <pre style={{ background: '#263238', color: '#aed581', padding: '15px', borderRadius: '6px', overflow: 'auto' }}>
{`<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Fallback">
</picture>`}
        </pre>
        <p style={{ marginTop: '15px', fontSize: '0.9rem', color: '#555' }}>
          Browsers automatically use the first format they support, falling back to JPEG for older browsers.
        </p>
      </div>
    </TestContainer>
  );
}

export default ServeModernFormats;
