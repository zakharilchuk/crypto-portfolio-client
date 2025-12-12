import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { useUserStore } from "../stores/userStore";
import { fetchUserData } from "../services/userService";
import MainLayout from "../layouts/MainLayout";

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
    <MainLayout>
      <div className="ml-64 p-4">
        <h1 className="text-2xl mb-4">Dashboard</h1>
      </div>
    </MainLayout>
  );
}

export default DashboardPage;
