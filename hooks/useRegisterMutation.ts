import { registerUser } from "@/services/authService";
import { useAuthStore } from "@/store/useAuthStore";
import { useMutation } from "@tanstack/react-query";

export const useRegisterMutation = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: registerUser,

    onSuccess: (data) => {
      const { accessToken } = data;

      setAuth(accessToken);
    },
  });
};
