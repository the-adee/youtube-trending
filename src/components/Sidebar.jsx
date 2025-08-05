import React from 'react';
import './Sidebar.css';

const Sidebar = ({ isOpen }) => {
  return (
    <aside className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className="sidebar-content">
        <nav className="sidebar-nav">
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#" className="nav-link">
                <svg viewBox="0 0 24 24" className="nav-icon">
                  <path d="M12 4.44l-6.95 6.96 6.95 6.97 6.96-6.97L12 4.44zM12 2.5l8.84 8.84c.78.78.78 2.04 0 2.82L12 22.5 3.16 14.16c-.78-.78-.78-2.04 0-2.82L12 2.5z"/>
                </svg>
                <span className="nav-text">Home</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <svg viewBox="0 0 24 24" className="nav-icon">
                  <path d="M10 14.65v-5.3L15 12l-5 2.65zm7.77-4.33c-.77-.32-1.2-.5-1.2-.5L12 18.5 8.43 9.82s-.43.18-1.2.5c-.77.32-1.21-.16-1.21-.16s1.4-5.46 2.09-7.34c.33-.93 1.23-1.52 2.12-1.52s1.79.59 2.12 1.52c.69 1.88 2.09 7.34 2.09 7.34s-.44.48-1.21.16z"/>
                </svg>
                <span className="nav-text">Shorts</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <svg viewBox="0 0 24 24" className="nav-icon">
                  <path d="M10,18v6l5-3l5,3V18h3a2,2,0,0,0,2-2V4a2,2,0,0,0-2-2H4A2,2,0,0,0,2,4V16a2,2,0,0,0,2,2Z"/>
                </svg>
                <span className="nav-text">Subscriptions</span>
              </a>
            </li>
          </ul>
          
          <hr className="sidebar-divider" />
          
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#" className="nav-link">
                <svg viewBox="0 0 24 24" className="nav-icon">
                  <path d="M11 7l6 3.5-6 3.5V7zm13 4.5S24 16 24 12s0-4.5 0-4.5S21.5 7 12 7s-12 .5-12 .5S0 8 0 12s0 4.5 0 4.5S2.5 17 12 17s12-.5 12-.5z"/>
                </svg>
                <span className="nav-text">Library</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <svg viewBox="0 0 24 24" className="nav-icon">
                  <path d="M14.97,16.95L10,13.87V7h2v5.76l4.03,2.49L14.97,16.95z M12,3c-4.96,0-9,4.04-9,9s4.04,9,9,9s9-4.04,9-9S16.96,3,12,3 M12,1c6.08,0,11,4.92,11,11s-4.92,11-11,11S1,18.08,1,12S5.92,1,12,1"/>
                </svg>
                <span className="nav-text">History</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <svg viewBox="0 0 24 24" className="nav-icon">
                  <path d="M21,3H3C1.9,3,1,3.9,1,5v14c0,1.1,0.9,2,2,2h18c1.1,0,2-0.9,2-2V5C23,3.9,22.1,3,21,3z M21,19H3V5h18V19z M10,12l5.5,4V8L10,12z"/>
                </svg>
                <span className="nav-text">Your videos</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <svg viewBox="0 0 24 24" className="nav-icon">
                  <path d="M14,10H3v2h11V10z M14,6H3v2h11V6z M18,14v-4h-2v4h-4v2h4v4h2v-4h4v-2H18z M3,16h7v-2H3V16z"/>
                </svg>
                <span className="nav-text">Watch later</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link active">
                <svg viewBox="0 0 24 24" className="nav-icon">
                  <path d="M17.53,11.2,11.13,2.3A1.85,1.85,0,0,0,9.39,1.5H3.45a1,1,0,0,0-.7,1.7l6.51,6.51a1.85,1.85,0,0,0,2.62,0L17.53,4a1,1,0,0,0-.7-1.7,1.85,1.85,0,0,0-1.74.8Z"/>
                </svg>
                <span className="nav-text">Trending</span>
              </a>
            </li>
          </ul>
          
          <hr className="sidebar-divider" />
          
          <div className="sidebar-section">
            <h3 className="section-title">Explore</h3>
            <ul className="nav-list">
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <svg viewBox="0 0 24 24" className="nav-icon">
                    <path d="M12,3v10.55c-0.59-0.34-1.27-0.55-2-0.55c-2.21,0-4,1.79-4,4s1.79,4,4,4s4-1.79,4-4V7h4V3H12z"/>
                  </svg>
                  <span className="nav-text">Music</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <svg viewBox="0 0 24 24" className="nav-icon">
                    <path d="M13.49,5.48c1.1,0,2.08,0.59,2.62,1.55l1.84,3.24c0.05,0.09,0.11,0.19,0.17,0.29 c0.05,0.08,0.1,0.16,0.15,0.24c0.28,0.43,0.45,0.94,0.45,1.49c0,1.52-1.23,2.75-2.75,2.75s-2.75-1.23-2.75-2.75V9.5 c0-0.55,0.45-1,1-1h4.5c0.55,0,1,0.45,1,1s-0.45,1-1,1h-3.5v1.79c0,0.41,0.34,0.75,0.75,0.75s0.75-0.34,0.75-0.75V11.5 c0-0.28,0.22-0.5,0.5-0.5s0.5,0.22,0.5,0.5v0.79c0,0.96-0.79,1.75-1.75,1.75s-1.75-0.79-1.75-1.75V9.5c0-0.83-0.67-1.5-1.5-1.5 s-1.5,0.67-1.5,1.5v4.81c0,0.52-0.3,0.99-0.77,1.2c-0.47,0.21-1.01,0.12-1.39-0.24L2.81,12.9c-0.56-0.53-0.56-1.39,0-1.92 c0.53-0.5,1.36-0.5,1.89,0l1.18,1.12V9.5c0-1.93,1.57-3.5,3.5-3.5s3.5,1.57,3.5,3.5v0.5h0.5c0.28,0,0.5,0.22,0.5,0.5s-0.22,0.5-0.5,0.5H12.5V9.5c0-0.83-0.67-1.5-1.5-1.5s-1.5,0.67-1.5,1.5v2.81l-0.69-0.65c-0.18-0.17-0.43-0.26-0.69-0.26 s-0.51,0.09-0.69,0.26c-0.38,0.36-0.38,0.94,0,1.3l2.07,1.96c0.09,0.09,0.2,0.15,0.31,0.18c0.14,0.04,0.28,0.04,0.42,0 c0.11-0.03,0.22-0.09,0.31-0.18c0.09-0.09,0.15-0.2,0.18-0.31c0.04-0.14,0.04-0.28,0-0.42c-0.03-0.11-0.09-0.22-0.18-0.31 L9.49,12.21V9.5c0-0.28,0.22-0.5,0.5-0.5s0.5,0.22,0.5,0.5v4.81c0,0.28,0.22,0.5,0.5,0.5s0.5-0.22,0.5-0.5V9.5 C11.49,7.02,12.51,5.48,13.49,5.48z"/>
                  </svg>
                  <span className="nav-text">Sports</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <svg viewBox="0 0 24 24" className="nav-icon">
                    <path d="M21,6H3A1,1,0,0,0,2,7V17a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V7A1,1,0,0,0,21,6ZM20,16H4V8H20ZM10,12l5.5-3v6Z"/>
                  </svg>
                  <span className="nav-text">Gaming</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <svg viewBox="0 0 24 24" className="nav-icon">
                    <path d="M12,2l3.09,6.26L22,9.27l-5,4.87L18.18,22L12,18.77L5.82,22L7,14.14L2,9.27l6.91-1.01L12,2z"/>
                  </svg>
                  <span className="nav-text">News</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <svg viewBox="0 0 24 24" className="nav-icon">
                    <path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M7,7h10v2H7V7z M7,11h10v2H7V11z M7,15h7v2H7V15z"/>
                  </svg>
                  <span className="nav-text">Learning</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
