"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Plus, Edit, Trash2, List } from "lucide-react";
import { toast } from "sonner";

interface Reason {
  id: string;
  name: string;
  _count?: {
    dncEntries: number;
  };
  createdAt: string;
  updatedAt: string;
}

export default function ReasonsPage() {
  const [reasons, setReasons] = useState<Reason[]>([]);
  const [loading, setLoading] = useState(true);
  const [newReasonName, setNewReasonName] = useState("");
  const [isAdding, setIsAdding] = useState(false);

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
      toast.error("Error al cargar los datos");
    } finally {
      setLoading(false);
    }
  };

  const handleAddReason = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReasonName.trim()) return;

    setIsAdding(true);
    try {
      const response = await fetch("/api/reasons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newReasonName.trim().toUpperCase() }),
      });

      if (response.ok) {
        toast.success("Motivo agregado correctamente");
        setNewReasonName("");
        fetchReasons();
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Error al agregar el motivo");
      }
    } catch (error) {
      toast.error("Error al agregar el motivo");
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`¿Estás seguro de eliminar el motivo "${name}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/reasons/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Motivo eliminado correctamente");
        fetchReasons();
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Error al eliminar el motivo");
      }
    } catch (error) {
      toast.error("Error al eliminar el motivo");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Motivos de Bloqueo</h1>
        <p className="mt-1 text-sm text-gray-600">
          Gestiona las razones para agregar números a la lista DNC
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="h-5 w-5 mr-2 text-green-600" />
              Agregar Nuevo Motivo
            </CardTitle>
            <CardDescription>
              Crear una nueva razón de bloqueo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddReason} className="space-y-4">
              <div>
                <Input
                  placeholder="Nombre del motivo (ej: MOVISTAR, MOROSO)"
                  value={newReasonName}
                  onChange={(e) => setNewReasonName(e.target.value)}
                  disabled={isAdding}
                />
              </div>
              <Button type="submit" disabled={isAdding || !newReasonName.trim()}>
                {isAdding ? "Agregando..." : "Agregar Motivo"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <List className="h-5 w-5 mr-2 text-blue-600" />
              Motivos Disponibles
            </CardTitle>
            <CardDescription>
              Total de motivos: {reasons.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Motivo</TableHead>
                    <TableHead>Números</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reasons.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-8 text-gray-500">
                        No hay motivos registrados
                      </TableCell>
                    </TableRow>
                  ) : (
                    reasons.map((reason) => (
                      <TableRow key={reason.id}>
                        <TableCell className="font-medium">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            {reason.name}
                          </span>
                        </TableCell>
                        <TableCell>
                          {reason._count?.dncEntries || 0}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(reason.id, reason.name)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
