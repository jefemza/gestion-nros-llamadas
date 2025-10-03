import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Acceso denegado" }, { status: 403 });
    }

    // Check if reason has associated DNC entries
    const reason = await prisma.reason.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: { dncEntries: true }
        }
      }
    });

    if (!reason) {
      return NextResponse.json(
        { error: "Motivo no encontrado" },
        { status: 404 }
      );
    }

    if (reason._count.dncEntries > 0) {
      return NextResponse.json(
        { error: `No se puede eliminar. Hay ${reason._count.dncEntries} números asociados a este motivo` },
        { status: 400 }
      );
    }

    await prisma.reason.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Motivo eliminado correctamente" });

  } catch (error) {
    console.error("Error deleting reason:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
