import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Automatically attach JWT token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }

  return config;
});

// ======================
// AUTH APIs
// ======================

export const signup = (data) => API.post("/auth/signup", data);

export const login = (data) => API.post("/auth/login", data);

export const getCurrentUser = () => API.get("/users/me");

// ======================
// POSTS APIs
// ======================

export const getPosts = () => API.get("/posts");

// createPost supports an optional onUploadProgress callback
export const createPost = async (formData, onUploadProgress) => {
  const res = await API.post("/posts/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });

  return res.data;
};

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const toggleLike = async (postId) => {
  const res = await API.put(`/posts/${postId}/like`);
  return res.data;
};

export const getPostById = (id) => API.get(`/posts/${id}`);

export const addComment = async (postId, text) => {
  const res = await API.post(`/posts/${postId}/comments`, { text });
  return res.data;
};

export const deleteComment = async (postId, commentId) => {
  const res = await API.delete(`/posts/${postId}/comments/${commentId}`);
  return res.data;
};

// ======================
// USER APIs
// ======================

export const getUserByUsername = (username) => API.get(`/users/${username}`);

export const searchUsers = (query) => API.get(`/users/search?query=${query}`);

export const followUser = (userId) => API.post(`/users/${userId}/follow`);

export const unfollowUser = (userId) => API.post(`/users/${userId}/unfollow`);

export const updateProfile = (formData) => API.put("/users/update", formData);

export const uploadProfilePicture = async (formData) => {
  const res = await API.put("/users/profile-picture", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export default API;

