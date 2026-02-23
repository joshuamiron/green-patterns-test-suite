import React from 'react';
import { Link } from 'react-router-dom';
import './TestContainer.css';

function TestContainer({ 
  title, 
  description, 
  patternUrl,
  optimized, 
  setOptimized, 
  children,
  metrics 
}) {
  return (
    <div className="test-container">
      <div className="test-content">
        <div className="test-header">
          <Link to="/" className="back-link">← Back to All Tests</Link>
          <h1>{title}</h1>
          <p className="test-description">{description}</p>
          {patternUrl && (
            <a 
              href={patternUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="docs-link"
            >
              📚 Read Pattern Documentation
            </a>
          )}
        </div>

        <div className="controls-panel">
          <div className="toggle-control">
            <label className="toggle-label">
              <span className="toggle-text">
                {optimized ? '✅ Optimization ON' : '❌ Optimization OFF'}
              </span>
              <div className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={optimized} 
                  onChange={(e) => setOptimized(e.target.checked)}
                />
                <span className="slider"></span>
              </div>
            </label>
          </div>
          
          <div className="status-indicator">
            <span className={`status-dot ${optimized ? 'optimized' : 'unoptimized'}`}></span>
            <span className="status-text">
              {optimized ? 'Green Mode Active' : 'Unoptimized Mode'}
            </span>
          </div>
        </div>

        {metrics && (
          <div className="metrics-panel">
            <h3>📊 Current Metrics</h3>
            <div className="metrics-grid">
              {Object.entries(metrics).map(([key, value]) => (
                <div key={key} className="metric-item">
                  <span className="metric-label">{key}</span>
                  <span className="metric-value">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="test-demo-area">
          {children}
        </div>

        <div className="testing-instructions">
          <h3>🧪 How to Test This Pattern</h3>
          <ol>
            <li>Open Chrome DevTools (F12 or Cmd/Ctrl + Option/Alt + I)</li>
            <li>Go to the <strong>Network</strong> tab and clear it</li>
            <li>Toggle the optimization switch above</li>
            <li>Observe the differences in:
              <ul>
                <li>Number of requests</li>
                <li>Total transfer size</li>
                <li>Load time</li>
                <li>Resource priorities</li>
              </ul>
            </li>
            <li>Also check the <strong>Performance</strong> tab to record CPU usage</li>
            <li>Run a <strong>Lighthouse</strong> audit with optimization ON vs OFF</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default TestContainer;
