import { useState } from 'react';
import TestContainer from '../components/TestContainer.jsx';
import useLocalStorage from '../hooks/useLocalStorage.js';
import './TestPage.css';

function ServeModernFormats() {
  const [optimized, setOptimized] = useLocalStorage('serve-modern-formats-optimized', false);

  const images = Array.from({ length: 6 }, (_, i) => {
    const id = i + 100;
    return {
      id,
      // Modern format (WebP) vs legacy (JPEG)
      url: optimized
        ? `https://picsum.photos/id/${id}/400/300.webp`
        : `https://picsum.photos/id/${id}/400/300.jpg`,
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
      description="Compare modern WebP format vs legacy JPEG/PNG formats for image delivery."
      patternUrl="https://patterns.greensoftware.foundation/catalog/web/serve-images-in-modern-formats"
      optimized={optimized}
      setOptimized={setOptimized}
      metrics={{
        'Format': optimized ? 'WebP' : 'JPEG',
        'Est. Total Size': `~${totalSize}KB`,
        'Savings': optimized ? `~${savings}%` : '0%'
      }}
    >
      <div className="test-explanation">
        <h3>What's Being Tested</h3>
        <div className="explanation-grid">
          <div className="explanation-item">
            <strong>❌ Legacy Formats (JPEG/PNG):</strong>
            <p>Older formats with larger file sizes. Widely supported but inefficient for web delivery.</p>
          </div>
          <div className="explanation-item">
            <strong>✅ Modern Formats (WebP/AVIF):</strong>
            <p>30-50% smaller files with same quality. Faster loading, less bandwidth, better performance.</p>
          </div>
        </div>
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
          <div style={{ padding: '15px', background: 'white', borderRadius: '6px' }}>
            <strong>AVIF</strong>
            <p style={{ color: '#666', fontSize: '0.9rem', margin: '8px 0' }}>Newest format</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#27ae60' }}>~20KB</p>
            <p style={{ fontSize: '0.85rem', color: '#27ae60', marginTop: '5px' }}>✅ 60% smaller!</p>
          </div>
        </div>
      </div>

      <div className="image-grid-container">
        <h4>Image Gallery ({optimized ? 'WebP' : 'JPEG'} format)</h4>
        <p style={{ color: '#666', marginBottom: '15px' }}>
          Currently loading: <strong>{images[0].format}</strong> format
        </p>
        <div className="image-grid">
          {images.map((img) => (
            <div key={img.id} className="image-item">
              <img
                src={img.url}
                alt={`Demo ${img.id}`}
                className="test-image"
              />
              <span className="image-label">{img.format}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="devtools-tips">
        <h4>💡 What to Check</h4>
        <ul>
          <li><strong>Network Tab:</strong> Look at the Size column - WebP images are noticeably smaller</li>
          <li><strong>Response Headers:</strong> Check Content-Type header (image/webp vs image/jpeg)</li>
          <li><strong>Total Transfer:</strong> See ~50% reduction in total data transferred</li>
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
