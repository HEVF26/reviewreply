import { NextRequest, NextResponse } from "next/server";
import { registerUser, getLimit, getUsage } from "@/lib/usage";

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const body = await request.json();
  const { email, name } = body as { email: string; name: string };

  if (!email?.trim()) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  console.log("New registration:", { ip, name, email });

  const updated = registerUser(ip, email);
  const limit = getLimit(true);
  const remaining = Math.max(0, limit - updated.count);

  return NextResponse.json({ remaining, registered: true });
}
