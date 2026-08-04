/**
 * Health Check API
 * GET /api/health - Verifica el estado de la aplicación
 */

import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json(
      {
        status: "healthy",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        status: "unhealthy",
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
