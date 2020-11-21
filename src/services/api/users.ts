import { AxiosResponse } from "axios";
import api from ".";
import { User } from "../../app/containers/UserManager/interfaces";

export const getAuthenticatedUser = () => api.get<User>("/users/me");
