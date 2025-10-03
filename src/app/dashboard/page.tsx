"use client";

import { useSession } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PhoneOff, List, Users, BarChart3, Plus } from "lucide-react";
import { useEffect, useState } from "react";

interface DashboardStats {
  totalDNC: number;
  totalReasons: number;
  totalUsers: number;
  recentEntries: number;
}

export default function Dashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<DashboardStats>({
    totalDNC: 0,
    totalReasons: 0,
    totalUsers: 0,
    recentEntries: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/dashboard/stats");
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Números DNC",
      value: stats.totalDNC,
      description: "Total de números bloqueados",
      icon: PhoneOff,
      color: "text-red-600",
      bgColor: "bg-gradient-to-br from-red-50 to-red-100",
      iconBg: "bg-red-500",
      trend: "+2.4%"
    },
    {
      title: "Motivos",
      value: stats.totalReasons,
      description: "Razones de bloqueo disponibles",
      icon: List,
      color: "text-blue-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      iconBg: "bg-blue-500",
      trend: "Estable"
    },
    {
      title: "Usuarios",
      value: stats.totalUsers,
      description: "Usuarios del sistema",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-gradient-to-br from-green-50 to-green-100",
      iconBg: "bg-green-500",
      trend: "+1 nuevo"
    },
    {
      title: "Entradas Recientes",
      value: stats.recentEntries,
      description: "Últimos 7 días",
      icon: BarChart3,
      color: "text-purple-600",
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
      iconBg: "bg-purple-500",
      trend: "+12.5%"
    }
  ];

  return (
    <div className="space-y-8 p-6 min-h-screen particles-bg">
      {/* Header suave y delicado */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-8 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">¡Bienvenido de vuelta!</h1>
            <p className="text-white/90 text-lg">
              Hola, <span className="font-semibold">{session?.user?.username}</span>
            </p>
            <p className="text-white/75 text-sm mt-1">
              Administrador del Sistema
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Tarjetas de estadísticas con diseño suave */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, index) => (
          <Card key={card.title} className="glass-card border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${card.bgColor.replace('to-', 'to-').replace('from-', 'from-').replace('bg-gradient-to-br', 'bg-')}`}>
                  <card.icon className={`h-6 w-6 ${card.color}`} />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                <p className="text-3xl font-bold text-gray-900 mb-2">
                  {loading ? (
                    <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
                  ) : (
                    card.value.toLocaleString()
                  )}
                </p>
                <p className="text-xs text-gray-500">{card.description}</p>
                <div className="mt-3 flex items-center">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                    {card.trend}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sección de acciones rápidas con diseño suave */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card className="glass-card border-0 shadow-sm rounded-2xl">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Plus className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg text-gray-900">Acciones Rápidas</CardTitle>
                <CardDescription className="text-gray-600">
                  Operaciones más comunes del sistema
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <a
              href="/dashboard/dnc/add"
              className="group flex items-center p-4 bg-white border border-gray-100 rounded-xl hover:border-red-200 hover:bg-red-50/50 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <div className="p-3 bg-red-100 group-hover:bg-red-200 rounded-lg transition-colors">
                <PhoneOff className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-semibold text-gray-900 group-hover:text-red-700">
                  Agregar Número DNC
                </p>
                <p className="text-xs text-gray-500 group-hover:text-red-600">
                  Bloquear nuevo número telefónico
                </p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              </div>
            </a>
            
            <a
              href="/dashboard/dnc"
              className="group flex items-center p-4 bg-white border border-gray-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <div className="p-3 bg-blue-100 group-hover:bg-blue-200 rounded-lg transition-colors">
                <List className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-700">
                  Ver Lista DNC
                </p>
                <p className="text-xs text-gray-500 group-hover:text-blue-600">
                  Consultar números bloqueados
                </p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              </div>
            </a>

            {session?.user?.role === "ADMIN" && (
              <a
                href="/dashboard/users"
                className="group flex items-center p-4 bg-white border border-gray-100 rounded-xl hover:border-purple-200 hover:bg-purple-50/50 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <div className="p-3 bg-purple-100 group-hover:bg-purple-200 rounded-lg transition-colors">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-semibold text-gray-900 group-hover:text-purple-700">
                    Gestionar Usuarios
                  </p>
                  <p className="text-xs text-gray-500 group-hover:text-purple-600">
                    Crear y administrar vendedores
                  </p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                </div>
              </a>
            )}
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-sm rounded-2xl">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <BarChart3 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-lg text-gray-900">Estado del Sistema</CardTitle>
                <CardDescription className="text-gray-600">
                  Monitoreo en tiempo real
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="ml-3 text-sm font-medium text-green-800">
                    Sistema Operativo
                  </p>
                </div>
                <span className="text-xs text-green-600 font-medium">Online</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <p className="ml-3 text-sm font-medium text-blue-800">
                    Base de Datos
                  </p>
                </div>
                <span className="text-xs text-blue-600 font-medium">Conectada</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-100">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <p className="ml-3 text-sm font-medium text-purple-800">
                    APIs
                  </p>
                </div>
                <span className="text-xs text-purple-600 font-medium">Funcionando</span>
              </div>

              <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-600 text-center">
                  Última actualización: {new Date().toLocaleTimeString("es-ES")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
