import { useState } from 'react';
import TestContainer from '../components/TestContainer.jsx';
import useLocalStorage from '../hooks/useLocalStorage.js';
import './TestPage.css';

function RemoveUnusedCSS() {
  const [optimized, setOptimized] = useLocalStorage('remove-unused-css-optimized', false);

  // Massive bloated CSS (unoptimized)
  const bloatedStyles = `
    .unused-style-1 { color: red; font-size: 24px; }
    .unused-style-2 { background: blue; padding: 20px; }
    .unused-style-3 { margin: 30px; border: 5px solid green; }
    .unused-style-4 { display: flex; justify-content: center; }
    .unused-style-5 { grid-template-columns: repeat(3, 1fr); }
    .unused-style-6 { transform: rotate(45deg); }
    .unused-style-7 { animation: spin 2s infinite; }
    .unused-style-8 { box-shadow: 0 10px 20px rgba(0,0,0,0.5); }
    .unused-style-9 { border-radius: 50%; }
    .unused-style-10 { opacity: 0.5; }
    /* ... 90 more unused styles ... */
    .button-primary { background: #3498db; color: white; padding: 12px 24px; border-radius: 6px; border: none; cursor: pointer; }
    .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .text-muted { color: #666; }
  `;

  // Minimal CSS (optimized - only what's used)
  const optimizedStyles = `
    .button-primary { background: #3498db; color: white; padding: 12px 24px; border-radius: 6px; border: none; cursor: pointer; }
    .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .text-muted { color: #666; }
  `;

  const currentStyles = optimized ? optimizedStyles : bloatedStyles;
  const styleSize = new Blob([currentStyles]).size;

  return (
    <TestContainer
      title="Remove Unused CSS"
      description="Compare bloated CSS with unused definitions vs minimal CSS with only what's actually used."
      patternUrl="https://patterns.greensoftware.foundation/catalog/web/remove-unused-css"
      optimized={optimized}
      setOptimized={setOptimized}
      metrics={{
        'CSS Size': `${styleSize} bytes`,
        'Unused Styles': optimized ? '0' : '~100',
        'Efficiency': optimized ? '100%' : '~5%'
      }}
    >
      <style>{currentStyles}</style>

      <div className="test-explanation">
        <h3>What's Being Tested</h3>
        <div className="explanation-grid">
          <div className="explanation-item">
            <strong>❌ Unoptimized:</strong>
            <p>CSS file contains 100+ style definitions, but only 3 are actually used. Wastes bandwidth and parsing time.</p>
          </div>
          <div className="explanation-item">
            <strong>✅ Optimized:</strong>
            <p>CSS contains only the 3 styles that are actually used on this page. Smaller file, faster parsing.</p>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h4>Current CSS Stats</h4>
        <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
          <p><strong>Total CSS Size:</strong> {styleSize} bytes</p>
          <p><strong>Defined Styles:</strong> {optimized ? '3 (all used)' : '~103 (only 3 used)'}</p>
          <p><strong>Waste:</strong> {optimized ? '0%' : '~97%'}</p>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h4>Actual Elements Using CSS</h4>
        <p className="text-muted">These are the only 3 classes actually used on this page:</p>
        
        <div style={{ display: 'grid', gap: '15px', marginTop: '15px' }}>
          <div className="card">
            <strong>.card</strong>
            <p className="text-muted">A card component with shadow and padding</p>
          </div>

          <div className="card">
            <strong>.text-muted</strong>
            <p className="text-muted">Muted text color for secondary content</p>
          </div>

          <div className="card">
            <button className="button-primary">.button-primary</button>
            <p className="text-muted">Primary button styling</p>
          </div>
        </div>
      </div>

      <div className="devtools-tips">
        <h4>💡 What to Check</h4>
        <ul>
          <li><strong>Coverage Tab:</strong> Cmd/Ctrl+Shift+P → "Show Coverage" → See unused CSS %</li>
          <li><strong>Network Tab:</strong> Compare CSS file size (optimized vs unoptimized)</li>
          <li><strong>Performance:</strong> Less CSS = faster style calculation</li>
          <li><strong>Real Tools:</strong> Use PurgeCSS, UnCSS, or build-time CSS minification</li>
        </ul>
      </div>

      <div style={{ padding: '20px', background: '#fff3cd', borderRadius: '8px', marginTop: '20px' }}>
        <h4>ℹ️ In Production</h4>
        <p>Tools like <strong>PurgeCSS</strong>, <strong>UnCSS</strong>, or framework-specific optimizers automatically remove unused CSS during build time.</p>
        <p style={{ marginTop: '10px' }}>This demo simulates that by conditionally loading different CSS based on the optimization setting.</p>
      </div>
    </TestContainer>
  );
}

export default RemoveUnusedCSS;
