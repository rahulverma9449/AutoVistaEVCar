export function buildAuthorizeUrl() {
  const domain = import.meta.env.VITE_AUTH_DOMAIN || 'https://AUTH_DOMAIN';
  const clientId = import.meta.env.VITE_CLIENT_ID || 'CLIENT_ID';
  const redirectUri = import.meta.env.VITE_REDIRECT_URI || `${window.location.origin}/callback`;
  const scopes = ['openid', 'profile', 'email'];
  const state = Math.random().toString(36).slice(2);
  const nonce = Math.random().toString(36).slice(2);

  const url = new URL(`${domain.replace(/\/$/, '')}/authorize`);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('client_id', clientId);
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('scope', scopes.join(' '));
  url.searchParams.set('state', state);
  url.searchParams.set('nonce', nonce);

  sessionStorage.setItem('oauth_state', state);
  sessionStorage.setItem('oauth_nonce', nonce);

  return url.toString();
}
