import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Event } from "@/database/event.model";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q")?.trim();

    if (!query || query.length < 2) {
      return NextResponse.json({ events: [] }, { status: 200 });
    }

    await connectToDatabase();

    const events = await Event.find({
      title: { $regex: query, $options: "i" }, // case-insensitive search
    })
      .select("title slug image")
      .limit(6)
      .lean();

    return NextResponse.json({ events }, { status: 200 });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ message: "Search failed" }, { status: 500 });
  }
}