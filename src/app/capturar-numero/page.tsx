"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Save, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { UserNavbar } from "@/components/layout/user-navbar";
import { Toaster } from "@/components/ui/sonner";

const capturarNumeroSchema = z.object({
  phone: z.string()
    .min(10, "El número debe tener 10 dígitos")
    .max(10, "El número debe tener 10 dígitos")
    .regex(/^[0-9]{10}$/, "Solo se permiten 10 dígitos numéricos"),
  reasonId: z.string().min(1, "Debe seleccionar un motivo"),
  notes: z.string().optional(),
});

type CapturarNumeroForm = z.infer<typeof capturarNumeroSchema>;

interface Reason {
  id: string;
  name: string;
}

export default function CapturarNumeroPage() {
  const { data: session } = useSession();
  const [reasons, setReasons] = useState<Reason[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingReasons, setLoadingReasons] = useState(true);
  const [successCount, setSuccessCount] = useState(0);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    watch
  } = useForm<CapturarNumeroForm>({
    resolver: zodResolver(capturarNumeroSchema),
  });

  const phoneValue = watch("phone");

  useEffect(() => {
    // Redirigir ADMIN al dashboard
    if (session?.user?.role === "ADMIN") {
      router.push("/dashboard");
      return;
    }
    fetchReasons();
  }, [session, router]);

  useEffect(() => {
    // Auto-format phone number as user types
    if (phoneValue && phoneValue.length <= 10) {
      const numericOnly = phoneValue.replace(/\D/g, '');
      if (numericOnly !== phoneValue) {
        setValue("phone", numericOnly);
      }
    }
  }, [phoneValue, setValue]);

  const fetchReasons = async () => {
    try {
      const response = await fetch("/api/reasons");
      if (response.ok) {
        const data = await response.json();
        setReasons(data);
      } else {
        toast.error("Error al cargar los motivos");
      }
    } catch {
      toast.error("Error al cargar los motivos");
    } finally {
      setLoadingReasons(false);
    }
  };

  const onSubmit = async (data: CapturarNumeroForm) => {
    setLoading(true);
    
    const payload = {
      phone: data.phone,
      reasonId: data.reasonId,
      notes: data.notes || null,
    };
    
    console.log("Sending payload:", payload); // Debug log
    
    try {
      const response = await fetch("/api/dnc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSuccessCount(prev => prev + 1);
        toast.success("¡Número capturado exitosamente!", {
          description: `Total capturados hoy: ${successCount + 1}`,
          duration: 2000,
        });
        
        // Reset form for next number
        reset();
        
        // Focus back to phone input
        const phoneInput = document.getElementById("phone");
        if (phoneInput) {
          phoneInput.focus();
        }
      } else {
        const errorData = await response.json();
        console.log("Error response:", errorData); // Debug log
        
        if (errorData.error && errorData.error.includes("ya está en la lista")) {
          toast.warning("Número duplicado", {
            description: "Este número ya está registrado en el sistema",
          });
        } else if (errorData.details && Array.isArray(errorData.details)) {
          // Mostrar errores de validación específicos
          const validationErrors = errorData.details.map((detail: { field: string; message: string }) => 
            `${detail.field}: ${detail.message}`
          ).join(", ");
          toast.error("Error de validación", {
            description: validationErrors,
          });
        } else {
          toast.error(errorData.error || "Error al capturar el número", {
            description: `Código: ${response.status}`,
          });
        }
      }
    } catch {
      toast.error("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    reset();
    const phoneInput = document.getElementById("phone");
    if (phoneInput) {
      phoneInput.focus();
    }
  };

  if (loadingReasons) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center particles-bg">
        <div className="relative">
          <div className="animate-spin rounded-full h-32 w-32 border-4 border-gray-200 border-t-soft-blue shadow-lg"></div>
          <div className="absolute inset-0 animate-pulse">
            <div className="rounded-full h-32 w-32 border-2 border-soft-blue opacity-20 animate-ping"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 particles-bg">
      <UserNavbar />
      <div className="p-4">
      <div className="max-w-2xl mx-auto pt-8">
        {/* Header suave */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-soft-blue via-soft-green to-soft-purple rounded-full blur-lg opacity-20"></div>
              <div className="relative p-6 glass-card rounded-full">
                <Phone className="h-14 w-14 text-soft-blue" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-soft-blue via-soft-green to-soft-purple bg-clip-text text-transparent">
              Capturar Número DNC
            </span>
          </h1>
          <p className="text-gray-600 text-lg">
            Vendedor: <span className="font-semibold text-soft-green">{session?.user?.username}</span>
          </p>
          {successCount > 0 && (
            <div className="mt-4 inline-flex items-center px-4 py-2 glass-card border-soft-green rounded-full text-sm font-medium">
              <span className="text-soft-green text-lg mr-2">✅</span>
              <span className="text-soft-green">{successCount} números capturados hoy</span>
            </div>
          )}
        </div>

        {/* Main Form */}
        <Card className="border-0 shadow-lg glass-card rounded-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl font-bold">
              <span className="text-soft-blue">Nueva Captura</span>
            </CardTitle>
            <CardDescription className="text-gray-600 text-lg mt-2">
              Ingresa el número de 10 dígitos y selecciona el motivo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Phone Input */}
              <div className="space-y-4">
                <Label htmlFor="phone" className="text-xl font-semibold text-soft-blue">
                  📱 Número de Teléfono *
                </Label>
                <div className="relative">
                  <Input
                    id="phone"
                    {...register("phone")}
                    placeholder="1234567890"
                    className={`text-3xl text-center h-20 font-mono tracking-wider bg-white border-2 text-gray-900 placeholder-gray-400 rounded-xl ${
                      errors.phone ? "border-soft-red focus:border-soft-red focus:ring-soft-red" : "border-soft-blue focus:border-soft-green focus:ring-soft-blue"
                    } transition-all duration-300 shadow-sm`}
                    maxLength={10}
                    autoFocus
                    autoComplete="off"
                  />
                </div>
                {errors.phone && (
                  <p className="text-sm text-soft-red text-center font-medium">
                    ⚠️ {errors.phone.message}
                  </p>
                )}
                <p className="text-xs text-gray-500 text-center">
                  <span className={phoneValue?.length === 10 ? "text-soft-green" : "text-gray-500"}>
                    {phoneValue ? `${phoneValue.length}/10 dígitos` : "Ingresa 10 dígitos"}
                  </span>
                  {phoneValue?.length === 10 && <span className="ml-2 text-soft-green">✅</span>}
                </p>
              </div>

              {/* Reason Selection */}
              <div className="space-y-4">
                <Label htmlFor="reasonId" className="text-xl font-semibold text-soft-green">
                  🎯 Motivo *
                </Label>
                <Select onValueChange={(value) => setValue("reasonId", value)}>
                  <SelectTrigger className={`h-16 text-lg bg-white border-2 text-gray-900 rounded-xl ${
                    errors.reasonId ? "border-soft-red" : "border-soft-green"
                  } hover:border-soft-blue transition-all duration-300 shadow-sm`}>
                    <SelectValue placeholder="Selecciona el motivo del bloqueo" className="text-gray-400" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg">
                    {reasons.map((reason) => (
                      <SelectItem key={reason.id} value={reason.id} className="text-lg py-4 text-gray-900 hover:bg-gray-50 focus:bg-gray-50">
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded-full ${
                            reason.name === 'MOVISTAR' ? 'bg-soft-red' :
                            reason.name === 'MOROSO' ? 'bg-soft-orange' :
                            reason.name === 'QUITAR' ? 'bg-soft-blue' : 
                            'bg-soft-green'
                          }`} />
                          <span className="font-medium">{reason.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.reasonId && (
                  <p className="text-sm text-soft-red text-center font-medium">
                    ⚠️ {errors.reasonId.message}
                  </p>
                )}
              </div>

              {/* Notes (Optional) */}
              <div className="space-y-4">
                <Label htmlFor="notes" className="text-xl font-semibold text-soft-purple">
                  📝 Notas (Opcional)
                </Label>
                <Input
                  id="notes"
                  {...register("notes")}
                  placeholder="Información adicional sobre la llamada..."
                  className="h-16 text-lg bg-white border-2 border-soft-purple text-gray-900 placeholder-gray-400 rounded-xl focus:border-soft-blue focus:ring-soft-purple transition-all duration-300 shadow-sm"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-6 pt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  disabled={loading}
                  className="flex-1 h-16 text-lg border-2 border-soft-red text-soft-red hover:bg-soft-red hover:text-white rounded-xl transition-all duration-300 shadow-sm"
                >
                  <RotateCcw className="mr-2 h-6 w-6" />
                  Limpiar
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 h-16 text-lg bg-gradient-to-r from-soft-blue to-soft-green text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  <Save className="mr-2 h-6 w-6" />
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                      Guardando...
                    </>
                  ) : (
                    "Guardar y Continuar"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Quick Access */}
        <div className="mt-8 text-center">
          <Button
            variant="ghost"
            onClick={() => router.push("/consultar-dnc")}
            className="text-neon-blue hover:text-neon-green hover:bg-gray-800/50 glass-dark px-6 py-3 text-lg font-medium hover-glow transition-all duration-300"
          >
            <span className="mr-2">📋</span>
            Consultar números DNC registrados
          </Button>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <div className="glass-card p-4 rounded-xl border-neon-blue/30">
            <p className="text-neon-blue font-medium text-lg">Sistema DNC - Captura rápida para vendedores</p>
            <p className="mt-2 text-gray-400">Presiona <kbd className="px-2 py-1 bg-gray-700 text-neon-green rounded text-sm">Tab</kbd> para navegar entre campos</p>
            <div className="flex justify-center items-center space-x-4 mt-3">
              <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse animate-delay-1"></div>
              <div className="w-2 h-2 bg-neon-pink rounded-full animate-pulse animate-delay-2"></div>
            </div>
          </div>
        </div>
      </div>
      </div>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(255, 255, 255, 0.95)',
              color: '#374151',
              border: '1px solid rgba(229, 231, 235, 0.8)',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '500',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              backdropFilter: 'blur(8px)',
            },
            classNames: {
              success: 'border-soft-green bg-white text-green-800',
              error: 'border-soft-red bg-white text-red-800',
              loading: 'border-soft-blue bg-white text-blue-800',
            },
          }}
        />
    </div>
  );
}
