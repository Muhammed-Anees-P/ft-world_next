import AXIOS from "@/lib/axios";
import { IAuthResponse, ILoginPayload, IRegisterPayload } from "@/types/IRegister";

export const registerUser = async (payload: IRegisterPayload) => {
  const { data } = await AXIOS.post("/auth/register", payload);
  return data;
};

export const loginUser = async (payload: ILoginPayload): Promise<IAuthResponse> => {
  const { data } = await AXIOS.post<IAuthResponse>("/auth/user/login", payload);
  return data;
};