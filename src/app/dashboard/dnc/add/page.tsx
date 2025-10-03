"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const addDNCSchema = z.object({
  phone: z.string()
    .min(1, "El número es requerido")
    .regex(/^[0-9\-\+\(\)\s]+$/, "El número solo puede contener dígitos y caracteres telefónicos"),
  reasonId: z.string().min(1, "Debe seleccionar un motivo"),
  notes: z.string().optional(),
});

type AddDNCForm = z.infer<typeof addDNCSchema>;

interface Reason {
  id: string;
  name: string;
}

export default function AddDNCPage() {
  const [reasons, setReasons] = useState<Reason[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingReasons, setLoadingReasons] = useState(true);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AddDNCForm>({
    resolver: zodResolver(addDNCSchema),
  });

  useEffect(() => {
    fetchReasons();
  }, []);

  const fetchReasons = async () => {
    try {
      const response = await fetch("/api/reasons");
      if (response.ok) {
        const data = await response.json();
        setReasons(data);
      } else {
        toast.error("Error al cargar los motivos");
      }
    } catch (error) {
      toast.error("Error al cargar los motivos");
    } finally {
      setLoadingReasons(false);
    }
  };

  const onSubmit = async (data: AddDNCForm) => {
    setLoading(true);
    try {
      const response = await fetch("/api/dnc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Número agregado correctamente a la lista DNC");
        router.push("/dashboard/dnc");
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Error al agregar el número");
      }
    } catch (error) {
      toast.error("Error al agregar el número");
    } finally {
      setLoading(false);
    }
  };

  if (loadingReasons) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Agregar Número DNC</h1>
          <p className="mt-1 text-sm text-gray-600">
            Agregar un nuevo número a la lista de no llamar
          </p>
        </div>
      </div>

      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              Nuevo Número DNC
            </CardTitle>
            <CardDescription>
              Complete la información del número que desea bloquear
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Número de Teléfono *</Label>
                <Input
                  id="phone"
                  {...register("phone")}
                  placeholder="Ej: +1234567890, 123-456-7890"
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && (
                  <p className="text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="reasonId">Motivo *</Label>
                <Select onValueChange={(value) => setValue("reasonId", value)}>
                  <SelectTrigger className={errors.reasonId ? "border-red-500" : ""}>
                    <SelectValue placeholder="Seleccione un motivo" />
                  </SelectTrigger>
                  <SelectContent>
                    {reasons.map((reason) => (
                      <SelectItem key={reason.id} value={reason.id}>
                        {reason.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.reasonId && (
                  <p className="text-sm text-red-600">{errors.reasonId.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notas (Opcional)</Label>
                <Input
                  id="notes"
                  {...register("notes")}
                  placeholder="Información adicional sobre el bloqueo"
                />
                {errors.notes && (
                  <p className="text-sm text-red-600">{errors.notes.message}</p>
                )}
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={loading}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Agregando..." : "Agregar Número"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
