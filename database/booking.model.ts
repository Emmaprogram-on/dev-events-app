import mongoose, { HydratedDocument, Model, Schema, Types } from "mongoose";

import { Event } from "./event.model";

export interface IBooking {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const bookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (value: string): boolean => EMAIL_REGEX.test(value),
        message: "Invalid email format.",
      },
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

// Keep frequent event-based lookups fast.
bookingSchema.index({ eventId: 1 });

// Ensure the booking references an existing event before writing.
bookingSchema.pre("save", async function (this: HydratedDocument<IBooking>) {
  if (!EMAIL_REGEX.test(this.email)) {
    throw new Error("Invalid email format.");
  }

  if (this.isNew || this.isModified("eventId")) {
    const eventExists = await Event.exists({ _id: this.eventId });
    if (!eventExists) {
      throw new Error("Cannot create booking: referenced event does not exist.");
    }
  }
});

type BookingModelType = Model<IBooking>;

export const Booking =
  (mongoose.models.Booking as BookingModelType | undefined) ??
  mongoose.model<IBooking>("Booking", bookingSchema);