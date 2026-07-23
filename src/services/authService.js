import API from "../api/axios";

export const signup = async (data) => {
  const response = await API.post("/auth/signup", data);
  return response.data;
};

export const login = async (data) => {
  const response = await API.post("/auth/login", data);
  return response.data;
};