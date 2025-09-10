import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Callback.css'; // import css

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Callback() {
  const navigate = useNavigate();
  const query = useQuery();

  useEffect(() => {
    const code = query.get('code');
    const state = query.get('state');
    const savedState = sessionStorage.getItem('oauth_state');

    if (!code) {
      console.error('OAuth callback missing code', query.get('error'));
      navigate('/');
      return;
    }

    if (state !== savedState) {
      console.error('OAuth state mismatch');
      navigate('/');
      return;
    }

    sessionStorage.setItem('auth_code', code);
    setTimeout(() => navigate('/dashboard'), 400);
  }, []);

  return (
    <div className="callback-container">
      <div className="callback-text">
        <div className="callback-pulse">Processing sign-in…</div>
        <div className="callback-subtitle">You will be redirected shortly</div>
      </div>
    </div>
  );
}
