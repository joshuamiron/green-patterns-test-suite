import React, { useState } from 'react';
import TestContainer from '../components/TestContainer.jsx';
import useLocalStorage from '../hooks/useLocalStorage.js';
import './TestPage.css';

function OptimizeImageSize() {
  const [optimized, setOptimized] = useLocalStorage('optimize-image-size-optimized', false);

  const images = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    // Optimized: right-sized, Unoptimized: oversized
    url: optimized 
      ? `https://picsum.photos/400/300?random=${i}`
      : `https://picsum.photos/2000/1500?random=${i}`
  }));

  return (
    <TestContainer
      title="Optimize Image Size"
      description="Compare properly sized images vs oversized images."
      patternUrl="https://patterns.greensoftware.foundation/catalog/web/properly-sized-images"
      optimized={optimized}
      setOptimized={setOptimized}
      metrics={{
        'Image Size': optimized ? '~50KB each' : '~500KB each',
        'Total Data': optimized ? '~600KB' : '~6MB'
      }}
    >
      <div className="test-explanation">
        <h3>What's Being Tested</h3>
        <div className="explanation-grid">
          <div className="explanation-item">
            <strong>❌ Unoptimized:</strong>
            <p>Loading 2000x1500px images scaled down to 400x300px. Wastes 90% of bandwidth!</p>
          </div>
          <div className="explanation-item">
            <strong>✅ Optimized:</strong>
            <p>Loading images at exactly the size they're displayed. 10x less data transferred.</p>
          </div>
        </div>
      </div>

      <div className="image-grid">
        {images.map((img) => (
          <div key={img.id} className="image-item">
            <img src={img.url} alt={`Gallery ${img.id}`} className="test-image" />
            <span className="image-label">
              {optimized ? '400x300px' : '2000x1500px'}
            </span>
          </div>
        ))}
      </div>

      <div className="devtools-tips">
        <h4>💡 Check Network Tab</h4>
        <ul>
          <li>Look at the Size column - huge difference!</li>
          <li>Check the total data transferred at the bottom</li>
        </ul>
      </div>
    </TestContainer>
  );
}

export default OptimizeImageSize;
