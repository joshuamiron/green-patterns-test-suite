import { useState } from 'react';
import TestContainer from '../components/TestContainer.jsx';
import useLocalStorage from '../hooks/useLocalStorage.js';
import usePerformanceLogging from '../hooks/usePerformanceLogging.js';
import './TestPage.css';

function DeferOffscreenImagesNative() {
  const [optimized, setOptimized] = useLocalStorage('defer-offscreen-native-optimized', false);
  
  // Log performance metrics after 5 seconds
  usePerformanceLogging(optimized, 'DeferOffscreenImagesNative', 5000);
  
  // Generate 30 random image IDs (same as original test)
  const imageIds = Array.from({ length: 30 }, (_, i) => {
    const min = 1;
    const max = 1000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  });

  // Approximate savings
  const imageSize = 50; // KB per image
  const totalImages = 30;
  const visibleImages = 6; // Approximate number above fold
  const lazyLoadedImages = totalImages - visibleImages;
  const savings = optimized ? (lazyLoadedImages * imageSize) : 0;
  const savingsPercent = optimized ? ((savings / (totalImages * imageSize)) * 100).toFixed(0) : 0;

  return (
    <TestContainer
      title="Defer Offscreen Images (no IntersectionObserver)"
      description="Compare native browser lazy loading vs eager loading - simplified version using ONLY loading attribute."
      patternUrl="https://patterns.greensoftware.foundation/catalog/web/defer-offscreen-images"
      optimized={optimized}
      setOptimized={setOptimized}
      metrics={{
        'Loading Strategy': optimized ? 'lazy' : 'eager',
        'Images': `${totalImages} images`,
        'Est. Network Saved': `~${savings}KB`,
        'Savings': `~${savingsPercent}%`
      }}
    >
      <div className="test-explanation">
        <h3>What's being tested</h3>
        <div className="explanation-grid">
          <div className="explanation-item">
            <strong>🔴 Eager Loading (Unoptimized):</strong>
            <p>All 30 images load immediately, even those far below the fold. Wastes bandwidth and energy on images users may never see.</p>
            <code style={{ display: 'block', marginTop: '8px', padding: '8px', background: '#f5f5f5', borderRadius: '4px' }}>
              &lt;img loading="eager" /&gt;
            </code>
          </div>
          <div className="explanation-item">
            <strong>🟢 Native Lazy Loading (Optimized):</strong>
            <p>Uses browser's built-in lazy loading. Images load only as they approach the viewport - zero JavaScript overhead!</p>
            <code style={{ display: 'block', marginTop: '8px', padding: '8px', background: '#e8f5e9', borderRadius: '4px' }}>
              &lt;img loading="lazy" /&gt;
            </code>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '20px', padding: '15px', background: '#e3f2fd', borderRadius: '8px', border: '2px solid #2196f3' }}>
        <h4>Native vs JavaScript implementation</h4>
        <p style={{ margin: '8px 0', fontSize: '0.9rem' }}>
          This test uses <strong>ONLY</strong> the native HTML <code>loading</code> attribute - no IntersectionObserver, no JavaScript.
        </p>
        <div style={{ marginTop: '12px', padding: '12px', background: 'white', borderRadius: '6px' }}>
          <p style={{ margin: '4px 0', fontSize: '0.85rem' }}><strong>Benefits of native approach:</strong></p>
          <ul style={{ margin: '8px 0 0 20px', fontSize: '0.85rem' }}>
            <li>Zero JavaScript execution overhead</li>
            <li>Browser-optimized performance</li>
            <li>Simpler code (one HTML attribute)</li>
            <li>97%+ browser support (Chrome 77+, Firefox 75+, Safari 15.4+)</li>
          </ul>
        </div>
      </div>

      <div style={{ marginBottom: '30px', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
        <h4>Loading strategy comparison</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px', marginTop: '15px' }}>
          <div style={{ padding: '15px', background: 'white', borderRadius: '6px', border: optimized ? '1px solid #ddd' : '3px solid #e74c3c' }}>
            <strong>Eager Loading</strong>
            <p style={{ color: '#666', fontSize: '0.9rem', margin: '8px 0' }}>Load all images immediately</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#e74c3c' }}>~{totalImages * imageSize}KB</p>
            <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '5px' }}>All 30 images downloaded</p>
            {/*{!optimized && <p style={{ fontSize: '0.85rem', color: '#e74c3c', marginTop: '5px' }}>← Currently loading</p>}*/}
          </div>
          <div style={{ padding: '15px', background: 'white', borderRadius: '6px', border: optimized ? '3px solid #27ae60' : '1px solid #ddd' }}>
            <strong>Native Lazy Loading</strong>
            <p style={{ color: '#666', fontSize: '0.9rem', margin: '8px 0' }}>Load as user scrolls</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#27ae60' }}>~{visibleImages * imageSize}KB</p>
            <p style={{ fontSize: '0.85rem', color: '#27ae60', marginTop: '5px' }}>Only ~{visibleImages} images initially</p>
            {/*{optimized && <p style={{ fontSize: '0.85rem', color: '#27ae60', marginTop: '5px' }}>← Currently loading</p>}*/}
          </div>
        </div>
      </div>

      <div className="image-grid-container">
        <h4>Image Gallery - scroll to see lazy loading in action</h4>
        <p style={{ color: '#666', marginBottom: '15px' }}>
          Currently using: <strong>{optimized ? 'loading="lazy"' : 'loading="eager"'}</strong>
          {optimized && ' (images below the fold will load as you scroll)'}
        </p>
        <div className="image-grid">
          {imageIds.map((id, index) => (
            <div key={`${id}-${index}`} className="image-item">
              <img
                src={`https://picsum.photos/id/${id}/400/300`}
                alt={`Random ${id}`}
                className="test-image"
                loading={optimized ? 'lazy' : 'eager'}
              />
              <span className="image-label">
                Image {index + 1} - {optimized ? 'lazy' : 'eager'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="devtools-tips">
        <h4>How to verify</h4>
        <ul>
          <li><strong>Network Tab:</strong> With lazy loading, only ~6 images load initially (above fold)</li>
          <li><strong>Scroll Down:</strong> Watch Network tab - new images load as you scroll</li>
          <li><strong>Without Lazy Loading:</strong> All 30 images load immediately on page load</li>
          <li><strong>Expected Savings:</strong> ~80% network reduction (only visible images load)</li>
        </ul>
      </div>

      <div style={{ padding: '20px', background: '#fff3cd', borderRadius: '8px', marginTop: '20px', border: '2px solid #f39c12' }}>
        <h4>Expected results vs JavaScript and IntersectionObserver</h4>
        <br></br>
        <p style={{ marginBottom: '10px', fontSize: '0.9rem' }}>
          <strong>Original test (with IntersectionObserver):</strong>
        </p>
        <ul style={{ marginLeft: '20px', fontSize: '0.85rem' }}>
          <li>🟢 Network: -88% (significant win)</li>
          <li>🔴 CPU: +20% (JavaScript overhead)</li>
          <li>🟢 Net Energy: -20% (network savings {'>'} CPU cost)</li>
        </ul>
        <p style={{ marginTop: '12px', marginBottom: '10px', fontSize: '0.9rem' }}>
          <strong>This Test (native lazy loading only):</strong>
        </p>
        <ul style={{ marginLeft: '20px', fontSize: '0.85rem' }}>
          <li>🟢 Network: -80-90% (similar to original)</li>
          <li>🟢 CPU: ~0% (no JavaScript overhead)</li>
          <li>🟢 Net Energy: -25-30% (better overall)</li>
        </ul>
      </div>

      <div style={{ padding: '20px', background: '#e8f5e9', borderRadius: '8px', marginTop: '20px', border: '2px solid #27ae60' }}>
        <h4 style={{ marginBottom: '15px' }}>Implementation guide</h4>
        {/*<p style={{ marginBottom: '15px' }}>Modern lazy loading is incredibly simple:</p>*/}
        <pre style={{ background: '#263238', color: '#aed581', padding: '15px', borderRadius: '6px', overflow: 'auto' }}>
{`<!-- Just add loading="lazy" -->
<img src="image.jpg" alt="Description" loading="lazy">

<!-- For images that should load immediately -->
<img src="hero.jpg" alt="Hero" loading="eager">

<!-- Default behavior (if omitted) -->
<img src="image.jpg" alt="Description">  <!-- Same as eager -->`}
        </pre>
        <p style={{ marginTop: '15px', fontSize: '0.9rem', color: '#555' }}>
          <strong>Browser Support:</strong> Chrome 77+ (2019), Firefox 75+ (2020), Safari 15.4+ (2022), Edge 79+ (2020)
        </p>
      </div>
    </TestContainer>
  );
}

export default DeferOffscreenImagesNative;
