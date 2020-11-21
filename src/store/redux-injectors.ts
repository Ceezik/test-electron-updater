import { useInjectReducer as useReducer } from "redux-injectors";
import { InjectReducerParams, RootStateKeyType } from "./injector-typings";

export function useInjectReducer(
  params: InjectReducerParams<RootStateKeyType>
) {
  return useReducer(params);
}
