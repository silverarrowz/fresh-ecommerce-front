import { api } from "./axios";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthResponse {
  user: User;
  access_token: string;
}

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await api.post("/login", credentials);
  return response.data;
};

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await api.post("/register", data);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post("/logout");
};

export const getUser = async (): Promise<User> => {
  const response = await api.get("/user");
  return response.data;
}; 