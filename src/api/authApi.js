import { apiClient, setAuthToken, clearAuthToken } from "./apiClient";

export async function signup({ email, password, name }) {
  const data = await apiClient.post("/auth/signup", { email, password, name });
  if (data?.token) setAuthToken(data.token);
  return data;
}

export async function login({ email, password }) {
  const data = await apiClient.post("/auth/login", { email, password });
  if (data?.token) setAuthToken(data.token);
  return data;
}

export function logout() {
  clearAuthToken();
}