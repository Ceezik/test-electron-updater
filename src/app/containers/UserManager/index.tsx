import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAuthenticatedUser } from "../../../services/api/users";
import { useInjectReducer } from "../../../store/redux-injectors";
import { sliceKey, reducer, actions } from "./slice";

export const fetchUser = async (dispatch) => {
  try {
    const res = await getAuthenticatedUser();
    dispatch(actions.setUser(res.data));
  } finally {
    dispatch(actions.setLoading(false));
  }
};

export default function UserManager() {
  // @ts-ignore
  useInjectReducer({ key: sliceKey, reducer });
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUser(dispatch);
  }, []);

  return <> </>;
}
