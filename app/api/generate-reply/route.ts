import { NextRequest, NextResponse } from "next/server";
import { buildSystemPrompt, getMockResponse } from "@/lib/prompts";
import { getUsage, incrementUsage, getLimit } from "@/lib/usage";
import type { ToneId } from "@/lib/tones";

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  try {
    const usage = getUsage(ip);
    const limit = getLimit(usage.registered);

    if (!usage.registered && usage.count >= 2) {
      return NextResponse.json(
        { error: "registration_required", remaining: 0, registered: false },
        { status: 429 }
      );
    }

    if (usage.count >= limit) {
      return NextResponse.json(
        { error: "limit_reached", remaining: 0, registered: usage.registered },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { businessType, businessName, review, starRating, tone, language } = body as {
      businessType: string;
      businessName: string;
      review: string;
      starRating: number;
      tone: ToneId;
      language: "es" | "en" | "auto";
    };

    if (!review || !review.trim()) {
      return NextResponse.json({ error: "Review text is required" }, { status: 400 });
    }

    let replyData;

    if (process.env.MOCK_MODE?.trim() === "true") {
      await new Promise((resolve) => setTimeout(resolve, 800));
      replyData = getMockResponse(language);
    } else {
      const { default: Anthropic } = await import("@anthropic-ai/sdk");
      const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

      const systemPrompt = buildSystemPrompt({
        businessType,
        businessName,
        review,
        starRating,
        tone,
        language,
      });

      const message = await anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        messages: [{ role: "user", content: systemPrompt }],
      });

      const textBlock = message.content.find((block) => block.type === "text");
      if (!textBlock || textBlock.type !== "text") {
        return NextResponse.json({ error: "No response generated" }, { status: 500 });
      }

      replyData = JSON.parse(textBlock.text);
    }

    const updated = incrementUsage(ip);
    const remaining = Math.max(0, getLimit(updated.registered) - updated.count);

    return NextResponse.json({ ...replyData, remaining, registered: updated.registered });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("generate-reply error:", message);
    return NextResponse.json({ error: "Failed to generate reply", detail: message }, { status: 500 });
  }
}
