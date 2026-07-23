import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Automatically attach JWT token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ======================
// AUTH APIs
// ======================

export const signup = (data) => API.post("/auth/signup", data);

export const login = (data) => API.post("/auth/login", data);

export const getCurrentUser = () => API.get("/users/me");

export const updateProfile = (formData) =>
  API.put("/users/profile", formData);

// ======================
// POSTS APIs
// ======================

export const getPosts = () => API.get("/posts");

export const createPost = async (formData) => {
  const res = await API.post("/posts/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const deletePost = (id) =>
  API.delete(`/posts/${id}`);


export const toggleLike = async (postId) => {
  const res = await API.put(`/posts/${postId}/like`);
  return res.data;
};

export default API;