import "./globals.css";

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

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
