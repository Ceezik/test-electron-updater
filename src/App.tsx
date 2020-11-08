import React, { useEffect, useState } from "react";
declare var window: Window & {
  background: {
    send: (channel: string, data?: any) => void;
    on: (channel: string, callback: any) => void;
  };
};

function App() {
  const [version, setVersion] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    window.background.on("GET_APP_VERSION", (version: string) => {
      setVersion(version);
    });

    window.background.on("UPDATE_AVAILABLE", () => {
      setMessage("Update available");
    });

    window.background.on("UPDATE_DOWNLOADED", () => {
      setMessage("Update downloaded, restarting");
    });

    window.background.send("GET_APP_VERSION");
  }, []);

  return (
    <>
      <p>{version ? version : "no version"}</p>
      {message && <p>{message}</p>}
    </>
  );
}

export default App;
