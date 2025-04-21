import { AuthProvider } from "./context/AuthContext";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="pt-BR">
      <body className="bg-gray-100 text-gray-900">
        <AuthProvider>
          {/* Aqui, você pode adicionar o cabeçalho e o rodapé, se necessário */}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
