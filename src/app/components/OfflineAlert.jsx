"use client";

import { useEffect, useState } from "react";

export default function OfflineAlert() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const updateStatus = () => {
      setIsOffline(!navigator.onLine);
    };

    updateStatus();

    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);

    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div style={styles.container}>
      <span>⚠️ Você está offline. Conecte-se à internet para gerar relatórios.</span>
    </div>
  );
}

const styles = {
  container: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    backgroundColor: "#dc2626",
    color: "#fff",
    textAlign: "center",
    padding: "12px",
    fontWeight: "bold",
    zIndex: 9999,
  },
};

