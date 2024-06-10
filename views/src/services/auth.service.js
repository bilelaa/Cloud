import { AxiosClient, AxiosClientAuth } from "../lib/axiosClient";

export const register = async (body) => {
  return AxiosClient.post("/api/auth/register", body).then((res) => res.data)
};



export const login = async (body) => {
  return AxiosClientAuth.post("/api/auth/login", body).then((res) =>  res.data)
};


export const sendEmail = async (body) => {
  return AxiosClient.post("/api/auth/send-email", body).then((res) => res.data)
};


export const verifyEmail = async (body) => {
  return AxiosClient.post("/api/auth/verify-email", body).then((res) => res.data)
};


export const checkAuth = async (body) => {
  return AxiosClientAuth.get("/api/user/check-auth", body).then((res) => res.data)
};


export const logout = async (body) => {
  return AxiosClientAuth.get("/api/auth/logout", body).then((res) => res.data)
};