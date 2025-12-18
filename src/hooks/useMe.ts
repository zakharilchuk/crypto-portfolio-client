import { useQuery } from "@tanstack/react-query";
import { fetchUserData } from "../services/userService";
import { useAuthStore } from "../stores/authStore";

export const useMe = () => {
  const accessToken = useAuthStore((s) => s.accessToken);

  return useQuery({
    queryKey: ["me"],
    queryFn: fetchUserData,
    enabled: !!accessToken,
    staleTime: 1000 * 60, // 1 хв
    retry: false,
  });
};
