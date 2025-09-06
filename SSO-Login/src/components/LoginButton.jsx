import React, { useState } from "react";
import "../styles/login.css";
import { loginWithEmail, loginWithGoogle, loginWithSAML } from "../API/api_test.js";

export default function Login() {
  const [loading, setLoading] = useState(false);

  const handleSSO = (method, email) => {
    setLoading(true);
    if (method === "google") loginWithGoogle();
    if (method === "saml") loginWithSAML();
    if (method === "email") loginWithEmail(email);
  };

  return (
    <div className="login-page">
      <div className="login-card" role="main" aria-labelledby="login-title">
        <div className="brand">
          <div className="logo" aria-hidden="true">🏠</div>
          <h1 id="login-title">Sparkify Properties</h1>
          <p className="subtitle">Sign in to manage listings, leads & dashboard</p>
        </div>

        <div className="sso-buttons" aria-hidden={loading}>
          <button className="btn google" onClick={() => handleSSO("google")}>
            <span className="icon" dangerouslySetInnerHTML={{ __html: googleSVG }} />
            <span className="label">Sign in with Google</span>
          </button>

          <button className="btn saml" onClick={() => handleSSO("saml")}>
            <span className="icon" dangerouslySetInnerHTML={{ __html: samlSVG }} />
            <span className="label">Enterprise SSO (SAML)</span>
          </button>
        </div>

        <div className="divider"><span>or</span></div>

        <form
          className="email-form"
          onSubmit={(e) => {
            e.preventDefault();
            const email = e.target.email.value;
            handleSSO("email", email);
          }}
        >
          <label htmlFor="email">Email address</label>
          <input id="email" name="email" type="email" placeholder="you@example.com" required />
          <button type="submit" className="btn primary">Continue with Email</button>
        </form>

        {loading && (
          <div className="loading-overlay" role="status" aria-live="polite">
            <div className="spinner" />
            <span className="loading-text">Redirecting to identity provider…</span>
          </div>
        )}
      </div>
    </div>
  );
}

const googleSVG = `<svg ...>...</svg>`;
const samlSVG = `<svg ...>...</svg>`;
