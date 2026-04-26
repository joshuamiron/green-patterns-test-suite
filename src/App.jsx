import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home.jsx';
import DeferOffscreenImages from './tests/DeferOffscreenImages.jsx';
import DeferOffscreenImages_NoIntersectionObserver from './tests/DeferOffscreenImages_NoIntersectionObserver.jsx';
import AvoidExcessiveDOM from './tests/AvoidExcessiveDOM.jsx';
import KeepRequestCountsLow from './tests/KeepRequestCountsLow.jsx';
import OptimizeImageSize from './tests/OptimizeImageSize.jsx';
import MinimizeMainThreadWork from './tests/MinimizeMainThreadWork.jsx';
import AvoidChainingRequests from './tests/AvoidChainingRequests.jsx';
import EnableTextCompression from './tests/EnableTextCompression.jsx';
import DeprecateGIFs from './tests/DeprecateGIFs.jsx';
import ServeModernFormats from './tests/ServeModernFormats.jsx';
import RemoveUnusedCSS from './tests/RemoveUnusedCSS.jsx';
import MinifyAssets from './tests/MinifyAssets.jsx';
import AvoidUnnecessaryTracking from './tests/AvoidUnnecessaryTracking.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="main-nav">
          <div className="nav-content">
            <Link to="/" className="nav-brand">🌱 Green Patterns Testing</Link>
            <div className="nav-links">
              <a 
                href="https://patterns.greensoftware.foundation/catalog/web/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="nav-link-external"
              >
                📚 Documentation
              </a>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/defer-offscreen-images" element={<DeferOffscreenImages />} />
          <Route path="/defer-offscreen-images_no-intersection-observer" element={<DeferOffscreenImages_NoIntersectionObserver />} /> 
          <Route path="/avoid-excessive-dom" element={<AvoidExcessiveDOM />} />
          <Route path="/keep-request-counts-low" element={<KeepRequestCountsLow />} />
          <Route path="/optimize-image-size" element={<OptimizeImageSize />} />
          <Route path="/minimize-main-thread-work" element={<MinimizeMainThreadWork />} />
          <Route path="/avoid-chaining-requests" element={<AvoidChainingRequests />} />
          <Route path="/enable-text-compression" element={<EnableTextCompression />} />
          <Route path="/deprecate-gifs" element={<DeprecateGIFs />} />
          <Route path="/serve-modern-formats" element={<ServeModernFormats />} />
          <Route path="/remove-unused-css" element={<RemoveUnusedCSS />} />
          <Route path="/minify-assets" element={<MinifyAssets />} />
          <Route path="/avoid-unnecessary-tracking" element={<AvoidUnnecessaryTracking />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
