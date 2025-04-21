import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { AlignJustify, Home, LogOut } from "lucide-react";
import {  useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/src/firebase/authentication";


export  function Sidebar() {
   const router = useRouter();

   const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };
 return (
   <div className="flex w-full flex-col bg-muted/40">

        <div className=" flex flex-col sm:gap-4 ">
            <header className="sticky top-0 z-30 flex h-14 items-center px-4 border-b bg-background gap-4">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="outline">
                            <AlignJustify className="w-5 h-5"/>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side={"left"} className="sm:max-w-x">
                        <SheetHeader>
                            <SheetTitle>Painel Sócio desbravador</SheetTitle>
                        </SheetHeader>
                        <nav className="grid gap-6 text-lg font-medium mt-5">
                            <Link 
                            href="/dashboard"
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                            prefetch={false}
                            >
                                <Home className="h-5 w-5 transition-all"/>
                                Início
                            </Link>
                            <button
                            onClick={handleLogout}
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                            >
                                <LogOut className="h-5 w-5 transition-all" />
                                Sair
                            </button>
                        </nav>
                    </SheetContent>
                </Sheet>
            </header>
        </div>
   </div>
  );
}