import { useState } from 'react';
import TestContainer from '../components/TestContainer.jsx';
import useLocalStorage from '../hooks/useLocalStorage.js';
import './TestPage.css';

function AvoidChainingRequests() {
  const [optimized, setOptimized] = useLocalStorage('avoid-chaining-requests-optimized', false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const loadResources = async () => {
    setLoading(true);
    setResults(null);
    const startTime = performance.now();

    if (optimized) {
      // PARALLEL: Load all resources simultaneously
      const promises = [
        fetch('https://picsum.photos/id/1/200/150'),
        fetch('https://picsum.photos/id/2/200/150'),
        fetch('https://picsum.photos/id/3/200/150'),
      ];

      await Promise.all(promises);
      const endTime = performance.now();
      
      setResults({
        duration: (endTime - startTime).toFixed(0),
        method: 'Parallel',
        requests: 3
      });
    } else {
      // SEQUENTIAL: Load resources one after another (chained)
      await fetch('https://picsum.photos/id/1/200/150');
      await fetch('https://picsum.photos/id/2/200/150');
      await fetch('https://picsum.photos/id/3/200/150');
      
      const endTime = performance.now();
      
      setResults({
        duration: (endTime - startTime).toFixed(0),
        method: 'Sequential (Chained)',
        requests: 3
      });
    }

    setLoading(false);
  };

  return (
    <TestContainer
      title="Avoid Chaining Critical Requests"
      description="Compare parallel resource loading vs sequential (chained) loading where each request waits for the previous."
      patternUrl="https://patterns.greensoftware.foundation/catalog/web/avoid-chaining-critical-requests"
      optimized={optimized}
      setOptimized={setOptimized}
      metrics={results ? {
        'Load Time': `${results.duration}ms`,
        'Method': results.method,
        'Requests': results.requests
      } : {}}
    >
      <div className="test-explanation">
        <h3>What's Being Tested</h3>
        <div className="explanation-grid">
          <div className="explanation-item">
            <strong>❌ Chained Requests (Sequential):</strong>
            <p>Request 2 waits for Request 1, Request 3 waits for Request 2. Total time = sum of all requests.</p>
            <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px', fontSize: '0.85rem', marginTop: '10px' }}>
Request 1 (300ms) → Request 2 (300ms) → Request 3 (300ms)
Total: ~900ms
            </pre>
          </div>
          <div className="explanation-item">
            <strong>✅ Parallel Requests (Optimized):</strong>
            <p>All requests start simultaneously. Total time = longest single request.</p>
            <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px', fontSize: '0.85rem', marginTop: '10px' }}>
Request 1 (300ms)
Request 2 (300ms)  ← All at once
Request 3 (300ms)
Total: ~300ms
            </pre>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '30px', textAlign: 'center' }}>
        <h4>Request Loading Simulation</h4>
        <p style={{ color: '#666', marginBottom: '20px' }}>
          {optimized ? 'Parallel loading (all at once)' : 'Sequential loading (chained, one after another)'}
        </p>
        
        <button 
          onClick={loadResources}
          disabled={loading}
          style={{
            padding: '15px 30px',
            background: loading ? '#95a5a6' : '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '18px',
            fontWeight: '600'
          }}
        >
          {loading ? '⏳ Loading...' : '🚀 Load 3 Resources'}
        </button>

        {results && (
          <div style={{
            marginTop: '25px',
            padding: '25px',
            background: optimized ? '#e8f5e9' : '#fff3cd',
            borderRadius: '8px',
            border: `3px solid ${optimized ? '#27ae60' : '#ffc107'}`
          }}>
            <h3 style={{ fontSize: '2.5rem', margin: '10px 0' }}>{results.duration}ms</h3>
            <p style={{ fontSize: '1.2rem', marginBottom: '15px' }}>
              <strong>{results.method}</strong> loading of {results.requests} resources
            </p>
            <p style={{ color: optimized ? '#27ae60' : '#f39c12', fontWeight: '600' }}>
              {optimized ? '✅ Fast: All requests made in parallel' : '⚠️ Slow: Each request waited for the previous one'}
            </p>
          </div>
        )}
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h4>Visual Comparison</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          <div style={{ padding: '20px', background: '#ffe6e6', borderRadius: '8px', border: '2px solid #e74c3c' }}>
            <h5 style={{ marginBottom: '15px' }}>❌ Sequential (Bad)</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <div style={{ height: '30px', background: '#3498db', display: 'flex', alignItems: 'center', paddingLeft: '10px', color: 'white', fontSize: '0.85rem' }}>Request 1</div>
              <div style={{ height: '30px', background: '#3498db', display: 'flex', alignItems: 'center', paddingLeft: '10px', color: 'white', fontSize: '0.85rem' }}>Request 2</div>
              <div style={{ height: '30px', background: '#3498db', display: 'flex', alignItems: 'center', paddingLeft: '10px', color: 'white', fontSize: '0.85rem' }}>Request 3</div>
            </div>
            <p style={{ marginTop: '10px', fontSize: '0.9rem', color: '#666' }}>Total: 900ms</p>
          </div>

          <div style={{ padding: '20px', background: '#e8f5e9', borderRadius: '8px', border: '2px solid #27ae60' }}>
            <h5 style={{ marginBottom: '15px' }}>✅ Parallel (Good)</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <div style={{ height: '30px', background: '#27ae60', display: 'flex', alignItems: 'center', paddingLeft: '10px', color: 'white', fontSize: '0.85rem' }}>Request 1 |</div>
              <div style={{ height: '30px', background: '#27ae60', display: 'flex', alignItems: 'center', paddingLeft: '10px', color: 'white', fontSize: '0.85rem', marginTop: '-25px' }}>Request 2 |</div>
              <div style={{ height: '30px', background: '#27ae60', display: 'flex', alignItems: 'center', paddingLeft: '10px', color: 'white', fontSize: '0.85rem', marginTop: '-25px' }}>Request 3 |</div>
            </div>
            <p style={{ marginTop: '10px', fontSize: '0.9rem', color: '#666' }}>Total: 300ms (3x faster!)</p>
          </div>
        </div>
      </div>

      <div className="devtools-tips">
        <h4>💡 What to Check</h4>
        <ul>
          <li><strong>Network Tab:</strong> Compare the waterfall - parallel shows all starting together</li>
          <li><strong>Timeline:</strong> Sequential shows requests in a chain, parallel shows overlap</li>
          <li><strong>Total Time:</strong> Parallel is typically 2-3x faster for multiple resources</li>
          <li><strong>Best Practice:</strong> Use Promise.all() for independent requests</li>
        </ul>
      </div>
    </TestContainer>
  );
}

export default AvoidChainingRequests;
