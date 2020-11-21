import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { reducer, sliceKey, actions } from "./slice";
import { useInjectReducer } from "../../../store/redux-injectors";
import {
  getAppVersion,
  onGetAppVersion,
  onUpdateAvailable,
  onUpdateNotAvailable,
  onUpdateDownloaded,
} from "../../../background/update";

export default function UpdateManager() {
  // @ts-ignore
  useInjectReducer({ key: sliceKey, reducer });
  const dispatch = useDispatch();

  useEffect(() => {
    onGetAppVersion((version: string) => dispatch(actions.setVersion(version)));
    onUpdateAvailable(() => dispatch(actions.setStatus("update.available")));
    onUpdateNotAvailable(() => {
      dispatch(actions.setLoading(false));
      dispatch(actions.setStatus(""));
    });
    onUpdateDownloaded(() => dispatch(actions.setStatus("update.downloaded")));

    getAppVersion();
  }, []);

  return <> </>;
}
