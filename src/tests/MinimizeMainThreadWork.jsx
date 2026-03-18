import { useState, useEffect } from 'react';
import TestContainer from '../components/TestContainer.jsx';
import useLocalStorage from '../hooks/useLocalStorage.js';
import usePerformanceLogging from '../hooks/usePerformanceLogging.js';
import './TestPage.css';

function MinimizeMainThreadWork() {
  const [optimized, setOptimized] = useLocalStorage('minimize-main-thread-work-optimized', false);
  
  // Log performance metrics after 5 seconds
  usePerformanceLogging(optimized, 'MinimizeMainThreadWork', 5000);
  
  const [taskResult, setTaskResult] = useState(null);
  const [autoRunComplete, setAutoRunComplete] = useState(false);

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
      iterations: iterations.toLocaleString(),
      result: result.toFixed(2)
    });
    
    return duration;
  };

  // Auto-run the CPU task 2 seconds after page load for automated testing
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('🔄 Auto-running CPU task for measurement...');
      const duration = runTask();
      console.log(`✅ CPU task completed in ${duration.toFixed(2)}ms`);
      setAutoRunComplete(true);
    }, 2000); // Run at 2 seconds (well within the 5-second measurement window)
    
    return () => clearTimeout(timer);
  }, [optimized]); // Re-run when optimization toggle changes

  return (
    <TestContainer
      title="Minimize Main Thread Work"
      description="Compare optimized execution (fewer iterations) vs heavy computation that blocks the main thread."
      patternUrl="https://patterns.greensoftware.foundation/catalog/web/minimize-main-thread-work"
      optimized={optimized}
      setOptimized={setOptimized}
      metrics={taskResult ? {
        'Duration': `${taskResult.duration}ms`,
        'Iterations': taskResult.iterations,
        'Auto-run': autoRunComplete ? 'Complete ✅' : 'Pending...'
      } : { 'Status': 'Waiting for auto-run...' }}
    >
      <div className="test-explanation">
        <h3>What's Being Tested</h3>
        <div className="explanation-grid">
          <div className="explanation-item">
            <strong>❌ Unoptimized (10,000,000 iterations):</strong>
            <p>Heavy computation blocks the main thread, causing UI freezes and high CPU usage.</p>
          </div>
          <div className="explanation-item">
            <strong>✅ Optimized (100,000 iterations):</strong>
            <p>Reduced workload keeps the main thread responsive and uses less CPU.</p>
          </div>
        </div>
      </div>

      <div style={{ 
        marginBottom: '30px',
        padding: '20px',
        background: autoRunComplete ? '#e8f5e9' : '#fff3cd',
        borderRadius: '8px',
        border: `2px solid ${autoRunComplete ? '#27ae60' : '#f39c12'}`
      }}>
        <h4>🤖 Automated Testing Mode</h4>
        <p>
          {autoRunComplete 
            ? '✅ CPU task auto-ran at 2 seconds after page load'
            : '⏳ CPU task will auto-run in 2 seconds...'}
        </p>
        {taskResult && (
          <div style={{ marginTop: '15px' }}>
            <p><strong>⏱️ Completed in {taskResult.duration}ms</strong></p>
            <p>Iterations: {taskResult.iterations}</p>
            <p>Mode: {optimized ? '✅ Optimized (100,000)' : '❌ Unoptimized (10,000,000)'}</p>
          </div>
        )}
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h4>Manual Testing</h4>
        <p style={{ color: '#666', marginBottom: '15px' }}>
          You can also run the task manually:
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
          Run CPU Task Manually
        </button>
      </div>

      <div className="devtools-tips">
        <h4>💡 For Powermetrics Testing</h4>
        <ul>
          <li><strong>Page loads:</strong> Task auto-runs at 2 seconds</li>
          <li><strong>Measurement window:</strong> 5 seconds captures the full task execution</li>
          <li><strong>Expected:</strong> Optimized should show significantly lower CPU usage</li>
          <li><strong>Console:</strong> Check for auto-run confirmation messages</li>
        </ul>
      </div>
    </TestContainer>
  );
}

export default MinimizeMainThreadWork;
