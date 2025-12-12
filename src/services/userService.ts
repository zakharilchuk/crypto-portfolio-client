import { authInstance } from "./axios";


export async function fetchUserData() {
  try {
    const response = await authInstance.get("/user/profile");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}