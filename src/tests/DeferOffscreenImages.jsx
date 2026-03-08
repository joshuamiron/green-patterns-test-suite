import React, { useState, useEffect, useRef } from 'react';
import TestContainer from '../components/TestContainer.jsx';
import useLocalStorage from '../hooks/useLocalStorage.js';
import './TestPage.css';

function DeferOffscreenImages() {
  const [optimized, setOptimized] = useLocalStorage('defer-offscreen-images-optimized', false);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [metrics, setMetrics] = useState({
    'Images Loaded': 0,
    'Total Requests': 0,
    'Data Transferred': '0 KB'
  });
  const observerRef = useRef(null);

  const images = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    url: `https://picsum.photos/400/300?random=${i + 1}`,
    alt: `Image ${i + 1}`
  }));

  useEffect(() => {
    if (optimized) {
      // Set up Intersection Observer for lazy loading
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              const src = img.dataset.src;
              
              if (src && !img.src) {
                img.src = src;
                setLoadedImages(prev => new Set([...prev, src]));
                observerRef.current.unobserve(img);
              }
            }
          });
        },
        {
          rootMargin: '50px',
          threshold: 0.01
        }
      );

      const imageElements = document.querySelectorAll('img[data-src]');
      imageElements.forEach((img) => observerRef.current.observe(img));

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    } else {
      // Clean up observer when switching to eager loading
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    }
  }, [optimized]);

  useEffect(() => {
    // Update metrics
    const imageElements = document.querySelectorAll('.test-image[src]');
    setMetrics({
      'Images Loaded': imageElements.length,
      'Total Requests': imageElements.length + 5, // +5 for HTML, CSS, JS, etc.
      'Data Transferred': `${(imageElements.length * 50).toFixed(0)} KB` // Approximate
    });
  }, [loadedImages, optimized]);

  return (
    <TestContainer
      title="Defer Offscreen Images"
      description="Compare eager loading (all images load immediately) vs lazy loading (images load only when scrolling near them)."
      patternUrl="https://patterns.greensoftware.foundation/catalog/web/defer-offscreen-images"
      optimized={optimized}
      setOptimized={setOptimized}
      metrics={metrics}
    >
      <div className="test-explanation">
        <h3>What's Being Tested</h3>
        <div className="explanation-grid">
          <div className="explanation-item">
            <strong>❌ Optimization OFF (Eager Loading):</strong>
            <p>All 30 images load immediately when the page loads, even those far below the fold. This uses more bandwidth and CPU upfront.</p>
          </div>
          <div className="explanation-item">
            <strong>✅ Optimization ON (Lazy Loading):</strong>
            <p>Images load only as you scroll near them. This saves bandwidth, reduces initial page load time, and improves performance.</p>
          </div>
        </div>
      </div>

      <div className="image-grid-container">
        <h4>Scroll down to see the effect (30 images total)</h4>
        <div className="image-grid">
          {images.map((image) => (
            <div key={image.id} className="image-item">
              {optimized ? (
                <img
                  data-src={image.url}
                  alt={image.alt}
                  className="test-image lazy"
                  loading="lazy"
                />
              ) : (
                <img
                  src={image.url}
                  alt={image.alt}
                  className="test-image eager"
                />
              )}
              <span className="image-label">Image {image.id}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="devtools-tips">
        <h4>💡 What to Check in DevTools</h4>
        <ul>
          <li><strong>Network Tab:</strong> With optimization OFF, see all images load immediately. With ON, images load as you scroll.</li>
          <li><strong>Performance:</strong> Record while scrolling. Optimized version should show less initial work.</li>
          <li><strong>Coverage:</strong> Check how much data is actually used vs downloaded.</li>
        </ul>
      </div>
    </TestContainer>
  );
}

export default DeferOffscreenImages;
