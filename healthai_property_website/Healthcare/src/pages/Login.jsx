import React from 'react';
import '../styles/Login.css';
import { useAuth0 } from '@auth0/auth0-react';

export default function Login() {
  const { user, loginWithRedirect } = useAuth0();
  console.log("Login user:", user);

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome back</h2>
        <p className="login-subtitle">Sign in with your organization account</p>

        <div>
          {/* Redirect to OAuth / Auth0 login page */}
          <button
            onClick={() => loginWithRedirect({ 
              authorizationParams: { screen_hint: 'login' } 
            })}
            className="login-button sso-button"
          >
            Sign in with SSO
          </button>

          <div className="login-divider">or</div>

          <button
            onClick={() => alert('Demo local sign-in - replace with your own logic')}
            className="login-button email-button"
          >
            Sign in with Email (Demo)
          </button>
        </div>

        <p className="login-footer">By continuing you agree to the company policies.</p>
      </div>
    </div>
  );
}
