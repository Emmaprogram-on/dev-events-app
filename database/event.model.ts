import mongoose, { HydratedDocument, Model, Schema } from "mongoose";

export interface IEvent {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const REQUIRED_STRING_FIELDS: Array<keyof Pick<IEvent,
  | "title"
  | "description"
  | "overview"
  | "image"
  | "venue"
  | "location"
  | "date"
  | "time"
  | "mode"
  | "audience"
  | "organizer"
>> = [
  "title",
  "description",
  "overview",
  "image",
  "venue",
  "location",
  "date",
  "time",
  "mode",
  "audience",
  "organizer",
];

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function normalizeTime(rawTime: string): string {
  const input = rawTime.trim().toLowerCase();
  const match = input.match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/i);

  if (!match) {
    throw new Error("Invalid time format. Use values like 14:30 or 2:30 PM.");
  }

  let hour = Number(match[1]);
  const minute = Number(match[2] ?? "0");
  const period = match[3]?.toLowerCase();

  if (Number.isNaN(hour) || Number.isNaN(minute) || minute < 0 || minute > 59) {
    throw new Error("Invalid time value.");
  }

  if (period) {
    if (hour < 1 || hour > 12) {
      throw new Error("Invalid 12-hour time value.");
    }

    if (period === "pm" && hour !== 12) {
      hour += 12;
    }
    if (period === "am" && hour === 12) {
      hour = 0;
    }
  } else if (hour < 0 || hour > 23) {
    throw new Error("Invalid 24-hour time value.");
  }

  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

const eventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    description: { type: String, required: true, trim: true },
    overview: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    venue: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    time: { type: String, required: true, trim: true },
    mode: { type: String, required: true, trim: true },
    audience: { type: String, required: true, trim: true },
    agenda: {
      type: [String],
      required: true,
      validate: {
        validator: (value: string[]): boolean => value.length > 0,
        message: "Agenda must contain at least one item.",
      },
    },
    organizer: { type: String, required: true, trim: true },
    tags: {
      type: [String],
      required: true,
      validate: {
        validator: (value: string[]): boolean => value.length > 0,
        message: "Tags must contain at least one value.",
      },
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

// Enforce uniqueness at the database level for slug lookups.
eventSchema.index({ slug: 1 }, { unique: true });

// Generate slug on title change, normalize date/time, and guard against empty required values.
eventSchema.pre("save", function (this: HydratedDocument<IEvent>) {
  for (const field of REQUIRED_STRING_FIELDS) {
    const value = this[field];
    if (typeof value !== "string" || value.trim().length === 0) {
      throw new Error(`Field \"${field}\" is required and cannot be empty.`);
    }
    this[field] = value.trim() as IEvent[typeof field];
  }

  this.agenda = this.agenda.map((item) => item.trim()).filter((item) => item.length > 0);
  this.tags = this.tags.map((item) => item.trim()).filter((item) => item.length > 0);

  if (this.agenda.length === 0) {
    throw new Error("Agenda must contain at least one non-empty item.");
  }

  if (this.tags.length === 0) {
    throw new Error("Tags must contain at least one non-empty value.");
  }

  if (this.isModified("title")) {
    this.slug = slugify(this.title);
  }

  const parsedDate = new Date(this.date);
  if (Number.isNaN(parsedDate.getTime())) {
    throw new Error("Invalid date value.");
  }
  this.date = parsedDate.toISOString();

  this.time = normalizeTime(this.time);
});

type EventModelType = Model<IEvent>;

export const Event =
  (mongoose.models.Event as EventModelType | undefined) ??
  mongoose.model<IEvent>("Event", eventSchema);