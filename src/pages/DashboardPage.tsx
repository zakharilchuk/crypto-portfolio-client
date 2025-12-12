import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { useUserStore } from "../stores/userStore";
import { fetchUserData } from "../services/userService";

function DashboardPage() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    } else {
      fetchUserData()
        .then((data) => {
          setUser(data);
        })
        .catch((error) => {
          console.error("Failed to fetch user data:", error);
          navigate("/login");
        });
    }
  }, [accessToken, navigate, setUser]);

  return <div>
    <h1>Welcome to the Dashboard!</h1>
    {user ? (
      <div>
        <p>User Name: {user.name}</p>
        <p>Email: {user.email}</p>
      </div>
    ) : (
      <p>Loading user data...</p>
    )}
  </div>;
}

export default DashboardPage;
