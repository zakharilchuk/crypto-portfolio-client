import type { LoginData, RegisterData } from "../types/auth";
import { instance } from "./axios";

export async function login(loginData: LoginData) {
  try {
    const response = await instance.post("auth/login", loginData);
    return response.data;
  } catch {
    throw new Error("Login failed");
  }
}

export async function register(registerData: RegisterData) {
  try {
    const response = await instance.post("auth/register", registerData);
    return response.data;
  } catch {
    throw new Error("Registration failed");
  }
}
