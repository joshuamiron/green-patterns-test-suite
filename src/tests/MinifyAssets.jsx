import { useState } from 'react';
import './TestPage.css';

/**
 * MinifyAssets Test Page
 * 
 * This page contains intentionally verbose, unminified code.
 * Test by running in dev mode vs production build.
 */
function MinifyAssets() {
  const [calculationResult, setCalculationResult] = useState(null);

  /**
   * Calculate statistics from a data array
   * This demonstrates typical business logic with verbose variable names
   */
  function calculateArrayStatistics() {
    const numberArray = [10, 25, 30, 45, 50, 65, 70, 85, 90];
    
    let totalSum = 0;
    let maximumValue = numberArray[0];
    let minimumValue = numberArray[0];
    
    for (let arrayIndex = 0; arrayIndex < numberArray.length; arrayIndex++) {
      const currentValue = numberArray[arrayIndex];
      
      // Add to total
      totalSum = totalSum + currentValue;
      
      // Check if this is the maximum
      if (currentValue > maximumValue) {
        maximumValue = currentValue;
      }
      
      // Check if this is the minimum
      if (currentValue < minimumValue) {
        minimumValue = currentValue;
      }
    }
    
    const averageValue = totalSum / numberArray.length;
    
    const resultObject = {
      sum: totalSum,
      average: averageValue,
      maximum: maximumValue,
      minimum: minimumValue,
      count: numberArray.length
    };
    
    setCalculationResult(resultObject);
  }

  /**
   * Generate sample data array with descriptive property names
   */
  function generateSampleDataArray() {
    const sampleDataArray = [];
    
    for (let itemIndex = 0; itemIndex < 50; itemIndex++) {
      const sampleItem = {
        identifier: itemIndex + 1,
        description: `Sample Item Number ${itemIndex + 1}`,
        category: itemIndex % 2 === 0 ? 'Category A' : 'Category B',
        isActive: itemIndex % 3 === 0,
        timestamp: new Date().toISOString()
      };
      
      sampleDataArray.push(sampleItem);
    }
    
    return sampleDataArray;
  }

  /**
   * Format a number as currency
   * @param {number} numericValue - The value to format
   * @returns {string} Formatted currency string
   */
  function formatAsCurrency(numericValue) {
    const formattedString = '$' + numericValue.toFixed(2);
    return formattedString;
  }

  /**
   * Check if a value is within a range
   * @param {number} valueToCheck - The value to check
   * @param {number} minimumBoundary - The minimum boundary
   * @param {number} maximumBoundary - The maximum boundary
   * @returns {boolean} Whether value is in range
   */
  function isValueInRange(valueToCheck, minimumBoundary, maximumBoundary) {
    if (valueToCheck >= minimumBoundary && valueToCheck <= maximumBoundary) {
      return true;
    } else {
      return false;
    }
  }

  const sampleData = generateSampleDataArray();

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Minify Web Assets</h1>
        <p className="page-description">
          This page contains verbose code. Compare bundle sizes in dev mode vs production build.
        </p>
        <a 
          href="https://patterns.greensoftware.foundation/catalog/web/minify-web-assets"
          target="_blank"
          rel="noopener noreferrer"
          className="pattern-link"
        >
          📘 View Pattern Documentation
        </a>
      </div>

      <style>{`
        .page-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 40px 20px;
        }
        
        .page-header {
          margin-bottom: 40px;
        }
        
        .page-title {
          font-size: 32px;
          font-weight: bold;
          margin-bottom: 10px;
          color: #333;
        }
        
        .page-description {
          font-size: 16px;
          color: #666;
          margin-bottom: 10px;
        }
        
        .pattern-link {
          color: #007bff;
          text-decoration: none;
          font-size: 14px;
        }
        
        .pattern-link:hover {
          text-decoration: underline;
        }
        
        .minify-instructions {
          background-color: #e3f2fd;
          padding: 25px;
          border-radius: 8px;
          margin-bottom: 30px;
          border: 2px solid #2196f3;
        }
        
        .minify-instructions h3 {
          margin-top: 0;
          color: #1976d2;
        }
        
        .minify-instructions ol {
          line-height: 2;
          margin: 15px 0;
        }
        
        .minify-instructions code {
          background-color: #263238;
          color: #aed581;
          padding: 2px 8px;
          border-radius: 3px;
          font-family: 'Courier New', monospace;
        }
        
        .explanation-section {
          margin-bottom: 30px;
        }
        
        .explanation-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-top: 15px;
        }
        
        .explanation-item {
          padding: 20px;
          background-color: #f8f9fa;
          border-radius: 8px;
          border: 1px solid #dee2e6;
        }
        
        .explanation-item strong {
          display: block;
          margin-bottom: 10px;
          color: #333;
        }
        
        .explanation-item p {
          margin: 0;
          color: #666;
          line-height: 1.6;
        }
        
        .explanation-item code {
          background-color: #263238;
          color: #aed581;
          padding: 2px 6px;
          border-radius: 3px;
          font-size: 13px;
        }
        
        .demo-section {
          margin: 30px 0;
          padding: 25px;
          background-color: #ffffff;
          border-radius: 8px;
          border: 1px solid #dee2e6;
        }
        
        .minify-button {
          padding: 12px 24px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 500;
          transition: background-color 0.2s;
        }
        
        .minify-button:hover {
          background-color: #0056b3;
        }
        
        .minify-result {
          padding: 20px;
          background-color: #d4edda;
          border: 2px solid #28a745;
          border-radius: 8px;
          margin-top: 20px;
        }
        
        .minify-result h4 {
          margin-top: 0;
          color: #155724;
        }
        
        .result-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 15px;
          margin-top: 15px;
        }
        
        .result-item {
          text-align: center;
        }
        
        .result-label {
          font-size: 12px;
          color: #666;
          text-transform: uppercase;
          margin-bottom: 5px;
        }
        
        .result-value {
          font-size: 24px;
          font-weight: bold;
          color: #155724;
        }
        
        .minify-data-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 15px;
          margin-top: 20px;
        }
        
        .minify-data-card {
          padding: 15px;
          background-color: #f8f9fa;
          border-radius: 6px;
          border: 1px solid #dee2e6;
        }
        
        .minify-data-card strong {
          display: block;
          margin-bottom: 5px;
          color: #333;
        }
        
        .minify-data-card-detail {
          font-size: 12px;
          color: #666;
          margin-top: 5px;
        }
        
        .devtools-section {
          margin-top: 40px;
          padding: 25px;
          background-color: #fff3cd;
          border-radius: 8px;
          border: 2px solid #ffc107;
        }
        
        .devtools-section h4 {
          margin-top: 0;
          color: #856404;
        }
        
        .devtools-section ul {
          margin: 15px 0;
          line-height: 1.8;
        }
        
        .devtools-section code {
          background-color: #263238;
          color: #aed581;
          padding: 2px 6px;
          border-radius: 3px;
          font-size: 13px;
        }
      `}</style>

      <div className="minify-instructions">
        <h3>📋 Testing Instructions</h3>
        <ol>
          <li><strong>Step 1 - Dev Mode:</strong> Run <code>npm run dev</code>, open DevTools Network tab, refresh this page, note main JS bundle size</li>
          <li><strong>Step 2 - Prod Mode:</strong> Run <code>npm run build</code> then <code>npm run preview</code>, refresh this page, note main JS bundle size</li>
          <li><strong>Step 3 - Compare:</strong> Production bundle should be 60-75% smaller. Measure with powermetrics for energy impact.</li>
        </ol>
      </div>

      <div className="explanation-section">
        <h3>What's Being Tested</h3>
        <div className="explanation-grid">
          <div className="explanation-item">
            <strong>📝 Development Mode (Unminified)</strong>
            <p>
              All code has long variable names (<code>calculateArrayStatistics</code>), 
              extensive comments, whitespace, and readable formatting. 
              Bundle size: ~500KB+
            </p>
          </div>
          <div className="explanation-item">
            <strong>⚡ Production Build (Minified)</strong>
            <p>
              Code transformed with short variable names (<code>a</code>, <code>b</code>), 
              no comments, no whitespace, optimized. 
              Bundle size: ~150KB (60-75% reduction)
            </p>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>Sample Functionality</h3>
        <p style={{ marginBottom: '20px', color: '#666' }}>
          This page includes typical React code (state management, event handlers, data processing) 
          with verbose function and variable names that will be minified in production:
        </p>
        
        <button className="minify-button" onClick={calculateArrayStatistics}>
          Calculate Statistics (verbose function: calculateArrayStatistics)
        </button>

        {calculationResult && (
          <div className="minify-result">
            <h4>Calculation Results</h4>
            <div className="result-grid">
              <div className="result-item">
                <div className="result-label">Sum</div>
                <div className="result-value">{calculationResult.sum}</div>
              </div>
              <div className="result-item">
                <div className="result-label">Average</div>
                <div className="result-value">{calculationResult.average.toFixed(1)}</div>
              </div>
              <div className="result-item">
                <div className="result-label">Maximum</div>
                <div className="result-value">{calculationResult.maximum}</div>
              </div>
              <div className="result-item">
                <div className="result-label">Minimum</div>
                <div className="result-value">{calculationResult.minimum}</div>
              </div>
              <div className="result-item">
                <div className="result-label">Count</div>
                <div className="result-value">{calculationResult.count}</div>
              </div>
            </div>
          </div>
        )}

        <h4 style={{ marginTop: '40px' }}>Generated Data Sample ({sampleData.length} total items)</h4>
        <p style={{ color: '#666', marginBottom: '15px' }}>
          Generated by <code>generateSampleDataArray()</code> function with verbose property names
        </p>
        <div className="minify-data-grid">
          {sampleData.slice(0, 12).map(item => (
            <div key={item.identifier} className="minify-data-card">
              <strong>{item.description}</strong>
              <div className="minify-data-card-detail">
                Category: {item.category}
              </div>
              <div className="minify-data-card-detail">
                ID: {item.identifier}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="devtools-section">
        <h4>📊 What to Measure</h4>
        <ul>
          <li><strong>Network Tab:</strong> Find main JS bundle (e.g., <code>index-abc123.js</code>) and compare file sizes between dev and prod</li>
          <li><strong>Bundle Contents:</strong> In prod, variable names like <code>calculateArrayStatistics</code> become <code>c</code>, <code>sampleDataArray</code> becomes <code>a</code></li>
          <li><strong>Powermetrics:</strong> Measure CPU energy during page load - smaller bundles = less parsing work</li>
          <li><strong>Expected Savings:</strong> 60-75% reduction in bundle size, faster parse time, lower energy consumption</li>
        </ul>
      </div>
    </div>
  );
}

export default MinifyAssets;