import mongoose, { HydratedDocument, Model, Schema, Types } from "mongoose";

import { Event } from "./event.model";

export interface ITicket {
  _id: Types.ObjectId;
  eventId: Types.ObjectId;
  tierName: string;
  price: number;
  totalSlots: number;
  slotsRemaining: number;
  createdAt: Date;
  updatedAt: Date;
}

const ticketSchema = new Schema<ITicket>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
      index: true,
    },
    tierName: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    totalSlots: {
      type: Number,
      required: true,
      min: 1,
    },
    slotsRemaining: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

ticketSchema.index({ eventId: 1, tierName: 1 }, { unique: true });

ticketSchema.pre("save", async function (this: HydratedDocument<ITicket>) {
  if (this.tierName.trim().length === 0) {
    throw new Error("Tier name cannot be empty.");
  }

  if (this.slotsRemaining > this.totalSlots) {
    throw new Error("Slots remaining cannot exceed total slots.");
  }

  if (this.slotsRemaining < 0) {
    throw new Error("Slots remaining cannot be negative.");
  }

  if (this.isNew || this.isModified("eventId")) {
    const eventExists = await Event.exists({ _id: this.eventId });
    if (!eventExists) {
      throw new Error("Cannot create ticket: referenced event does not exist.");
    }
  }
});

type TicketModelType = Model<ITicket>;

export const Ticket =
  (mongoose.models.Ticket as TicketModelType | undefined) ??
  mongoose.model<ITicket>("Ticket", ticketSchema);