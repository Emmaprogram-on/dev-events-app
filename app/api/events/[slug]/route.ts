import { NextRequest, NextResponse } from "next/server";
import { Error as MongooseError } from "mongoose";
import { Event } from "@/database/event.model";
import { connectToDatabase } from "@/lib/mongodb";

type RouteContext = {
  params: Promise<{
    slug?: string;
  }>;
};

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function validateSlug(rawSlug: string | undefined): string | null {
  if (!rawSlug) return null;

  const normalizedSlug = rawSlug.trim().toLowerCase();
  if (!normalizedSlug || !SLUG_PATTERN.test(normalizedSlug)) return null;

  return normalizedSlug;
}

export async function GET(_req: NextRequest, context: RouteContext) {
  try {
    const { slug: rawSlug } = await context.params;
    const slug = validateSlug(rawSlug);

    if (!slug) {
      return NextResponse.json(
        { message: "Invalid slug. Use lowercase letters, numbers, and hyphens only." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Lean keeps the response payload plain JSON-serializable data.
    const event = await Event.findOne({ slug }).lean().exec();

    if (!event) {
      return NextResponse.json({ message: "Event not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Event fetched successfully.", event }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof MongooseError.ValidationError) {
      return NextResponse.json({ message: "Validation failed.", errors: error.errors }, { status: 400 });
    }

    if (error instanceof Error) {
      return NextResponse.json({ message: "Failed to fetch event.", error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Failed to fetch event due to an unexpected error." }, { status: 500 });
  }
}
