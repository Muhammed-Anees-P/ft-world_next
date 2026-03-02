import { loginUser } from "@/services/authService";
import { useAuthStore } from "@/store/useAuthStore";
import { IAuthResponse, ILoginPayload } from "@/types/IRegister";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation<IAuthResponse, Error, ILoginPayload>({
    mutationFn: loginUser,

    onSuccess: (data) => {
      setAuth(data.access_token, data.user);
    },
  });
};
