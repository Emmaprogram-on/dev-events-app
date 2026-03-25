import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Event } from "@/database/event.model";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tags = searchParams.get("tags")?.split(",") || [];

    await connectToDatabase();

    const events = await Event.find({
      tags: { $in: tags },
    }).lean();

    return NextResponse.json({ events }, { status: 200 });
  } catch (error) {
    console.error("Category fetch error:", error);
    return NextResponse.json({ message: "Failed to fetch events" }, { status: 500 });
  }
}