// app/layout.tsx
import { Inter } from "next/font/google";
import "../styles/globals.css";

import { AuthProvider } from "@/contexts/AuthContext"; // Importe o AuthProvider

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Plataforma de Crédito Rural",
  description: "Análise de crédito para o agronegócio com IA",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
