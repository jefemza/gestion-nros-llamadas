import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Acceso denegado" }, { status: 403 });
    }

    // Get basic stats
    const [totalDNC, totalReasons, totalUsers] = await Promise.all([
      prisma.dNC.count(),
      prisma.reason.count(),
      prisma.user.count(),
    ]);

    // Get DNC by reason
    const dncByReason = await prisma.reason.findMany({
      include: {
        _count: {
          select: { dncEntries: true }
        }
      },
      orderBy: {
        dncEntries: {
          _count: 'desc'
        }
      }
    });

    const dncByReasonFormatted = dncByReason.map(reason => ({
      name: reason.name,
      count: reason._count.dncEntries
    }));

    // Get recent DNC entries (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentDNC = await prisma.dNC.count({
      where: {
        createdAt: {
          gte: sevenDaysAgo
        }
      }
    });

    // Mock recent activity (in a real app, you'd have an audit log)
    const recentActivity = [
      {
        action: "Sistema iniciado correctamente",
        date: new Date().toLocaleDateString("es-ES"),
        user: "Sistema"
      },
      {
        action: "Base de datos conectada",
        date: new Date().toLocaleDateString("es-ES"),
        user: "Sistema"
      },
      {
        action: `${recentDNC} números agregados (últimos 7 días)`,
        date: new Date().toLocaleDateString("es-ES"),
        user: "Varios usuarios"
      }
    ];

    const reportData = {
      totalDNC,
      totalReasons,
      totalUsers,
      dncByReason: dncByReasonFormatted,
      dncByDate: [], // Could be implemented with more complex queries
      recentActivity
    };

    return NextResponse.json(reportData);

  } catch (error) {
    console.error("Error fetching report data:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
