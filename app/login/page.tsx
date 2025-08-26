// app/login/page.tsx
"use client";

import LoginForm from "@/components/auth/LoginForm"; // Importa o componente de login

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <LoginForm />
    </div>
  );
}
