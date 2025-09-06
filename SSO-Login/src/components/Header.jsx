import React from "react";
import "../styles/header.css";

function Header() {
  return (
    <header className="site-header">
      <nav className="navbar">
        <div className="brand">🏠 Sparkify</div>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/login">Login</a>
          <a href="/dashboard">Dashboard</a>
        </div>
      </nav>
    </header>
  );
}

export default Header;
