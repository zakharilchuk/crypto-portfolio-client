import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { useUserStore } from "../stores/userStore";
import { fetchUserData } from "../services/userService";
import Sidebar from "../layouts/Sidebar";

function DashboardPage() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const setUser = useUserStore((state) => state.setUser);
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

  return (
    <div>
      <Sidebar />
    </div>
  );
}

export default DashboardPage;
