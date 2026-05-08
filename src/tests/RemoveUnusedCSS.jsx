import { useState } from 'react';
import TestContainer from '../components/TestContainer.jsx';
import useLocalStorage from '../hooks/useLocalStorage.js';
import usePerformanceLogging from '../hooks/usePerformanceLogging.js';
import './TestPage.css';

function RemoveUnusedCSS() {
  const [optimized, setOptimized] = useLocalStorage('remove-unused-css-optimized', false);
  
  // Cache-buster to ensure fresh loads
  const [cacheBuster] = useState(() => Date.now());
  
  // Log performance after 5 seconds
  usePerformanceLogging(optimized, 'RemoveUnusedCSS', 5000);
  
  // Toggle between full Bootstrap and purged Bootstrap
  const cssUrl = optimized
    ? `/assets/bootstrap-purged.css?t=${cacheBuster}`   // ~2-5KB (only 3 classes)
    : `/assets/bootstrap-full.css?t=${cacheBuster}`;    // ~200KB (all definitions)

  return (
    <TestContainer
      title="Remove Unused CSS"
      description="Remove CSS definitions that aren't used. Compare full Bootstrap (10,000+ definitions) vs purged Bootstrap (only 3 definitions needed)."
      patternUrl="https://patterns.greensoftware.foundation/catalog/web/remove-unused-css"
      optimized={optimized}
      setOptimized={setOptimized}
      metrics={{
        'CSS File': optimized ? 'bootstrap-purged.css (~2KB)' : 'bootstrap-full.css (~200KB)',
        'CSS Definitions': optimized ? '~3 (all used)' : '~10,000+ (3 used)',
        'Waste': optimized ? '0%' : '~99.97%'
      }}
    >
      {/* Load CSS file based on optimization state */}
      <link rel="stylesheet" href={cssUrl} />

      <div className="test-explanation">
        <h3>What's Being Tested</h3>
        <div className="explanation-grid">
          <div className="explanation-item">
            <strong>❌ Unoptimized (All Definitions):</strong>
            <p>Full Bootstrap CSS (200KB, 10,000+ definitions). Browser downloads, parses, and processes ALL definitions even though only 3 are used. Wastes bandwidth and CPU parsing time.</p>
          </div>
          <div className="explanation-item">
            <strong>✅ Optimized (Unused Removed):</strong>
            <p>Purged Bootstrap CSS (2-5KB, only 3 definitions). PurgeCSS scanned the code and removed all unused definitions. 98% smaller file, dramatically faster parsing.</p>
          </div>
        </div>
      </div>

      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        backgroundColor: optimized ? '#e8f5e9' : '#ffebee', 
        borderRadius: '8px',
        border: optimized ? '2px solid #4caf50' : '2px solid #f44336'
      }}>
        <h4>Current Configuration: {optimized ? 'Purged CSS ✅' : 'Full CSS ❌'}</h4>
        <div style={{ marginTop: '15px' }}>
          <div style={{ marginBottom: '10px' }}>
            <strong>CSS File:</strong> {optimized ? 'bootstrap-purged.css' : 'bootstrap-full.css'}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>File Size:</strong> {optimized ? '~2-5KB' : '~200KB'}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>CSS Definitions:</strong> {optimized ? '~3' : '~10,000+'}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Network Transfer:</strong> <span style={{ color: optimized ? '#2e7d32' : '#c62828', fontWeight: 'bold' }}>
              {optimized ? '~2-5KB' : '~200KB'}
            </span>
          </div>
          {!optimized && (
            <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#fff3cd', borderRadius: '6px' }}>
              <strong style={{ color: '#856404' }}>⚠️ Waste Analysis:</strong>
              <ul style={{ margin: '8px 0', paddingLeft: '20px', color: '#856404' }}>
                <li>Total CSS definitions loaded: ~10,000+</li>
                <li>CSS definitions actually used: 3</li>
                <li>Unused definitions: ~9,997 (99.97%!)</li>
                <li>Wasted bandwidth: ~195-198KB</li>
                <li>Wasted CPU time: Parsing 9,997 unused rules</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h4>Elements Using Bootstrap Classes</h4>
        <p style={{ color: '#666', marginBottom: '15px' }}>
          This page only uses 3 Bootstrap classes:
        </p>
        
        <div className="card" style={{ marginBottom: '15px' }}>
          <strong>.card</strong>
          <p style={{ color: '#666', marginTop: '8px' }}>Card component with shadow and padding</p>
        </div>

        <div className="card" style={{ marginBottom: '15px' }}>
          <button className="btn btn-primary">.btn .btn-primary</button>
          <p style={{ color: '#666', marginTop: '10px' }}>Primary button styling (uses 2 classes: .btn + .btn-primary)</p>
        </div>

        <div className="card">
          <p className="text-muted">.text-muted</p>
          <p style={{ color: '#666', marginTop: '8px' }}>Muted text color for secondary content</p>
        </div>
      </div>

      <div className="devtools-tips">
        <h4>💡 What to Check</h4>
        <ul>
          <li><strong>Network Tab:</strong> Compare CSS file sizes - bootstrap-full.css (~200KB) vs bootstrap-purged.css (~2-5KB)</li>
          <li><strong>Coverage Tab:</strong> Cmd+Shift+P → "Show Coverage" → Unoptimized shows 99%+ unused CSS</li>
          <li><strong>Performance:</strong> Smaller CSS = faster style calculation and recalculation</li>
          <li><strong>Total Transfer:</strong> Should show ~195KB difference at bottom of Network tab</li>
        </ul>
      </div>

      <div style={{ padding: '20px', backgroundColor: '#e3f2fd', borderRadius: '8px', marginTop: '30px', border: '2px solid #2196f3' }}>
        <h4>🔧 How This Was Created</h4>
        <p style={{ marginBottom: '15px' }}>The purged CSS was created using PurgeCSS:</p>
        <pre style={{ 
          backgroundColor: '#263238', 
          color: '#aed581', 
          padding: '15px', 
          borderRadius: '6px', 
          overflow: 'auto',
          fontSize: '13px'
        }}>{`# Scan HTML for used classes
purgecss --css bootstrap.css \\
         --content *.html \\
         --output bootstrap-purged.css

# Result: 200KB → 2KB (98% reduction)`}</pre>
        <p style={{ marginTop: '15px', fontSize: '14px', color: '#1565c0' }}>
          <strong>Production tools:</strong> PurgeCSS, UnCSS, Tailwind built-in purging, or modern bundlers with CSS tree-shaking.
        </p>
      </div>
    </TestContainer>
  );
}

export default RemoveUnusedCSS;