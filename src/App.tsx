import React, { useEffect, useState } from "react";
declare var window: Window & {
  background: {
    send: (channel: string, data?: any) => void;
    on: (channel: string, callback: any) => void;
  };
};

function App() {
  const [version, setVersion] = useState("");
  const [status, setStatus] = useState("Looking for updates");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.background.on("GET_APP_VERSION", (version: string) => {
      setVersion(version);
    });

    window.background.on("UPDATE_AVAILABLE", () => {
      setStatus("Update available");
    });

    window.background.on("UPDATE_NOT_AVAILABLE", () => {
      setLoading(false);
    });

    window.background.on("DOWNLOAD_PROGRESS", (percent: number) => {
      setStatus(`Downloading : ${percent}%`);
    });

    window.background.on("UPDATE_DOWNLOADED", () => {
      setStatus("Update downloaded, restarting");
    });

    window.background.send("GET_APP_VERSION");
  }, []);

  return loading ? (
    <>
      <h3>Hueraki</h3>
      {status && <p>{status}</p>}
    </>
  ) : (
    <p>{version ? version : "no version"}</p>
  );
}

export default App;
