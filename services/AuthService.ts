import api from "./httpService";

export interface IRegisterPayload {
  email: string;
  username: string;
  password: string;
}

export interface IRegisterResponse {
  token: string;
  user: {
    id: string;
    email: string;
    username: string;
    createdAt: string;
  };
}

class AuthS {
  async register(payload: IRegisterPayload) {
    const response = await api.post<IRegisterResponse>(
      "auth/register",
      payload
    );

    return response.data;
  }
}

const AuthService = new AuthS();

export default AuthService;
