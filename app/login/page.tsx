"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Valida token rápido via localStorage (validação full no useAuth de LoginForm)
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 to-green-500 flex items-center justify-center p-4">
      <div className="bg-black/50 backdrop-blur-xl p-8 rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <LoginForm />
      </div>
    </div>
  );
}
