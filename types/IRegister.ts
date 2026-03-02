import { IUser } from "./IUser";

export interface IRegisterPayload {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  //   address: string;
  password: string;
}

export interface ILoginPayload {
  email?: string;
  phone?: string;
  password: string;
}

export interface IAuthResponse {
  user: IUser;
  access_token: string;
  refreshToken?: string;
}
