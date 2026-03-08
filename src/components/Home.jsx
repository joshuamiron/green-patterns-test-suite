import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const patterns = [
    {
      id: 'defer-offscreen-images',
      title: 'Defer Offscreen Images',
      description: 'Test lazy loading vs eager loading of images',
      path: '/defer-offscreen-images',
      difficulty: 'Easy'
    },
    {
      id: 'optimize-image-size',
      title: 'Optimize Image Size',
      description: 'Test properly sized vs oversized images',
      path: '/optimize-image-size',
      difficulty: 'Easy'
    },
    {
      id: 'serve-modern-formats',
      title: 'Serve Images in Modern Formats',
      description: 'Test WebP/AVIF vs JPEG/PNG',
      path: '/serve-modern-formats',
      difficulty: 'Easy'
    },
    {
      id: 'avoid-excessive-dom',
      title: 'Avoid Excessive DOM Size',
      description: 'Test minimal vs bloated DOM structures',
      path: '/avoid-excessive-dom',
      difficulty: 'Medium'
    },
    {
      id: 'keep-request-counts-low',
      title: 'Keep Request Counts Low',
      description: 'Test bundled vs many separate requests',
      path: '/keep-request-counts-low',
      difficulty: 'Medium'
    },
    {
      id: 'minimize-main-thread-work',
      title: 'Minimize Main Thread Work',
      description: 'Test code splitting vs monolithic bundles',
      path: '/minimize-main-thread-work',
      difficulty: 'Medium'
    },
    {
      id: 'avoid-chaining-requests',
      title: 'Avoid Chaining Critical Requests',
      description: 'Test parallel vs sequential resource loading',
      path: '/avoid-chaining-requests',
      difficulty: 'Medium'
    },
    {
      id: 'deprecate-gifs',
      title: 'Deprecate GIFs for Animated Content',
      description: 'Test video vs GIF for animations',
      path: '/deprecate-gifs',
      difficulty: 'Info Only'
    },
    {
      id: 'remove-unused-css',
      title: 'Remove Unused CSS',
      description: 'Test minimal vs bloated CSS',
      path: '/remove-unused-css',
      difficulty: 'Easy'
    },
    {
      id: 'minify-assets',
      title: 'Minify Web Assets',
      description: 'Test minified vs unminified code',
      path: '/minify-assets',
      difficulty: 'Easy'
    },
    {
      id: 'enable-text-compression',
      title: 'Enable Text Compression',
      description: 'Demonstrates gzip/brotli compression (requires server)',
      path: '/enable-text-compression',
      difficulty: 'Info Only'
    },
    {
      id: 'avoid-unnecessary-tracking',
      title: 'Avoid Tracking Unnecessary Data',
      description: 'Test minimal vs excessive analytics',
      path: '/avoid-unnecessary-tracking',
      difficulty: 'Info Only'
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return '#27ae60';
      case 'Medium': return '#f39c12';
      case 'Info Only': return '#3498db';
      default: return '#95a5a6';
    }
  };

  return (
    <div className="home">
      <div className="home-content">
        <header className="home-header">
          <h1>🌱 Green Software Patterns Testing Suite</h1>
          <p className="subtitle">
            Test each pattern individually with toggle switches to compare optimized vs unoptimized performance
          </p>
        </header>

        <section className="info-section">
          <h2>How to Use This Testing Suite</h2>
          <div className="instructions">
            <div className="instruction-item">
              <span className="step-number">1</span>
              <div>
                <strong>Select a Pattern</strong>
                <p>Click on any pattern below to open its isolated test page</p>
              </div>
            </div>
            <div className="instruction-item">
              <span className="step-number">2</span>
              <div>
                <strong>Toggle Optimization</strong>
                <p>Use the switch to turn the pattern ON or OFF</p>
              </div>
            </div>
            <div className="instruction-item">
              <span className="step-number">3</span>
              <div>
                <strong>Measure Impact</strong>
                <p>Open DevTools to see network, performance, and memory differences</p>
              </div>
            </div>
          </div>
        </section>

        <section className="patterns-section">
          <h2>Available Pattern Tests ({patterns.length})</h2>
          <div className="patterns-grid">
            {patterns.map((pattern) => (
              <Link 
                key={pattern.id} 
                to={pattern.path} 
                className="pattern-card"
              >
                <div className="pattern-header">
                  <h3>{pattern.title}</h3>
                  <span 
                    className="difficulty-badge"
                    style={{ backgroundColor: getDifficultyColor(pattern.difficulty) }}
                  >
                    {pattern.difficulty}
                  </span>
                </div>
                <p className="pattern-description">{pattern.description}</p>
                <div className="pattern-footer">
                  <span className="test-link">Open Test →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="tips-section">
          <h2>💡 Testing Tips</h2>
          <ul>
            <li>
              <strong>Network Tab:</strong> Monitor file sizes, request counts, and loading times
            </li>
            <li>
              <strong>Performance Tab:</strong> Record and compare CPU usage and rendering performance
            </li>
            <li>
              <strong>Lighthouse:</strong> Run audits with optimization ON and OFF to see score differences
            </li>
            <li>
              <strong>Coverage Tab:</strong> Check unused CSS/JS percentages
            </li>
            <li>
              <strong>Memory Profiler:</strong> Compare memory usage between optimized and unoptimized
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Home;
