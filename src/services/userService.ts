import { authInstance, instance } from "./axios";

export async function fetchUserData() {
  try {
    const response = await authInstance.get("/user/profile");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

export async function updateUserProfile(payload: {
  name?: string;
  email?: string;
}) {
  try {
    const response = await authInstance.patch("/user/profile", payload);
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
}

export async function deleteUserAccount() {
  try {
    const response = await authInstance.delete("/user");
    return response.data;
  } catch (error) {
    console.error("Error deleting user account:", error);
    throw error;
  }
}

export async function verifyEmail(token: string) {
  try {
    console.log("Verifying email with token:", token);
    const response = await instance.post(`/auth/verify-email?token=${token}`);
    return response.data;
  } catch (error) {
    console.error("Error verifying email:", error);
    throw error;
  }
}

export async function sendVerificationEmail(email: string) {
  const response = await instance.post("/auth/send-verification-email", {
    email,
  });
  return response.data;
}
