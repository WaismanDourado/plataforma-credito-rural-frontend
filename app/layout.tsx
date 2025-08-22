import '../styles/globals.css';
import {Inter} from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "Plataforma de Crédito Rural",
  description: "Análise de crédito rural com IA e Machine Learning",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
