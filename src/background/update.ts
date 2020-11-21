declare var window: Window & {
  background: {
    send: (channel: string, data?: any) => void;
    on: (channel: string, callback: any) => void;
  };
};

export const getAppVersion = () => {
  window.background.send("GET_APP_VERSION");
};

export const onGetAppVersion = (callback: (version: string) => void) => {
  window.background.on("GET_APP_VERSION", callback);
};

export const onUpdateAvailable = (callback: () => void) => {
  window.background.on("UPDATE_AVAILABLE", callback);
};

export const onUpdateNotAvailable = (callback: () => void) => {
  window.background.on("UPDATE_NOT_AVAILABLE", callback);
};

export const onUpdateDownloaded = (callback: () => void) => {
  window.background.on("UPDATE_DOWNLOADED", callback);
};
