import AXIOS from "@/lib/axios";
import { IRegisterPayload } from "@/types/IRegister";

export const registerUser = async (payload: IRegisterPayload) => {
  const { data } = await AXIOS.post("/auth/register", payload);
  return data;
};
