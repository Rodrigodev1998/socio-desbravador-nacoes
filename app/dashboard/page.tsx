"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import useAuthGuard from "../hooks/useAuthGuard";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

    if (loading) {
      return <div className="text-center mt-10">Acessando...</div>;
    }

    if (!user) {
      router.push("/");
      return <div>Redirecionando...</div>;
    }
  
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Área protegida: Dashboard</h1>
      </div>
    );
  }