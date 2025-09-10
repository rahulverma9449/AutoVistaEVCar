import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MirrorHeader.css';

export default function MirrorHeader() {
  return (
    <div className="mirror-header">
      <div className="mirror-header-bg" />
      <div className="mirror-header-content">
        <div className="mirror-header-inner">
          <div className="logo-container">
            <div className="logo-icon" />
            <h1 className="logo-title">Mirror SSO</h1>
          </div>
          <nav className="nav-links">
            <Link to="/">Login</Link>
            <Link to="/dashboard">Dashboard</Link>
          </nav>
        </div>
      </div>
      <div className="mirror-header-bottom" />
    </div>
  );
}
