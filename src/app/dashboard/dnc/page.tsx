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
import { Plus, Search, Edit, Trash2, PhoneOff } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface DNEntry {
  id: string;
  phone: string;
  notes?: string;
  reason: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function DNListPage() {
  const [entries, setEntries] = useState<DNEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEntries, setFilteredEntries] = useState<DNEntry[]>([]);

  useEffect(() => {
    fetchEntries();
  }, []);

  useEffect(() => {
    const filtered = entries.filter(entry =>
      entry.phone.includes(searchTerm) ||
      entry.reason.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (entry.notes && entry.notes.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredEntries(filtered);
  }, [entries, searchTerm]);

  const fetchEntries = async () => {
    try {
      const response = await fetch("/api/dnc");
      if (response.ok) {
        const data = await response.json();
        setEntries(data);
      } else {
        toast.error("Error al cargar los números DNC");
      }
    } catch (error) {
      toast.error("Error al cargar los datos");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, phone: string) => {
    if (!confirm(`¿Estás seguro de eliminar el número ${phone}?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/dnc/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Número eliminado correctamente");
        fetchEntries();
      } else {
        toast.error("Error al eliminar el número");
      }
    } catch (error) {
      toast.error("Error al eliminar el número");
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Números DNC</h1>
          <p className="mt-1 text-sm text-gray-600">
            Lista de números bloqueados (Do Not Call)
          </p>
        </div>
        <Link href="/dashboard/dnc/add">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Agregar Número
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <PhoneOff className="h-5 w-5 mr-2 text-red-600" />
            Lista de Números Bloqueados
          </CardTitle>
          <CardDescription>
            Total de números: {entries.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por número, motivo o notas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número</TableHead>
                  <TableHead>Motivo</TableHead>
                  <TableHead>Notas</TableHead>
                  <TableHead>Fecha Creación</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEntries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      {searchTerm ? "No se encontraron resultados" : "No hay números registrados"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-mono font-medium">
                        {entry.phone}
                      </TableCell>
                      <TableCell>
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                          {entry.reason.name}
                        </span>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {entry.notes || "-"}
                      </TableCell>
                      <TableCell>
                        {new Date(entry.createdAt).toLocaleDateString("es-ES")}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Link href={`/dashboard/dnc/edit/${entry.id}`}>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(entry.id, entry.phone)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
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
  );
}
