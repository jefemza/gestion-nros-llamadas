"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, Shield, Users } from "lucide-react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      // Redirección por rol
      if (session?.user?.role === "ADMIN") {
        router.push("/dashboard");
      } else {
        router.push("/capturar-numero");
      }
    }
  }, [status, router, session]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (session) {
    return null; // Will redirect to dashboard
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden particles-bg">
      {/* Background decorative elements neón */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-neon-blue rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-neon-pink rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse animate-delay-2"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-neon-green rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse animate-delay-4"></div>
        <div className="absolute top-20 right-20 w-40 h-40 bg-neon-purple rounded-full mix-blend-screen filter blur-2xl opacity-15 animate-pulse animate-delay-1"></div>
      </div>
      
      <div className="relative container mx-auto px-4 py-16">
          <div className="text-center mb-24">
            <div className="flex justify-center mb-12">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-soft-blue via-soft-green to-soft-purple rounded-full blur-2xl opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-soft-purple via-soft-blue to-soft-green rounded-full blur-xl opacity-15 animate-delay-2"></div>
                <div className="relative p-8 glass-card rounded-full shadow-lg">
                  <Phone className="h-20 w-20 text-soft-blue" />
                </div>
              </div>
            </div>

            <div className="space-y-8 mb-16">
              <h1 className="text-6xl md:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-soft-blue via-gray-800 to-soft-green bg-clip-text text-transparent">
                  Sistema de Gestión de
                </span>
                <br />
                <span className="bg-gradient-to-r from-soft-green via-soft-purple to-soft-blue bg-clip-text text-transparent">
                  Números de Llamadas
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Administra eficientemente los números <span className="text-soft-blue font-semibold">DNC (Do Not Call)</span> y controla
                las comunicaciones telefónicas de tu organización con nuestra 
                <span className="text-soft-green font-semibold"> plataforma profesional</span> de última generación.
              </p>
            </div>
          
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
              <Button
                onClick={() => router.push("/auth/signin")}
                size="lg"
                className="text-xl px-12 py-6 bg-gradient-to-r from-soft-blue to-soft-green text-white font-bold hover:shadow-xl rounded-2xl transition-all duration-300 hover:scale-105"
              >
                Iniciar Sesión
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              <div className="glass-card px-6 py-3 border border-soft-green/30 rounded-full shadow-sm">
                <span className="text-soft-green font-medium">🔒 Acceso seguro con autenticación</span>
              </div>
            </div>
        </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
            <Card className="text-center border-0 shadow-lg glass-card hover:shadow-xl transition-all duration-500 hover:scale-105 group rounded-2xl">
              <CardHeader className="pb-6">
                <div className="mx-auto mb-8 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-soft-red to-soft-pink rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                  <div className="relative p-6 bg-white rounded-full shadow-sm border border-gray-100">
                    <Phone className="h-12 w-12 text-soft-red" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-soft-red mb-3">Gestión DNC</CardTitle>
                <CardDescription className="text-gray-600 font-medium text-lg">
                  Administra números bloqueados con facilidad
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 leading-relaxed text-lg">
                  Agrega, edita y elimina números de la lista DNC.
                  Organiza por motivos y mantén un <span className="text-soft-red font-semibold">control detallado</span> de todas las operaciones.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg glass-card hover:shadow-xl transition-all duration-500 hover:scale-105 group rounded-2xl">
              <CardHeader className="pb-6">
                <div className="mx-auto mb-8 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-soft-blue to-soft-green rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                  <div className="relative p-6 bg-white rounded-full shadow-sm border border-gray-100">
                    <Shield className="h-12 w-12 text-soft-blue" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-soft-blue mb-3">Control de Acceso</CardTitle>
                <CardDescription className="text-gray-600 font-medium text-lg">
                  Sistema seguro con roles de usuario
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 leading-relaxed text-lg">
                  Autenticación segura con diferentes niveles de acceso.
                  <span className="text-soft-blue font-semibold"> Administradores y vendedores</span> con permisos específicos.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg glass-card hover:shadow-xl transition-all duration-500 hover:scale-105 group rounded-2xl">
              <CardHeader className="pb-6">
                <div className="mx-auto mb-8 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-soft-green to-soft-blue rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                  <div className="relative p-6 bg-white rounded-full shadow-sm border border-gray-100">
                    <Users className="h-12 w-12 text-soft-green" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-soft-green mb-3">Reportes Avanzados</CardTitle>
                <CardDescription className="text-gray-600 font-medium text-lg">
                  Estadísticas y análisis detallados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 leading-relaxed text-lg">
                  Genera reportes completos sobre la actividad del sistema
                  y obtén <span className="text-soft-green font-semibold">insights valiosos</span> para tu organización.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-24 text-center">
            <div className="glass-card rounded-3xl p-10 border border-gray-200 shadow-lg max-w-3xl mx-auto">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="w-3 h-3 bg-soft-green rounded-full animate-pulse"></div>
                <p className="text-lg font-bold text-soft-green">
                  Sistema en línea y funcionando
                </p>
              </div>
              <p className="text-lg text-gray-600 mb-8">
                ¿Necesitas acceso? Contacta al administrador del sistema para obtener tus credenciales.
              </p>
              <div className="flex items-center justify-center space-x-8 text-sm">
                <span className="flex items-center space-x-2 glass-card px-4 py-2 rounded-full border border-gray-200">
                  <Shield className="h-4 w-4 text-soft-blue" />
                  <span className="text-soft-blue font-medium">Seguro</span>
                </span>
                <span className="flex items-center space-x-2 glass-card px-4 py-2 rounded-full border border-gray-200">
                  <Users className="h-4 w-4 text-soft-green" />
                  <span className="text-soft-green font-medium">Multi-usuario</span>
                </span>
                <span className="flex items-center space-x-2 glass-card px-4 py-2 rounded-full border border-gray-200">
                  <Phone className="h-4 w-4 text-soft-purple" />
                  <span className="text-soft-purple font-medium">Tiempo real</span>
                </span>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}