export interface IPrivilege {
  _id?: string;
  name: string;
  roles: string[];
}

export interface IUser {
  _id: string;
  username?: string;
  isDeleted: boolean;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isActive: boolean;
  privileges: IPrivilege;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
