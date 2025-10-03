"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { 
  Home, 
  PhoneOff, 
  List, 
  Plus, 
  Settings,
  BarChart3,
  Users
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Números DNC", href: "/dashboard/dnc", icon: PhoneOff },
  { name: "Agregar Número", href: "/dashboard/dnc/add", icon: Plus },
  { name: "Motivos", href: "/dashboard/reasons", icon: List },
  { name: "Usuarios", href: "/dashboard/users", icon: Users, adminOnly: true },
  { name: "Reportes", href: "/dashboard/reports", icon: BarChart3 },
  { name: "Configuración", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow pt-6 bg-white/90 backdrop-blur-sm overflow-y-auto border-r border-gray-200/50 shadow-lg">
        <div className="flex items-center flex-shrink-0 px-6 mb-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Home className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Menú Principal
            </h2>
          </div>
        </div>
        
        <div className="flex-grow flex flex-col">
          <nav className="flex-1 px-3 space-y-2">
            {navigation.map((item) => {
              // Hide admin-only items for non-admin users
              if (item.adminOnly && session?.user?.role !== "ADMIN") {
                return null;
              }

              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                      : "text-gray-700 hover:bg-gray-100/80 hover:text-gray-900",
                    "group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 hover:shadow-md"
                  )}
                >
                  <div className={cn(
                    isActive 
                      ? "bg-white/20 p-2 rounded-lg" 
                      : "bg-gray-100 group-hover:bg-gray-200 p-2 rounded-lg transition-colors",
                    "mr-3 flex-shrink-0"
                  )}>
                    <item.icon
                      className={cn(
                        isActive ? "text-white" : "text-gray-500 group-hover:text-gray-700",
                        "h-5 w-5"
                      )}
                    />
                  </div>
                  <span className="flex-1">{item.name}</span>
                  {item.adminOnly && (
                    <span className={cn(
                      isActive 
                        ? "bg-white/20 text-white border border-white/30" 
                        : "bg-purple-100 text-purple-700 border border-purple-200",
                      "text-xs px-2 py-1 rounded-full font-medium"
                    )}>
                      Admin
                    </span>
                  )}
                  {isActive && (
                    <div className="w-1 h-6 bg-white/40 rounded-full ml-2" />
                  )}
                </Link>
              );
            })}
          </nav>
          
          {/* Footer del sidebar */}
          <div className="p-4 border-t border-gray-200/50 mt-8">
            <div className="flex items-center space-x-3 p-3 bg-gray-50/80 rounded-xl">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <div className="text-xs text-gray-600">
                <p className="font-medium">Sistema Online</p>
                <p className="text-gray-500">Puerto: 5501</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
