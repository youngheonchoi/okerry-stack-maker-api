import { NextResponse } from "next/server";

export const runtime = "nodejs";

export function GET() {
  return NextResponse.json(
    { status: "ok", service: "okerry-stack-maker-api" },
    { headers: { "Cache-Control": "no-store" } },
  );
}
