import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const updateDNCSchema = z.object({
  phone: z.string().min(1, "El número es requerido").optional(),
  reasonId: z.string().min(1, "El motivo es requerido").optional(),
  notes: z.string().optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const entry = await prisma.dNC.findUnique({
      where: { id: params.id },
      include: {
        reason: true,
      },
    });

    if (!entry) {
      return NextResponse.json(
        { error: "Número no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(entry);

  } catch (error) {
    console.error("Error fetching DNC entry:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = updateDNCSchema.parse(body);

    // Check if phone already exists (excluding current entry)
    if (validatedData.phone) {
      const existingEntry = await prisma.dNC.findFirst({
        where: {
          phone: validatedData.phone,
          NOT: { id: params.id },
        },
      });

      if (existingEntry) {
        return NextResponse.json(
          { error: "Este número ya está en la lista DNC" },
          { status: 400 }
        );
      }
    }

    const entry = await prisma.dNC.update({
      where: { id: params.id },
      data: validatedData,
      include: {
        reason: true,
      },
    });

    return NextResponse.json(entry);

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Datos inválidos", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error updating DNC entry:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    await prisma.dNC.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Número eliminado correctamente" });

  } catch (error) {
    console.error("Error deleting DNC entry:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
