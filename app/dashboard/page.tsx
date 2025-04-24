"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { Sidebar } from "@/components/sidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "@/src/firebase/firebase";
import { RefreshCw } from "lucide-react";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const [totalArrecadado, setTotalArrecadado] = useState(0);
  const [quantidadeContribuicoes, setQuantidadeContribuicoes] = useState(0);
  const [contribuicoes, setContribuicoes] = useState<
  { id: string; nome: string; telefone:string; email: string; valor: number }[]
  >([]);
  const router = useRouter();

  async function fetchTotal() {
    try {
      const snapshot = await getDocs(collection(db, "contribuicoes"));
      const total = snapshot.docs.reduce((acc, doc) => {
        const data = doc.data();
        return acc + (data.valor ?? 0);
      }, 0);
      const docsList = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          nome: data.nome ?? "",
          telefone: data.telefone ?? "",
          email: data.email ?? "",
          valor: data.valor ?? 0,
        };
      });
      setContribuicoes(docsList);
      setTotalArrecadado(total);
      setQuantidadeContribuicoes(snapshot.size);
    } catch (error) {
      console.error("Erro ao buscar contribuições:", error);
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteDoc(doc(db, "contribuicoes", id));
      setContribuicoes((prev) => prev.filter((item) => item.id !== id));
      fetchTotal();
    } catch (error) {
      console.error("Erro ao excluir contribuição:", error);
    }
  }
  
  useEffect(() => {
    fetchTotal();
  }, []);

    if (loading) {
      return <div className="text-center mt-10">Acessando...</div>;
    }

    if (!user) {
      router.push("/");
      return <div>Redirecionando...</div>;
    }
  
    return (
      <>
        <Sidebar/>
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-5">Painel Socio desbravador</h1>
          <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Total de valores arrecadados</CardTitle>
              <CardDescription>Atualize para ver o valor mais recente</CardDescription>
            </div>
            <button
              onClick={fetchTotal}
              className="text-gray-600 hover:text-black transition"
              title="Atualizar valor"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold text-green-600">
                R${' '}
                {(totalArrecadado ?? 0).toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </CardContent>
          </Card>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Total de contribuições</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{quantidadeContribuicoes} contribuições registradas</p>
            </CardContent>
          </Card>
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Lista de Contribuições</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left border-b">Nome</th>
                    <th className="px-4 py-2 text-left border-b">Email</th>
                    <th className="px-4 py-2 text-left border-b">Whatsapp</th>
                    <th className="px-4 py-2 text-left border-b">Valor</th>
                    <th className="px-4 py-2 text-left border-b">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {contribuicoes.map((item, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="px-4 py-2">{item.nome}</td>
                      <td className="px-4 py-2">{item.email}</td>
                      <td className="px-4 py-2">{item.telefone}</td>
                      <td className="px-4 py-2">R$ {item.valor.toFixed(2)}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:underline"
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
      
    );
  }