"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, loginByEmailPassword } from "../src/firebase/authentication";
import logo from "./assets/LOGO COM FUNDO TRANSPARENTE_PNG.png";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = async () => {
    try {
      await loginByEmailPassword(email, senha);
      router.push("/dashboard");
    } catch (error: any) {
      setErro("E-mail ou senha inválidos.");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <div className="flex justify-center mb-4">
          <Image
            src={logo} // Substitua com o caminho correto da sua logo
            alt="Logo"
            className="h-24 w-24" // Ajuste o tamanho da logo
          />
        </div>
        <h2 className="text-2xl font-semibold mb-4 text-center">Acessar</h2>

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-md"
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-md"
        />

        {erro && <p className="text-red-500 text-sm mb-2">{erro}</p>}

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
