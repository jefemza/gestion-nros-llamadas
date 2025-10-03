"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { Search, ArrowLeft, Phone, AlertCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { UserNavbar } from "@/components/layout/user-navbar";

interface DNEntry {
  id: string;
  phone: string;
  notes?: string;
  reason: {
    id: string;
    name: string;
  };
  createdAt: string;
}

export default function ConsultarDNCPage() {
  const { data: session } = useSession();
  const [entries, setEntries] = useState<DNEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEntries, setFilteredEntries] = useState<DNEntry[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Redirigir ADMIN al dashboard
    if (session?.user?.role === "ADMIN") {
      router.push("/dashboard");
      return;
    }
  }, [session, router]);

  useEffect(() => {
    if (searchTerm.length >= 3) {
      searchNumbers();
    } else {
      setFilteredEntries([]);
    }
  }, [searchTerm]);

  const searchNumbers = async () => {
    if (searchTerm.length < 3) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/dnc?search=${encodeURIComponent(searchTerm)}`);
      if (response.ok) {
        const data = await response.json();
        setEntries(data);
        setFilteredEntries(data);
      } else {
        console.error("Error al buscar números");
      }
    } catch (error) {
      console.error("Error al buscar números");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers for phone search
    if (value === "" || /^\d+$/.test(value)) {
      setSearchTerm(value);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 particles-bg">
      <UserNavbar />
      <div className="p-4">
      <div className="max-w-4xl mx-auto pt-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
            <Button
              variant="outline"
              onClick={() => router.push("/capturar-numero")}
              className="flex items-center space-x-2 border-2 border-soft-blue text-soft-blue hover:bg-soft-blue hover:text-white rounded-xl transition-all duration-300 shadow-sm"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Volver a Capturar</span>
            </Button>
          
          <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">
                <span className="bg-gradient-to-r from-soft-blue via-soft-green to-soft-purple bg-clip-text text-transparent">
                  Consultar Números DNC
                </span>
              </h1>
              <p className="text-gray-600 text-lg">
                Vendedor: <span className="font-semibold text-soft-green">{session?.user?.username}</span>
              </p>
          </div>
          
          <div className="w-32"></div> {/* Spacer for centering */}
        </div>

          {/* Search Card */}
          <Card className="border-0 shadow-lg glass-card rounded-2xl mb-8">
          <CardHeader className="text-center pb-6">
            <CardTitle className="flex items-center justify-center space-x-3 text-2xl font-bold">
              <Search className="h-7 w-7 text-soft-blue" />
              <span className="text-soft-blue">Buscar Número</span>
            </CardTitle>
            <CardDescription className="text-gray-600 text-lg mt-2">
              Ingresa al menos 3 dígitos para buscar números registrados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Phone className="h-6 w-6 text-soft-green" />
              <div className="flex-1 relative">
                <Input
                  placeholder="Ej: 123, 4567, 1234567890"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="text-xl h-16 font-mono text-center bg-white border-2 border-soft-blue text-gray-900 placeholder-gray-400 rounded-xl focus:border-soft-green focus:ring-soft-blue transition-all duration-300 shadow-sm"
                  maxLength={10}
                  autoFocus
                />
              </div>
            </div>
            <p className="text-sm text-gray-500 text-center mt-4">
              <span className={searchTerm.length >= 3 ? "text-soft-green" : "text-gray-500"}>
                {searchTerm.length > 0 ? `${searchTerm.length} dígitos ingresados` : "Mínimo 3 dígitos para buscar"}
              </span>
              {searchTerm.length >= 3 && <span className="ml-2 text-soft-green">🔍</span>}
            </p>
          </CardContent>
        </Card>

        {/* Results */}
        {searchTerm.length >= 3 && (
          <Card className="border-0 shadow-lg glass-card rounded-2xl">
            <CardHeader>
            <CardTitle className="flex items-center justify-between text-xl">
              <span className="text-soft-green">Resultados de Búsqueda</span>
              {loading && (
                <div className="relative">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-200 border-t-soft-blue"></div>
                </div>
              )}
            </CardTitle>
            <CardDescription className="text-gray-600 text-lg mt-2">
              {filteredEntries.length > 0 ? (
                <span className="text-soft-green">
                  ✅ {filteredEntries.length} número(s) encontrado(s)
                </span>
              ) : searchTerm.length >= 3 && !loading ? (
                <span className="text-soft-red">❌ No se encontraron números</span>
              ) : ""}
            </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredEntries.length === 0 && searchTerm.length >= 3 && !loading ? (
            <div className="text-center py-16">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-soft-red rounded-full blur-lg opacity-20"></div>
                <AlertCircle className="relative h-16 w-16 text-soft-red mx-auto" />
              </div>
              <p className="text-gray-900 text-xl font-semibold mb-2">No se encontraron números</p>
              <p className="text-gray-600 text-lg">
                El número &ldquo;<span className="text-soft-blue font-mono">{searchTerm}</span>&rdquo; no está registrado en el sistema DNC
              </p>
            </div>
              ) : (
            <div className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm">
              <Table>
                <TableHeader className="bg-gray-50 border-b border-gray-200">
                  <TableRow className="hover:bg-gray-100">
                    <TableHead className="font-bold text-soft-blue text-lg">📱 Número</TableHead>
                    <TableHead className="font-bold text-soft-green text-lg">🎯 Motivo</TableHead>
                    <TableHead className="font-bold text-soft-purple text-lg">📝 Notas</TableHead>
                    <TableHead className="font-bold text-gray-900 text-lg">📅 Fecha</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEntries.map((entry) => (
                    <TableRow key={entry.id} className="hover:bg-gray-50 border-b border-gray-100 transition-colors">
                      <TableCell className="font-mono font-bold text-xl text-soft-blue">
                        {entry.phone}
                      </TableCell>
                      <TableCell>
                        <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                          entry.reason.name === 'MOVISTAR' ? 'bg-soft-red/10 text-soft-red border border-soft-red/20' :
                          entry.reason.name === 'MOROSO' ? 'bg-soft-orange/10 text-soft-orange border border-soft-orange/20' :
                          entry.reason.name === 'QUITAR' ? 'bg-soft-blue/10 text-soft-blue border border-soft-blue/20' :
                          'bg-soft-green/10 text-soft-green border border-soft-green/20'
                        }`}>
                          {entry.reason.name}
                        </span>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <div className="truncate text-gray-600" title={entry.notes}>
                          {entry.notes || <span className="text-gray-400">-</span>}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {new Date(entry.createdAt).toLocaleDateString("es-ES", {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        {searchTerm.length < 3 && (
          <Card className="border-0 shadow-lg glass-card rounded-2xl">
            <CardContent className="pt-8">
            <div className="text-center py-16">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-soft-blue via-soft-green to-soft-purple rounded-full blur-lg opacity-20"></div>
                <Search className="relative h-20 w-20 text-soft-blue mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-soft-green mb-4">
                Buscar Números DNC
              </h3>
              <p className="text-gray-600 text-lg mb-6">
                Ingresa al menos 3 dígitos del número que deseas consultar
              </p>
              <div className="space-y-3 text-gray-500">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-soft-blue rounded-full"></div>
                  <p>Puedes buscar números parciales (ej: 123, 456)</p>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-soft-green rounded-full"></div>
                  <p>O números completos (ej: 1234567890)</p>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-soft-purple rounded-full"></div>
                  <p>Solo se permiten dígitos numéricos</p>
                </div>
              </div>
            </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="mt-12 text-center">
          <Button
            onClick={() => router.push("/capturar-numero")}
            className="bg-gradient-to-r from-soft-blue to-soft-green text-white font-bold px-8 py-4 text-lg rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <Phone className="mr-3 h-6 w-6" />
            Capturar Nuevo Número
          </Button>
        </div>
      </div>
      </div>
    </div>
  );
}
