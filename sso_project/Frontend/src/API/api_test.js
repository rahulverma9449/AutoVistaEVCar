import axios from "axios";
const API_BASE = "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // session cookies
});

// API functions
export const loginWithGoogle = () => {
  window.location.href = `${API_BASE}/login`;
};

export const loginWithSAML = () => {
  window.location.href = `${API_BASE}/auth/saml`;
};

export const loginWithEmail = (email) => {
  window.location.href = `${API_BASE}/auth/email?email=${encodeURIComponent(email)}`;
};

export const getCurrentUser = async () => {
  try {
    const res = await api.get("/me");
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const logoutUser = async () => {
  try {
    await api.get("/logout");
    window.location.href = "/";
  } catch (err) {
    console.error(err);
  }
};

export default api;
