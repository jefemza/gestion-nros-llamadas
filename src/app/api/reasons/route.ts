import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const createReasonSchema = z.object({
  name: z.string().min(1, "El nombre es requerido").max(50, "El nombre es muy largo"),
});

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const reasons = await prisma.reason.findMany({
      include: {
        _count: {
          select: { dncEntries: true }
        }
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(reasons);

  } catch (error) {
    console.error("Error fetching reasons:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Acceso denegado" }, { status: 403 });
    }

    const body = await request.json();
    const validatedData = createReasonSchema.parse(body);

    // Check if reason already exists
    const existingReason = await prisma.reason.findUnique({
      where: { name: validatedData.name.toUpperCase() },
    });

    if (existingReason) {
      return NextResponse.json(
        { error: "Este motivo ya existe" },
        { status: 400 }
      );
    }

    const reason = await prisma.reason.create({
      data: {
        name: validatedData.name.toUpperCase(),
      },
      include: {
        _count: {
          select: { dncEntries: true }
        }
      }
    });

    return NextResponse.json(reason, { status: 201 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Datos inválidos", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error creating reason:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
