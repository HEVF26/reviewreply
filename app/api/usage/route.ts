import { NextRequest, NextResponse } from "next/server";
import { getUsage, getLimit } from "@/lib/usage";

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function GET(request: NextRequest) {
  const ip = getClientIp(request);
  const usage = getUsage(ip);
  const limit = getLimit(usage.registered);
  const remaining = Math.max(0, limit - usage.count);

  return NextResponse.json({ remaining, registered: usage.registered });
}
