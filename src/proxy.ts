import { NextResponse, type NextRequest } from "next/server";

const miniappOrigins = [
  "https://okerry-stack-maker.apps.tossmini.com",
  "https://okerry-stack-maker.private-apps.tossmini.com",
];

export function proxy(request: NextRequest) {
  const origin = request.headers.get("origin");
  const allowedOrigins = new Set(miniappOrigins);

  if (process.env.NODE_ENV === "development") {
    allowedOrigins.add("http://localhost:5173");
    allowedOrigins.add("http://127.0.0.1:5173");
  }

  if (origin && !allowedOrigins.has(origin)) {
    return NextResponse.json(
      { error: { code: "ORIGIN_NOT_ALLOWED" } },
      { status: 403, headers: { Vary: "Origin" } },
    );
  }

  const response = request.method === "OPTIONS"
    ? new NextResponse(null, { status: 204 })
    : NextResponse.next();

  response.headers.append("Vary", "Origin");

  if (origin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS",
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    );
    response.headers.set("Access-Control-Max-Age", "600");
  }

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
