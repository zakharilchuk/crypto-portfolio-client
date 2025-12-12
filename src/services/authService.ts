import axios from "axios";
import type { LoginData, RegisterData } from "../types/auth";
import { instance } from "./axios";

export async function login(loginData: LoginData) {
  try {
    const response = await instance.post("auth/login", loginData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    }
    throw new Error("Login failed");
  }
}

export async function signup(registerData: RegisterData) {
  try {
    const response = await instance.post("auth/register", registerData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    }
    throw new Error("Registration failed");
  }
}
