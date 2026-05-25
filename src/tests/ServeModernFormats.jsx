import { useState } from 'react';
import TestContainer from '../components/TestContainer.jsx';
import useLocalStorage from '../hooks/useLocalStorage.js';
import usePerformanceLogging from '../hooks/usePerformanceLogging.js';
import './TestPage.css';

function ServeModernFormats() {
  const [optimized, setOptimized] = useLocalStorage('serve-modern-formats-optimized', false);
  
  // Log performance metrics after 5 seconds
  usePerformanceLogging(optimized, 'ServeModernFormats', 5000);
  
  // Use consistent image IDs for both formats
  // This ensures we're comparing the SAME images in different formats
  const imageIds = [100, 200, 300, 400, 500, 600];
  
  // Cache-buster only changes when the page first loads
  // This ensures the same image isn't cached between WebP/JPEG toggles
  const [cacheBuster] = useState(() => Date.now());

  const images = imageIds.map((id, i) => {
    return {
      id: `${id}-${i}`,
      // Same image ID for both WebP and JPEG
      // Only the format extension changes (.webp vs .jpg)
      url: optimized
        ? `https://picsum.photos/id/${id}/400/300.webp?t=${cacheBuster}`
        : `https://picsum.photos/id/${id}/400/300.jpg?t=${cacheBuster}`,
      format: optimized ? 'WebP' : 'JPEG',
      picsum_id: id
    };
  });

  // Approximate file sizes based on format
  const jpegSize = 14.5; // KB per image
  const webpSize = 10; // KB per image (typically 30-50% smaller)
  const totalSize = optimized ? webpSize * 6 : jpegSize * 6;
  const savings = ((jpegSize * 6 - webpSize * 6) / (jpegSize * 6) * 100).toFixed(0);

  return (
    <TestContainer
      title="Serve Images in Modern Formats"
      description="Compare modern WebP format vs legacy JPEG format using the same images."
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
      {/*<div className="test-explanation">
        <h3>What's Being Tested</h3>
        <div className="explanation-grid">
          <div className="explanation-item">
            <strong>🔴 Legacy Format (JPEG):</strong>
            <p>Older format with larger file sizes (~14.1KB per image). Widely supported but inefficient.</p>
          </div>
          <div className="explanation-item">
            <strong>🟢 Modern Format (WebP):</strong>
            <p>30% smaller files (~9.75KB per image) with same quality. Faster loading, less bandwidth.</p>
          </div>
        </div>
      </div>*/}

      <div style={{ marginBottom: '20px', padding: '15px', background: '#e8f5e9', borderRadius: '8px', border: '2px solid #27ae60' }}>
        <h4>Consistent images for comparison</h4>
        <p style={{ margin: '8px 0', fontSize: '0.9rem' }}>
          Picsum IDs: <strong>{imageIds.join(', ')}</strong>
        </p>
        {/*<p style={{ margin: '8px 0', fontSize: '0.9rem' }}>
          Same images in both formats - only the compression algorithm changes.
        </p>*/}
        <p style={{ margin: '8px 0', fontSize: '0.85rem', color: '#666' }}>
          Cache-buster: {cacheBuster}
        </p>
      </div>

      {/*<div style={{ marginBottom: '30px', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
        <h4>Format Comparison</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginTop: '15px' }}>
          <div style={{ padding: '15px', background: 'white', borderRadius: '6px', border: optimized ? '1px solid #ddd' : '3px solid #e74c3c' }}>
            <strong>JPEG</strong>
            <p style={{ color: '#666', fontSize: '0.9rem', margin: '8px 0' }}>Legacy format</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#e74c3c' }}>~50KB</p>
            {!optimized && <p style={{ fontSize: '0.85rem', color: '#e74c3c', marginTop: '5px' }}>← Currently loading</p>}
          </div>
          <div style={{ padding: '15px', background: 'white', borderRadius: '6px', border: optimized ? '3px solid #27ae60' : '1px solid #ddd' }}>
            <strong>WebP</strong>
            <p style={{ color: '#666', fontSize: '0.9rem', margin: '8px 0' }}>Modern format</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#27ae60' }}>~30KB</p>
            <p style={{ fontSize: '0.85rem', color: '#27ae60', marginTop: '5px' }}>✅ 40% smaller!</p>
            {optimized && <p style={{ fontSize: '0.85rem', color: '#27ae60', marginTop: '5px' }}>← Currently loading</p>}
          </div>
        </div>
      </div>*/}

      <div className="image-grid-container">
        <h4>Image Gallery</h4>
        <p style={{ color: '#666', marginBottom: '15px' }}>
          <strong>{images[0].format}</strong> format (6 images)
        </p>
        <div className="image-grid">
          {images.map((img) => (
            <div key={img.id} className="image-item">
              <img
                src={img.url}
                alt={`Picsum ${img.picsum_id}`}
                className="test-image"
                loading="eager"
              />
              <span className="image-label">{img.format} (ID {img.picsum_id})</span>
            </div>
          ))}
        </div>
      </div>

      {/*<div className="devtools-tips">
        <h4>What to check</h4>
        <ul>
          <li><strong>Network Tab:</strong> Compare file sizes - WebP should be 30% smaller</li>
          <li><strong>Response Headers:</strong> Check Content-Type (image/webp vs image/jpeg)</li>
          <li><strong>Same Images:</strong> Picsum IDs {imageIds.join(', ')} in both formats</li>
          <li><strong>Total Transfer:</strong> Should see ~26KB reduction (86KB JPEG → 60KB WebP)</li>
        </ul>
      </div>*/}

      <div style={{ padding: '20px', background: '#e3f2fd', borderRadius: '8px', marginTop: '20px', border: '2px solid #2196f3' }}>
        <h4>Implementation Guide</h4>
        <br></br>
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
