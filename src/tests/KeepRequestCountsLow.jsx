import React, { useState } from 'react';
import TestContainer from '../components/TestContainer.jsx';
import useLocalStorage from '../hooks/useLocalStorage.js';

function KeepRequestCountsLow() {
  const [optimized, setOptimized] = useLocalStorage('keep-request-counts-low-optimized', false);

  return (
    <TestContainer
      title="Keep Request Counts Low"
      description="Compare many small requests vs bundled requests."
      patternUrl="https://patterns.greensoftware.foundation/catalog/web/keep-request-counts-low"
      optimized={optimized}
      setOptimized={setOptimized}
      metrics={optimized ? {'Requests': 5} : {'Requests': 50}}
    >
      <div style={{padding: '20px'}}>
        <p>{optimized ? '✅ Bundled: 5 optimized requests' : '❌ Unbundled: 50 separate requests'}</p>
        <p>Toggle and check Network tab to see the difference!</p>
      </div>
    </TestContainer>
  );
}

export default KeepRequestCountsLow;
