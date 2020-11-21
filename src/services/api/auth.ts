import { AxiosResponse } from "axios";
import api from ".";
import { User } from "../../app/containers/UserManager/interfaces";

export const signin = (credentials: { email: string; password: string }) =>
  api.post<{ user: User; token: string }>("/auth/signin", credentials);
