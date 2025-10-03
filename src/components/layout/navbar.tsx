"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut, Phone, User } from "lucide-react";

export function Navbar() {
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: "/auth/signin" });
  };

  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-md">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Gestión de Llamadas
                </span>
                <p className="text-xs text-gray-500 -mt-1">Sistema DNC</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-3 bg-gray-50 rounded-full px-4 py-2 border border-gray-200">
              <div className="p-1.5 bg-white rounded-full shadow-sm">
                <User className="h-4 w-4 text-gray-600" />
              </div>
              <div className="text-sm">
                <p className="font-medium text-gray-900">{session?.user?.username}</p>
                <p className="text-xs text-gray-500">
                  {session?.user?.role === "ADMIN" ? "Administrador" : "Vendedor"}
                </p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                session?.user?.role === "ADMIN" 
                  ? "bg-purple-100 text-purple-700 border border-purple-200" 
                  : "bg-green-100 text-green-700 border border-green-200"
              }`}>
                {session?.user?.role === "ADMIN" ? "ADMIN" : "USER"}
              </span>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="flex items-center space-x-2 bg-white hover:bg-red-50 border-gray-200 hover:border-red-200 text-gray-700 hover:text-red-700 shadow-sm"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Salir</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
