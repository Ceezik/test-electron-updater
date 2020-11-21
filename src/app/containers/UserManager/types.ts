import { User } from "./interfaces";

export interface UserManagerState {
  loading: boolean;
  user?: User;
}

export type ContainerState = UserManagerState;
