"use client";

import { useState, useEffect } from "react";
import useMercadoPago from "../hooks/useMercadoPago";
import Image from "next/image";
import logo from "../assets/LOGO COM FUNDO TRANSPARENTE_PNG.png";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/src/firebase/firebase";


export default function Payment() {
    const { createMercadoPagoCheckout } = useMercadoPago();

    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [valor, setValor] = useState<number | null>(null);
    const [outroValor, setOutroValor] = useState<number | "">("");
    const [formValido, setFormValido] = useState(false);
  
    useEffect(() => {
      const isEmailValido = /\S+@\S+\.\S+/.test(email);
      const valorFinal = (valor === 0 ? Number(outroValor) : valor) ?? 0;
  
  
      setFormValido(nome.length > 2 && isEmailValido && valorFinal > 0);
    }, [nome, telefone, email, valor, outroValor]);

    function handleTelefoneChange(e: React.ChangeEvent<HTMLInputElement>) {
      let input = e.target.value;
      input = input.replace(/\D/g, '');
      input = input.replace(/^(\d{2})(\d)/g, '($1) $2');
      input = input.replace(/(\d{5})(\d)/, '$1-$2');
      input = input.slice(0, 15);
      setTelefone(input);
    }

    async function saveUserData() {
      try {
        const docRef = await addDoc(collection(db, "contribuicoes"), {
          nome,
          telefone,
          email,
          valor: valor === 0 ? Number(outroValor) : valor,
          timestamp: new Date(),
        });
        console.log("Documento adicionado com ID: ", docRef.id);
      } catch (e) {
        console.error("Erro ao adicionar documento: ", e);
      }
    }
  
    function handleSubmit() {
      const valorFinal = (valor === 0 ? Number(outroValor) : valor) ?? 0;
      saveUserData();
      createMercadoPagoCheckout({
        nome,
        telefone,
        userEmail: email,
        valor: valorFinal,
      });
    }
  
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
        <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md space-y-6">
          <div className="flex justify-center mb-4">
            <Image
              src={logo}
              alt="Logo"
              className="h-24 w-24" // Ajuste o tamanho da logo
            />
          </div>
          <h1 className="text-xl font-semibold text-center">Seja nosso Socío Desbravador</h1>
  
          <input
            type="text"
            placeholder="Nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />

          <input
            type="text"
            placeholder="Insira o seu whatsapp"
            value={telefone}
            onChange={handleTelefoneChange}
            className="w-full px-4 py-2 border rounded-md"
          />
  
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
  
          <div className="space-y-2">
            <p className="font-medium">Escolha um dos nossos planos ou doe o valor que desejar:</p>
            {[20, 30, 40].map((v) => (
              <label key={v} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="valor"
                  value={v}
                  checked={valor === v}
                  onChange={() => {
                    setValor(v);
                    setOutroValor("");
                  }}
                />
                R$ {v},00
              </label>
            ))}
  
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="valor"
                value="outro"
                checked={valor === 0}
                onChange={() => setValor(0)}
              />
              Gostaria de doar outro valor
            </label>
  
            {valor === 0 && (
              <div className="relative w-full">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
              <input
                type="number"
                placeholder="Digite o valor"
                value={outroValor}
                onChange={(e) => {
                  const value = e.target.value;
                  setOutroValor(value === "" ? "" : Number(value));
                }}
                className="w-full px-4 py-2 pl-10 border rounded-md"
                min={1}
              />
            </div>
            )}
          </div>
  
          <button
            onClick={handleSubmit}
            disabled={!formValido}
            className={`w-full py-2 rounded-md text-white transition ${
              formValido ? "bg-yellow-500 hover:bg-yellow-700" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Contribuir
          </button>
        </div>
      </div>
 );
}