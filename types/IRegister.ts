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

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  //   roles: string[];
  //   createdAt: string;
  //   updatedAt: string;
}

export interface IAuthResponse {
  user: IUser;
  accessToken: string;
  refreshToken?: string;
}
