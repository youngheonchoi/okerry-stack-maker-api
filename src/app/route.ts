import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    service: "okerry-stack-maker-api",
    health: "/api/health",
  });
}
