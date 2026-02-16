import "./globals.css";
import OfflineAlert from "./components/OfflineAlert";
"use client";
import { useEffect } from "react";


export const metadata = {
  title: "Relatório de Garçons",
  description: "Relatórios de vendas por garçom",
  manifest: "/manifest.json",
  icons: {
    apple: "/icon-192.png",
  },
};

export const viewport = {
  themeColor: "#2563eb",
};

"use client";
import { useEffect } from "react";

export default function RootLayout({ children }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js");
    }
  }, []);

  return (
    <html>
      <body>{children}</body>
    </html>
  );
}

