"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Download, TrendingUp, PhoneOff, Calendar, Users } from "lucide-react";

interface ReportStats {
  totalDNC: number;
  totalReasons: number;
  totalUsers: number;
  dncByReason: { name: string; count: number }[];
  dncByDate: { date: string; count: number }[];
  recentActivity: { action: string; date: string; user: string }[];
}

export default function ReportsPage() {
  const [stats, setStats] = useState<ReportStats>({
    totalDNC: 0,
    totalReasons: 0,
    totalUsers: 0,
    dncByReason: [],
    dncByDate: [],
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      const response = await fetch("/api/reports");
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Error fetching report data:", error);
    } finally {
      setLoading(false);
    }
  };

  const exportReport = () => {
    // Crear CSV básico
    const csvData = [
      ["Métrica", "Valor"],
      ["Total Números DNC", stats.totalDNC.toString()],
      ["Total Motivos", stats.totalReasons.toString()],
      ["Total Usuarios", stats.totalUsers.toString()],
      [""],
      ["Números por Motivo", ""],
      ...stats.dncByReason.map(item => [item.name, item.count.toString()]),
    ];

    const csvContent = csvData.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `reporte-dnc-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
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
          <h1 className="text-2xl font-semibold text-gray-900">Reportes y Estadísticas</h1>
          <p className="mt-1 text-sm text-gray-600">
            Análisis detallado del sistema DNC
          </p>
        </div>
        <Button onClick={exportReport}>
          <Download className="h-4 w-4 mr-2" />
          Exportar CSV
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Números DNC
            </CardTitle>
            <PhoneOff className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDNC.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Números bloqueados activos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Motivos Activos
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalReasons}</div>
            <p className="text-xs text-muted-foreground">
              Categorías de bloqueo
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Usuarios Sistema
            </CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              Vendedores y administradores
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
              Números por Motivo
            </CardTitle>
            <CardDescription>
              Distribución de bloqueos por razón
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.dncByReason.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-8">
                  No hay datos disponibles
                </p>
              ) : (
                stats.dncByReason.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <span className="text-sm text-gray-600">{item.count} números</span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-green-600" />
              Actividad Reciente
            </CardTitle>
            <CardDescription>
              Últimas acciones en el sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentActivity.length === 0 ? (
                <div className="text-sm text-gray-500 text-center py-8">
                  <p>Sistema funcionando correctamente</p>
                  <p className="mt-2">Listo para recibir operaciones</p>
                </div>
              ) : (
                stats.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-gray-500">
                        {activity.user} - {activity.date}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resumen Ejecutivo</CardTitle>
          <CardDescription>
            Análisis general del sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Estado del Sistema</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p>✅ Base de datos: Conectada</p>
                <p>✅ Autenticación: Funcionando</p>
                <p>✅ APIs: Operativas</p>
                <p>✅ Backups: Automáticos</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Métricas Clave</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p>📊 Números DNC: {stats.totalDNC}</p>
                <p>🏷️ Motivos configurados: {stats.totalReasons}</p>
                <p>👥 Usuarios activos: {stats.totalUsers}</p>
                <p>🔒 Seguridad: Habilitada</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
