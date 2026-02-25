import { useState } from 'react';
import TestContainer from '../components/TestContainer.jsx';
import useLocalStorage from '../hooks/useLocalStorage.js';
import './TestPage.css';

function MinifyAssets() {
  const [optimized, setOptimized] = useLocalStorage('minify-assets-optimized', false);

  // Unminified JavaScript example
  const unminifiedJS = `
function calculateTotal(items) {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
        total += items[i].price * items[i].quantity;
    }
    return total;
}

function formatCurrency(amount) {
    return '$' + amount.toFixed(2);
}

const cart = [
    { name: 'Widget', price: 9.99, quantity: 2 },
    { name: 'Gadget', price: 19.99, quantity: 1 },
    { name: 'Doohickey', price: 4.99, quantity: 3 }
];

console.log('Total:', formatCurrency(calculateTotal(cart)));
  `.trim();

  // Minified version
  const minifiedJS = `function calculateTotal(t){let e=0;for(let l=0;l<t.length;l++)e+=t[l].price*t[l].quantity;return e}function formatCurrency(t){return"$"+t.toFixed(2)}const cart=[{name:"Widget",price:9.99,quantity:2},{name:"Gadget",price:19.99,quantity:1},{name:"Doohickey",price:4.99,quantity:3}];console.log("Total:",formatCurrency(calculateTotal(cart)));`;

  const currentCode = optimized ? minifiedJS : unminifiedJS;
  const unminifiedSize = new Blob([unminifiedJS]).size;
  const minifiedSize = new Blob([minifiedJS]).size;
  const savings = ((unminifiedSize - minifiedSize) / unminifiedSize * 100).toFixed(1);

  return (
    <TestContainer
      title="Minify Web Assets"
      description="Compare minified vs unminified JavaScript and CSS to see file size reduction."
      patternUrl="https://patterns.greensoftware.foundation/catalog/web/minify-web-assets"
      optimized={optimized}
      setOptimized={setOptimized}
      metrics={{
        'File Size': optimized ? `${minifiedSize} bytes` : `${unminifiedSize} bytes`,
        'Savings': optimized ? `${savings}%` : '0%',
        'Status': optimized ? 'Minified' : 'Unminified'
      }}
    >
      <div className="test-explanation">
        <h3>What's Being Tested</h3>
        <div className="explanation-grid">
          <div className="explanation-item">
            <strong>❌ Unminified:</strong>
            <p>Code with whitespace, comments, long variable names. Larger files = more bandwidth, slower loading.</p>
          </div>
          <div className="explanation-item">
            <strong>✅ Minified:</strong>
            <p>Whitespace removed, variables shortened, comments stripped. 40-60% smaller files, faster downloads.</p>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h4>Size Comparison</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          <div style={{ padding: '20px', background: '#ffe6e6', borderRadius: '8px', border: '2px solid #e74c3c' }}>
            <h5>❌ Unminified</h5>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '10px 0' }}>{unminifiedSize} bytes</p>
            <p style={{ color: '#666' }}>Readable but wasteful</p>
          </div>
          <div style={{ padding: '20px', background: '#e8f5e9', borderRadius: '8px', border: '2px solid #27ae60' }}>
            <h5>✅ Minified</h5>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '10px 0' }}>{minifiedSize} bytes</p>
            <p style={{ color: '#27ae60', fontWeight: '600' }}>Saves {savings}%!</p>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h4>Code Example ({optimized ? 'Minified' : 'Unminified'})</h4>
        <pre style={{
          background: '#263238',
          color: '#aed581',
          padding: '20px',
          borderRadius: '8px',
          overflow: 'auto',
          fontSize: '0.85rem',
          lineHeight: '1.5',
          maxHeight: '400px'
        }}>
          {currentCode}
        </pre>
        <p style={{ marginTop: '10px', color: '#666', fontSize: '0.9rem' }}>
          {optimized
            ? '✅ Variables shortened (items → t), whitespace removed, same functionality'
            : '❌ Full variable names, lots of whitespace and newlines'
          }
        </p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h4>Real-World Impact</h4>
        <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #ddd' }}>
                <th style={{ padding: '10px', textAlign: 'left' }}>Asset Type</th>
                <th style={{ padding: '10px', textAlign: 'right' }}>Typical Savings</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px' }}>JavaScript</td>
                <td style={{ padding: '10px', textAlign: 'right', color: '#27ae60', fontWeight: '600' }}>40-60%</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px' }}>CSS</td>
                <td style={{ padding: '10px', textAlign: 'right', color: '#27ae60', fontWeight: '600' }}>30-50%</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px' }}>HTML</td>
                <td style={{ padding: '10px', textAlign: 'right', color: '#27ae60', fontWeight: '600' }}>10-20%</td>
              </tr>
              <tr>
                <td style={{ padding: '10px' }}>SVG</td>
                <td style={{ padding: '10px', textAlign: 'right', color: '#27ae60', fontWeight: '600' }}>20-40%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="devtools-tips">
        <h4>💡 How to Minify</h4>
        <ul>
          <li><strong>Build Tools:</strong> Vite, Webpack, Rollup do this automatically in production</li>
          <li><strong>JavaScript:</strong> Terser, UglifyJS, ESBuild</li>
          <li><strong>CSS:</strong> cssnano, clean-css, postcss-minify</li>
          <li><strong>HTML:</strong> html-minifier, HTMLMinifier</li>
          <li><strong>Compression:</strong> Combine minification with gzip/brotli for even more savings!</li>
        </ul>
      </div>

      <div style={{ padding: '20px', background: '#e3f2fd', borderRadius: '8px', border: '2px solid #2196f3' }}>
        <h4>ℹ️ Production Build</h4>
        <p>This Vite app automatically minifies all assets when you run <code style={{ background: '#263238', color: '#aed581', padding: '2px 6px', borderRadius: '3px' }}>npm run build</code></p>
        <p style={{ marginTop: '10px' }}>Check the <code>dist/</code> folder after building to see minified output!</p>
      </div>
    </TestContainer>
  );
}

export default MinifyAssets;
