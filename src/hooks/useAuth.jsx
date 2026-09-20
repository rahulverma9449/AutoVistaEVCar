import { useState, useEffect, createContext, useContext } from "react";
import { authAPI } from "@/lib/api";
const AuthContext = createContext(void 0);
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);
  const signIn = async (email, password) => {
    try {
      const response = await authAPI.signIn(email, password);
      const { token, user: userData } = response;
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      throw error;
    }
  };
  const signUp = async (name, email, password) => {
    try {
      const response = await authAPI.signUp(name, email, password);
      const { token, user: userData } = response;
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      throw error;
    }
  };
  const signOut = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
    } finally {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      setUser(null);
    }
  };
  const forgotPassword = async (email) => {
    try {
      await authAPI.forgotPassword(email);
    } catch (error) {
      throw error;
    }
  };
  const googleSignIn = async (token) => {
    try {
      const response = await authAPI.googleAuth(token);
      const { token: authToken, user: userData } = response;
      localStorage.setItem("authToken", authToken);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      throw error;
    }
  };
  const githubSignIn = async (code) => {
    try {
      const response = await authAPI.githubAuth(code);
      const { token, user: userData } = response;
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      throw error;
    }
  };
  const facebookSignIn = async (token) => {
    try {
      const response = await authAPI.facebookAuth(token);
      const { token: authToken, user: userData } = response;
      localStorage.setItem("authToken", authToken);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      throw error;
    }
  };
  const updateProfile = async (data) => {
    const response = await authAPI.updateProfile(data);
    const updatedUser = response.user;
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };
  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    forgotPassword,
    googleSignIn,
    githubSignIn,
    facebookSignIn,
    updateProfile
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
function useAuth() {
  const context = useContext(AuthContext);
  if (context === void 0) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
export {
  AuthProvider,
  useAuth
};
