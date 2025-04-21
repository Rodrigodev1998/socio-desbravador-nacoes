"use client"

import { createContext, useContext, useEffect, useState } from "react";
 // Importe o auth do Firebase
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/src/firebase/authentication";

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Atualiza o estado do usuário
      setLoading(false); // Finaliza o loading após verificar o estado do usuário
    });

    return () => unsubscribe(); // Limpa o ouvinte quando o componente desmontar
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
