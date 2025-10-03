"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Phone, User, LogOut } from "lucide-react";

export function UserNavbar() {
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <nav className="glass-card shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-soft-blue via-soft-green to-soft-purple rounded-xl blur-sm opacity-20"></div>
                <div className="relative p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                  <Phone className="h-8 w-8 text-soft-blue" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-soft-blue via-soft-green to-soft-purple bg-clip-text text-transparent">
                  Sistema DNC
                </span>
                <p className="text-sm text-gray-500 -mt-1">Captura de Números</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-4 glass-card rounded-full px-6 py-3 border border-gray-200">
              <div className="relative">
                <div className="p-2 bg-soft-green/10 rounded-full">
                  <User className="h-5 w-5 text-soft-green" />
                </div>
              </div>
              <div className="text-sm">
                <p className="font-semibold text-gray-900">{session?.user?.username}</p>
                <p className="text-xs text-soft-green">Vendedor</p>
              </div>
              <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-soft-green to-soft-blue text-white shadow-sm">
                USER
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="flex items-center space-x-2 border-2 border-soft-red text-soft-red hover:bg-soft-red hover:text-white rounded-xl transition-all duration-300 px-4 py-2 shadow-sm"
            >
              <LogOut className="h-5 w-5" />
              <span className="hidden sm:inline font-medium">Salir</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
