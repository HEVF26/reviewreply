import { NextRequest, NextResponse } from "next/server";
import { registerUser, getLimit } from "@/lib/usage";
import { supabase } from "@/lib/supabase";

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
  const { email, name, type = "registro" } = body as {
    email: string;
    name: string;
    type?: string;
  };

  if (!email?.trim()) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  // Guardar en Supabase (tabla leads)
  const { error: dbError } = await supabase.from("leads").insert({
    email: email.trim(),
    name: name?.trim() || null,
    source: "reviewreply",
    type,
  });

  if (dbError) {
    console.error("Supabase insert error:", dbError);
  }

  // Actualizar tracking in-memory por IP
  const updated = registerUser(ip, email);
  const limit = getLimit(true);
  const remaining = Math.max(0, limit - updated.count);

  return NextResponse.json({ remaining, registered: true });
}
