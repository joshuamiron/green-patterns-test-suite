import { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage.js';
import TestContainer from '../components/TestContainer.jsx';

function EnableTextCompression() {
  const [optimized, setOptimized] = useLocalStorage('enable-text-compression-optimized', false);

  return (
    <TestContainer
      title="EnableTextCompression"
      description="Toggle to test this pattern's impact."
      patternUrl="https://patterns.greensoftware.foundation/catalog/web/"
      optimized={optimized}
      setOptimized={setOptimized}
    >
      <div style={{padding: '40px', textAlign: 'center'}}>
        <h3>{optimized ? '✅ Optimization Active' : '❌ Optimization Disabled'}</h3>
        <p>Open DevTools to see the impact of this pattern.</p>
        <p style={{marginTop: '20px', color: '#666'}}>
          This is a placeholder test. Full implementation coming soon!
        </p>
      </div>
    </TestContainer>
  );
}

export default EnableTextCompression;
