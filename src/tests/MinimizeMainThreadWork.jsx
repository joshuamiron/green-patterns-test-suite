import { useState, lazy, Suspense } from 'react';
import TestContainer from '../components/TestContainer.jsx';
import useLocalStorage from '../hooks/useLocalStorage.js';
import './TestPage.css';

// Lazy-loaded component (demonstrates code splitting)
const LazyLoadedChart = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        default: () => (
          <div style={{ padding: '20px', background: '#e8f5e9', borderRadius: '8px', border: '2px solid #27ae60' }}>
            <h4>✅ Lazy-Loaded Component (Code Split)</h4>
            <p>This component was loaded in a separate chunk only when you clicked the button!</p>
            <p>Check the Network tab to see the new chunk file loaded.</p>
            <div style={{ marginTop: '15px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} style={{ padding: '15px', background: '#fff', borderRadius: '4px', textAlign: 'center' }}>
                  📊 {i + 1}
                </div>
              ))}
            </div>
          </div>
        )
      });
    }, 500); // Simulate loading time
  });
});

function MinimizeMainThreadWork() {
  const [optimized, setOptimized] = useLocalStorage('minimize-main-thread-work-optimized', false);
  const [showLazy, setShowLazy] = useState(false);
  const [taskResult, setTaskResult] = useState(null);

  const runTask = () => {
    const start = performance.now();
    let result = 0;
    
    // Optimized: smaller workload
    // Unoptimized: 100x larger workload
    const iterations = optimized ? 100000 : 10000000;
    
    for (let i = 0; i < iterations; i++) {
      result += Math.sqrt(i);
    }
    
    const duration = performance.now() - start;
    setTaskResult({
      duration: duration.toFixed(2),
      iterations: iterations.toLocaleString()
    });
  };

  return (
    <TestContainer
      title="Minimize Main Thread Work"
      description="Compare code splitting and efficient execution vs monolithic bundles with heavy computations."
      patternUrl="https://patterns.greensoftware.foundation/catalog/web/minimize-main-thread-work"
      optimized={optimized}
      setOptimized={setOptimized}
      metrics={taskResult ? {
        'Duration': `${taskResult.duration}ms`,
        'Iterations': taskResult.iterations
      } : {}}
    >
      <div className="test-explanation">
        <h3>What's Being Tested</h3>
        <div className="explanation-grid">
          <div className="explanation-item">
            <strong>❌ Unoptimized:</strong>
            <p>All code in one bundle, heavy tasks block the main thread, UI becomes unresponsive.</p>
          </div>
          <div className="explanation-item">
            <strong>✅ Optimized:</strong>
            <p>Code splitting loads only what's needed, tasks are optimized, main thread stays responsive.</p>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h4>Code Splitting Demo</h4>
        <button 
          onClick={() => setShowLazy(!showLazy)}
          style={{
            padding: '12px 24px',
            background: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          {showLazy ? 'Hide' : 'Load'} Component
        </button>

        <div style={{ marginTop: '15px' }}>
          {showLazy && (
            optimized ? (
              <Suspense fallback={<div style={{ padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>⏳ Loading...</div>}>
                <LazyLoadedChart />
              </Suspense>
            ) : (
              <div style={{ padding: '20px', background: '#ffe6e6', borderRadius: '8px', border: '2px solid #e74c3c' }}>
                <h4>❌ Eagerly Loaded Component</h4>
                <p>This is in the main bundle, increasing initial load time.</p>
                <div style={{ marginTop: '15px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                  {Array.from({ length: 12 }, (_, i) => (
                    <div key={i} style={{ padding: '15px', background: '#fff', borderRadius: '4px', textAlign: 'center' }}>
                      📊 {i + 1}
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h4>Main Thread Work Demo</h4>
        <p style={{ color: '#666', marginBottom: '15px' }}>
          {optimized ? 'Optimized: 100,000 iterations' : 'Unoptimized: 10,000,000 iterations (100x more!)'}
        </p>
        <button 
          onClick={runTask}
          style={{
            padding: '12px 24px',
            background: '#27ae60',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Run CPU Task
        </button>

        {taskResult && (
          <div style={{ 
            marginTop: '15px',
            padding: '20px', 
            background: optimized ? '#e8f5e9' : '#fff3cd',
            borderRadius: '8px'
          }}>
            <p><strong>⏱️ Completed in {taskResult.duration}ms</strong></p>
            <p>Iterations: {taskResult.iterations}</p>
            <p>{optimized ? '✅ Fast and responsive' : '⚠️ Slow - UI may have frozen'}</p>
          </div>
        )}
      </div>

      <div className="devtools-tips">
        <h4>💡 What to Check</h4>
        <ul>
          <li><strong>Network:</strong> See separate chunk load when optimization ON</li>
          <li><strong>Performance:</strong> Record during CPU task - see the difference in task length</li>
          <li><strong>Try clicking around:</strong> With optimization OFF, UI may freeze during the task</li>
        </ul>
      </div>
    </TestContainer>
  );
}

export default MinimizeMainThreadWork;
