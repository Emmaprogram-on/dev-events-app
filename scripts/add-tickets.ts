import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import mongoose from "mongoose";
import { Event } from "@/database/event.model";
import { Ticket } from "@/database/ticket.model";

async function addTicketsToExistingEvents() {
  console.log("🔌 Connecting to MongoDB...");
  await mongoose.connect(process.env.MONGODB_URI!, {
    serverSelectionTimeoutMS: 30000,
    tls: true,
    tlsAllowInvalidCertificates: true,
  });
  console.log("Connected!\n");

  const events = await Event.find({});
  console.log(`Found ${events.length} events\n`);

  const tiers = [
    { tierName: "Free", price: 0, totalSlots: 100 },
    { tierName: "Early Bird", price: 25, totalSlots: 50 },
    { tierName: "Standard", price: 50, totalSlots: 100 },
    { tierName: "VIP", price: 100, totalSlots: 25 },
  ];

  let ticketsCreated = 0;

  for (const event of events) {
    const existingTickets = await Ticket.countDocuments({ eventId: event._id });
    if (existingTickets > 0) {
      console.log(`Skipping "${event.title}" - tickets already exist`);
      continue;
    }

    console.log(`Creating tickets for: ${event.title}`);

    await Ticket.insertMany(
      tiers.map((tier) => ({
        eventId: event._id,
        tierName: tier.tierName,
        price: tier.price,
        totalSlots: tier.totalSlots,
        slotsRemaining: tier.totalSlots,
      }))
    );
    ticketsCreated += tiers.length;
    console.log(`  ✓ Created ${tiers.length} ticket tiers\n`);
  }

  console.log(`🎉 Done! Created ${ticketsCreated} tickets total.`);
  await mongoose.disconnect();
  process.exit(0);
}

addTicketsToExistingEvents().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});