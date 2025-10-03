import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const createDNCSchema = z.object({
  phone: z.string()
    .min(10, "El número debe tener 10 dígitos")
    .max(10, "El número debe tener 10 dígitos")
    .regex(/^[0-9]{10}$/, "El número solo puede contener 10 dígitos numéricos"),
  reasonId: z.string().min(1, "El motivo es requerido"),
  notes: z.string().nullable().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Obtener parámetros de búsqueda
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');

    let whereClause = {};
    
    if (search) {
      whereClause = {
        OR: [
          {
            phone: {
              contains: search,
            },
          },
          {
            notes: {
              contains: search,
            },
          },
        ],
      };
    }

    const entries = await prisma.dNC.findMany({
      where: whereClause,
      include: {
        reason: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 100, // Limitar resultados
    });

    return NextResponse.json(entries);

  } catch (error) {
    console.error("Error fetching DNC entries:", error);
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

    const body = await request.json();
    console.log("Request body:", body); // Debug log
    
    const validatedData = createDNCSchema.parse(body);

    // Check if phone already exists
    const existingEntry = await prisma.dNC.findUnique({
      where: { phone: validatedData.phone },
    });

    if (existingEntry) {
      return NextResponse.json(
        { error: "Este número ya está en la lista DNC" },
        { status: 400 }
      );
    }

    const entry = await prisma.dNC.create({
      data: validatedData,
      include: {
        reason: true,
      },
    });

    return NextResponse.json(entry, { status: 201 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log("Validation error:", error.errors); // Debug log
      return NextResponse.json(
        { 
          error: "Datos inválidos", 
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      );
    }

    console.error("Error creating DNC entry:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
