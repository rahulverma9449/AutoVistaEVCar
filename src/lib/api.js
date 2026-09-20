import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 1e4,
  headers: {
    "Content-Type": "application/json"
  }
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      window.location.href = "/auth/signin";
    }
    return Promise.reject(error);
  }
);
const authAPI = {
  // Email/Password authentication
  signIn: async (email, password) => {
    const response = await api.post("/auth/signin", { email, password });
    return response.data;
  },
  signUp: async (name, email, password) => {
    const response = await api.post("/auth/signup", { name, email, password });
    return response.data;
  },
  forgotPassword: async (email) => {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  },
  resetPassword: async (token, password) => {
    const response = await api.post("/auth/reset-password", { token, password });
    return response.data;
  },
  // OAuth authentication
  googleAuth: async (token) => {
    const response = await api.post("/auth/google", { token });
    return response.data;
  },
  githubAuth: async (code) => {
    const response = await api.post("/auth/github", { code });
    return response.data;
  },
  facebookAuth: async (token) => {
    const response = await api.post("/auth/facebook", { token });
    return response.data;
  },
  // User profile
  getProfile: async () => {
    const response = await api.get("/auth/profile");
    return response.data;
  },
  updateProfile: async (data) => {
    const response = await api.put("/auth/profile", data);
    return response.data;
  },
  // Logout
  logout: async () => {
    const response = await api.post("/auth/logout");
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    return response.data;
  }
};
const carsAPI = {
  getCars: async (params) => {
    const response = await api.get("/cars", { params });
    return response.data;
  },
  getCar: async (id) => {
    const response = await api.get(`/cars/${id}`);
    return response.data;
  },
  createCar: async (data) => {
    const response = await api.post("/cars", data);
    return response.data;
  },
  updateCar: async (id, data) => {
    const response = await api.put(`/cars/${id}`, data);
    return response.data;
  },
  deleteCar: async (id) => {
    const response = await api.delete(`/cars/${id}`);
    return response.data;
  },
  searchCars: async (query, filters) => {
    const response = await api.get("/cars/search", {
      params: { q: query, ...filters }
    });
    return response.data;
  }
};
const contactAPI = {
  sendMessage: async (data) => {
    const response = await api.post("/contact", data);
    return response.data;
  },
  sendInquiry: async (carId, data) => {
    const response = await api.post(`/cars/${carId}/inquiry`, data);
    return response.data;
  }
};
const assistantAPI = {
  ask: async (message) => {
    const response = await api.post("/assistant", { message });
    return response.data;
  }
};
var api_default = api;
export {
  authAPI,
  carsAPI,
  contactAPI,
  assistantAPI,
  api_default as default
};
