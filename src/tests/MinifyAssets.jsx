import './TestPage.css';

/**
 * MinifyAssets Test Page
 * 
 * This page contains intentionally verbose, unminified code with:
 * - Long variable names (generateSampleDataArray, sampleDataArray, itemIndex)
 * - Extensive comments explaining each step
 * - Lots of whitespace for readability
 * - Descriptive property names (identifier, description, category, isActive, timestamp)
 * 
 * When built for production, Vite will minify all of this code.
 */
function MinifyAssets() {
  /**
   * Generate sample data array with descriptive property names
   * This function demonstrates typical business logic that will be minified
   */
  function generateSampleDataArray() {
    const sampleDataArray = [];
    
    // Loop through and create 50 sample items
    for (let itemIndex = 0; itemIndex < 50; itemIndex++) {
      // Create a sample item with descriptive property names
      const sampleItem = {
        identifier: itemIndex + 1,
        description: `Sample Item Number ${itemIndex + 1}`,
        category: itemIndex % 2 === 0 ? 'Category A' : 'Category B',
        isActive: itemIndex % 3 === 0,
        timestamp: new Date().toISOString()
      };
      
      // Add the item to our array
      sampleDataArray.push(sampleItem);
    }
    
    return sampleDataArray;
  }

  /**
   * Filter array to only include active items
   * @param {Array} dataArray - The array to filter
   * @returns {Array} Filtered array with only active items
   */
  function filterActiveItems(dataArray) {
    const filteredArray = [];
    
    // Loop through all items
    for (let arrayIndex = 0; arrayIndex < dataArray.length; arrayIndex++) {
      const currentItem = dataArray[arrayIndex];
      
      // Check if the item is active
      if (currentItem.isActive === true) {
        filteredArray.push(currentItem);
      }
    }
    
    return filteredArray;
  }

  /**
   * Format a date string in a human-readable way
   * @param {string} isoDateString - ISO format date string
   * @returns {string} Formatted date string
   */
  function formatDateString(isoDateString) {
    const dateObject = new Date(isoDateString);
    const formattedString = dateObject.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    return formattedString;
  }

  // Generate our sample data
  const allSampleData = generateSampleDataArray();
  const activeItemsOnly = filterActiveItems(allSampleData);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Minify Web Assets</h1>
        <p className="page-description">
          This page contains verbose code with long variable/function names, comments, and whitespace. 
          Compare bundle sizes in dev mode vs production build.
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
          line-height: 1.6;
        }
        
        .pattern-link {
          color: #007bff;
          text-decoration: none;
          font-size: 14px;
        }
        
        .pattern-link:hover {
          text-decoration: underline;
        }
        
        .instructions-box {
          background-color: #e3f2fd;
          padding: 25px;
          border-radius: 8px;
          margin-bottom: 30px;
          border: 2px solid #2196f3;
        }
        
        .instructions-box h3 {
          margin-top: 0;
          color: #1976d2;
        }
        
        .instructions-box ol {
          line-height: 2.2;
          margin: 15px 0;
          padding-left: 25px;
        }
        
        .instructions-box li {
          margin-bottom: 10px;
        }
        
        .instructions-box code {
          background-color: #263238;
          color: #aed581;
          padding: 3px 8px;
          border-radius: 3px;
          font-family: 'Courier New', monospace;
          font-size: 14px;
        }
        
        .file-highlight {
          background-color: #fff3cd;
          padding: 2px 6px;
          border-radius: 3px;
          font-weight: 600;
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
          font-size: 16px;
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
        
        .data-section {
          margin: 30px 0;
          padding: 25px;
          background-color: #ffffff;
          border-radius: 8px;
          border: 1px solid #dee2e6;
        }
        
        .data-section h3 {
          margin-top: 0;
          color: #333;
        }
        
        .data-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 15px;
          margin-top: 20px;
        }
        
        .data-card {
          padding: 15px;
          background-color: #f8f9fa;
          border-radius: 6px;
          border: 1px solid #dee2e6;
        }
        
        .data-card-title {
          font-weight: 600;
          margin-bottom: 8px;
          color: #333;
        }
        
        .data-card-detail {
          font-size: 13px;
          color: #666;
          margin: 4px 0;
        }
        
        .measurement-section {
          margin-top: 40px;
          padding: 25px;
          background-color: #fff3cd;
          border-radius: 8px;
          border: 2px solid #ffc107;
        }
        
        .measurement-section h4 {
          margin-top: 0;
          color: #856404;
        }
        
        .measurement-section ul {
          margin: 15px 0;
          line-height: 1.8;
        }
        
        .measurement-section code {
          background-color: #263238;
          color: #aed581;
          padding: 2px 6px;
          border-radius: 3px;
          font-size: 13px;
        }
      `}</style>

      <div className="instructions-box">
        <h3>📋 How to Test This Pattern</h3>
        <ol>
          <li>
            <strong>Development Mode (Unminified):</strong><br/>
            Run <code>npm run dev</code>, open this page, open DevTools → Network tab<br/>
            Look for: <span className="file-highlight">index-[hash].js</span> (main bundle) - note the file size
          </li>
          <li>
            <strong>Production Build (Minified):</strong><br/>
            Run <code>npm run build</code> then <code>npm run preview</code>, open this page<br/>
            Look for: <span className="file-highlight">index-[hash].js</span> (same file) - note the NEW size
          </li>
          <li>
            <strong>Compare Results:</strong><br/>
            Production bundle should be <strong>60-75% smaller</strong>. Use powermetrics to measure CPU energy savings.
          </li>
        </ol>
        
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e8f5e9', borderRadius: '6px', border: '1px solid #4caf50' }}>
          <strong style={{ color: '#2e7d32' }}>💡 Which File to Look For:</strong>
          <p style={{ margin: '8px 0 0 0', color: '#1b5e20' }}>
            In the Network tab, find the file named something like: <code style={{ backgroundColor: '#1b5e20', color: '#a5d6a7' }}>index-a1b2c3d4.js</code><br/>
            The hash (a1b2c3d4) will be different each time, but it starts with "index-" and is the largest JS file.
          </p>
        </div>
      </div>

      <div className="explanation-section">
        <h3>What Gets Minified</h3>
        <div className="explanation-grid">
          <div className="explanation-item">
            <strong>📝 Development Mode</strong>
            <p>
              Variable names: <code>generateSampleDataArray</code>, <code>sampleDataArray</code>, <code>itemIndex</code><br/>
              Comments: All the <code>/* comments */</code> are preserved<br/>
              Whitespace: Readable indentation and line breaks<br/>
              <strong>Result:</strong> Large, readable bundle (~500KB+)
            </p>
          </div>
          <div className="explanation-item">
            <strong>⚡ Production Build</strong>
            <p>
              Variable names: <code>a</code>, <code>b</code>, <code>c</code> (shortened)<br/>
              Comments: All removed<br/>
              Whitespace: All removed (one long line)<br/>
              <strong>Result:</strong> Small, compact bundle (~150KB - 70% smaller!)
            </p>
          </div>
        </div>
      </div>

      <div className="data-section">
        <h3>Sample Data Display</h3>
        <p style={{ color: '#666', marginBottom: '15px' }}>
          This page generates and displays data using verbose function names 
          (<code>generateSampleDataArray</code>, <code>filterActiveItems</code>) 
          that will be minified in production builds.
        </p>
        <p style={{ color: '#666', marginBottom: '15px' }}>
          <strong>Total items:</strong> {allSampleData.length} | <strong>Active items:</strong> {activeItemsOnly.length}
        </p>
        <div className="data-grid">
          {activeItemsOnly.slice(0, 9).map(function(currentItem) {
            return (
              <div key={currentItem.identifier} className="data-card">
                <div className="data-card-title">
                  {currentItem.description}
                </div>
                <div className="data-card-detail">
                  Category: {currentItem.category}
                </div>
                <div className="data-card-detail">
                  ID: {currentItem.identifier}
                </div>
                <div className="data-card-detail">
                  Status: Active
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="measurement-section">
        <h4>📊 Expected Results</h4>
        <ul>
          <li><strong>Bundle Size Reduction:</strong> 60-75% smaller in production</li>
          <li><strong>Parse Time:</strong> Faster (less text to process)</li>
          <li><strong>Network Transfer:</strong> Less data downloaded</li>
          <li><strong>Energy Consumption:</strong> Lower CPU usage during parsing</li>
        </ul>
        <p style={{ marginTop: '15px', color: '#856404' }}>
          <strong>Note:</strong> This is a build-time optimization, not something that can be fixed in source code. 
          The pattern is: "Always deploy production builds, never development builds."
        </p>
      </div>
    </div>
  );
}

export default MinifyAssets;