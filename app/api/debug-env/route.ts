import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    MOCK_MODE: process.env.MOCK_MODE ?? "NOT_SET",
    MOCK_MODE_IS_TRUE: process.env.MOCK_MODE === "true",
    HAS_ANTHROPIC_KEY: !!process.env.ANTHROPIC_API_KEY && process.env.ANTHROPIC_API_KEY !== "sk-ant-xxxxxxx",
    HAS_SUPABASE_URL: !!process.env.SUPABASE_URL,
  });
}
