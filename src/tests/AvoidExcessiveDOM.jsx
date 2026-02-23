import React, { useState, useEffect } from 'react';
import TestContainer from '../components/TestContainer.jsx';
import useLocalStorage from '../hooks/useLocalStorage.js';
import './TestPage.css';

function AvoidExcessiveDOM() {
  const [optimized, setOptimized] = useLocalStorage('avoid-excessive-dom-optimized', false);
  const [metrics, setMetrics] = useState({ 'DOM Nodes': 0, 'Depth': 0, 'Memory': 'N/A' });

  useEffect(() => {
    const nodes = document.querySelectorAll('*').length;
    const depth = getMaxDepth(document.body);
    setMetrics({
      'DOM Nodes': nodes,
      'Depth': depth,
      'Memory': performance.memory ? `${(performance.memory.usedJSHeapSize / 1048576).toFixed(2)} MB` : 'N/A'
    });
  }, [optimized]);

  const getMaxDepth = (node) => {
    if (!node.children.length) return 1;
    return 1 + Math.max(...Array.from(node.children).map(getMaxDepth));
  };

  const generateBloatedDOM = () => {
    const items = [];
    for (let i = 0; i < 200; i++) {
      items.push(
        <div key={i} className="bloated-item">
          <div className="wrapper">
            <div className="inner-wrapper">
              <div className="content">
                <div className="header">
                  <span className="title">Item {i + 1}</span>
                  <span className="badge">New</span>
                </div>
                <div className="body">
                  <p className="description">This is a bloated DOM structure with unnecessary nesting</p>
                </div>
                <div className="footer">
                  <button className="btn">Action</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return items;
  };

  const generateOptimizedDOM = () => {
    return Array.from({ length: 200 }, (_, i) => (
      <div key={i} className="optimized-item">
        <span>Item {i + 1}</span>
        <span className="badge">New</span>
        <p>Optimized flat structure</p>
        <button>Action</button>
      </div>
    ));
  };

  return (
    <TestContainer
      title="Avoid Excessive DOM Size"
      description="Compare a bloated, deeply nested DOM structure vs a flat, optimized structure."
      patternUrl="https://patterns.greensoftware.foundation/catalog/web/avoid-excessive-dom-size"
      optimized={optimized}
      setOptimized={setOptimized}
      metrics={metrics}
    >
      <div className="test-explanation">
        <h3>What's Being Tested</h3>
        <div className="explanation-grid">
          <div className="explanation-item">
            <strong>❌ Unoptimized (Deep Nesting):</strong>
            <p>Each item has 7+ levels of nested divs. This increases memory usage, slows down rendering, and makes the browser work harder.</p>
          </div>
          <div className="explanation-item">
            <strong>✅ Optimized (Flat Structure):</strong>
            <p>Same functionality with minimal nesting (2-3 levels). Faster rendering, less memory, better performance.</p>
          </div>
        </div>
      </div>

      <div className="dom-container">
        <div className="dom-stats">
          <div className="dom-stat-item">
            <span className="dom-stat-label">Total Nodes</span>
            <span className="dom-stat-value">{metrics['DOM Nodes']}</span>
          </div>
          <div className="dom-stat-item">
            <span className="dom-stat-label">Max Depth</span>
            <span className="dom-stat-value">{metrics['Depth']}</span>
          </div>
          <div className="dom-stat-item">
            <span className="dom-stat-label">Memory</span>
            <span className="dom-stat-value" style={{fontSize: '1.2rem'}}>{metrics['Memory']}</span>
          </div>
        </div>
        
        <h4 style={{marginBottom: '15px'}}>200 Items Rendered:</h4>
        <div style={{maxHeight: '400px', overflow: 'auto', padding: '10px', background: '#f8f9fa', borderRadius: '6px'}}>
          {optimized ? generateOptimizedDOM() : generateBloatedDOM()}
        </div>
      </div>

      <div className="devtools-tips">
        <h4>💡 What to Check in DevTools</h4>
        <ul>
          <li><strong>Performance Tab:</strong> Record rendering. Optimized version should have faster layout times.</li>
          <li><strong>Memory Profiler:</strong> Take heap snapshots with optimization ON vs OFF.</li>
          <li><strong>Console:</strong> Run `document.querySelectorAll('*').length` to count nodes.</li>
        </ul>
      </div>
    </TestContainer>
  );
}

export default AvoidExcessiveDOM;
