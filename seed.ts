import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import { faker } from "@faker-js/faker";
import * as https from "https";
import * as http from "http";

// ─── Config ────────────────────────────────────────────────────────────────
// Copy your .env.local values here temporarily to run the script,
// or use dotenv: npm install dotenv and uncomment the line below
// import * as dotenv from "dotenv"; dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI || "YOUR_MONGODB_URI_HERE";

// Parse CLOUDINARY_URL manually
const cloudinaryUrl = new URL(process.env.CLOUDINARY_URL!);

cloudinary.config({
  cloud_name: cloudinaryUrl.host,
  api_key: cloudinaryUrl.username,
  api_secret: cloudinaryUrl.password,
});

// ─── Event Schema (inline to avoid import issues) ──────────────────────────
function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const eventSchema = new mongoose.Schema(
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
    agenda: { type: [String], required: true },
    organizer: { type: String, required: true, trim: true },
    tags: { type: [String], required: true },
  },
  { timestamps: true }
);

eventSchema.pre("save", function () {
  if (this.isModified("title")) {
    this.slug = slugify(this.title as string);
  }
});

const Event =
  (mongoose.models.Event as mongoose.Model<any>) ||
  mongoose.model("Event", eventSchema);

// ─── Data Templates ─────────────────────────────────────────────────────────
const EVENT_TYPES = [
  "Summit", "Conference", "Hackathon", "Workshop", "Meetup",
  "Bootcamp", "Symposium", "Forum", "Expo", "Sprint",
];

const TECH_TOPICS = [
  "AI & Machine Learning", "Web Development", "Cloud Computing",
  "DevOps & CI/CD", "Blockchain", "Cybersecurity", "Open Source",
  "Mobile Development", "Data Engineering", "Developer Experience",
];

const MODES = ["In-Person", "Online", "Hybrid (In-Person & Online)"];

const VENUES = [
  { venue: "Moscone Center", location: "San Francisco, CA" },
  { venue: "Jacob K. Javits Convention Center", location: "New York, NY" },
  { venue: "ExCeL London", location: "London, UK" },
  { venue: "Messe Berlin", location: "Berlin, Germany" },
  { venue: "Dubai World Trade Centre", location: "Dubai, UAE" },
  { venue: "Tokyo International Forum", location: "Tokyo, Japan" },
  { venue: "ICC Sydney", location: "Sydney, Australia" },
  { venue: "Eko Convention Centre", location: "Lagos, Nigeria" },
  { venue: "Palais des Congrès", location: "Paris, France" },
  { venue: "Metro Toronto Convention Centre", location: "Toronto, Canada" },
];

const TAG_POOL = [
  "AI", "ML", "Cloud", "DevOps", "Kubernetes", "Docker",
  "React", "Node.js", "Python", "TypeScript", "Rust", "Go",
  "Web3", "Blockchain", "Security", "Open Source", "API",
  "Microservices", "Serverless", "Data", "Networking",
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
async function fetchImageBuffer(query: string): Promise<Buffer> {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape`,
    {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    }
  );

  const data = await response.json() as {urls: { regular: string }};
  const imageUrl = data.urls.regular;

  return new Promise((resolve, reject) => {
    https.get(imageUrl, (res) => {
      const chunks: Buffer[] = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    }).on("error", reject);
  });
}

async function uploadToCloudinary(buffer: Buffer, title: string): Promise<string> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder: "DevEvents",
        public_id: slugify(title),
        overwrite: true,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve((result as { secure_url: string }).secure_url);
      }
    ).end(buffer);
  });
}

function generateAgenda(): string[] {
  const slots = [
    "08:30 AM - 09:00 AM | Registration & Breakfast",
    "09:00 AM - 10:00 AM | Opening Keynote",
    `10:15 AM - 11:30 AM | ${faker.hacker.phrase()}`,
    `11:45 AM - 01:00 PM | ${faker.hacker.phrase()}`,
    "01:00 PM - 02:00 PM | Lunch Break",
    `02:00 PM - 03:30 PM | Workshop: ${faker.hacker.ingverb()} ${faker.hacker.noun()}`,
    `03:45 PM - 04:30 PM | Panel: ${faker.hacker.phrase()}`,
    "04:30 PM - 05:00 PM | Closing Remarks & Networking",
  ];
  return slots;
}

function generateTags(): string[] {
  const shuffled = TAG_POOL.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, faker.number.int({ min: 3, max: 6 }));
}

function generateTitle(topic: string, type: string, year: number): string {
  return `${topic} ${type} ${year}`;
}

// ─── Main Seed Function ───────────────────────────────────────────────────────
async function seed() {
  console.log("🌱 Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected!\n");

  const EVENTS_TO_CREATE = 10;
  const year = new Date().getFullYear();

  for (let i = 0; i < EVENTS_TO_CREATE; i++) {
    const topic = TECH_TOPICS[i % TECH_TOPICS.length];
    const type = EVENT_TYPES[i % EVENT_TYPES.length];
    const title = generateTitle(topic, type, year);
    const { venue, location } = VENUES[i % VENUES.length];

    console.log(`Creating event ${i + 1}/${EVENTS_TO_CREATE}: ${title}`);

    // 1. Fetch placeholder image from picsum (600x400)
    const imageUrl = `https://picsum.photos/seed/${i + 1}/800/600`;
    console.log(`  🖼️ Fetching image from unsplash...`);
    const imageBuffer = await fetchImageBuffer(`${topic} tech conference`);

    // 2. Upload to Cloudinary
    console.log(`Uploading to Cloudinary...`);
    const cloudinaryUrl = await uploadToCloudinary(imageBuffer, title);
    console.log(`Uploaded: ${cloudinaryUrl}`);

    // 3. Build event data
    const futureDate = faker.date.future({ years: 1 });
    const eventData = {
      title,
      description: `${title} brings together the brightest minds in ${topic.toLowerCase()} for a day of learning, networking, and innovation.`,
      overview: faker.lorem.paragraphs(2),
      image: cloudinaryUrl,
      venue,
      location,
      date: futureDate.toISOString(),
      time: "09:00",
      mode: MODES[faker.number.int({ min: 0, max: 2 })],
      audience: `${topic} enthusiasts, engineers, architects, and tech leaders`,
      agenda: generateAgenda(),
      organizer: `${faker.company.name()} organizes ${type.toLowerCase()}s to bring the global tech community together around ${topic.toLowerCase()}.`,
      tags: generateTags(),
    };

    // 4. Save to MongoDB
    try {
      const event = new Event(eventData);
      await event.save();
      console.log(`Saved to MongoDB with slug: ${event.slug}\n`);
    } catch (e: any) {
      // Skip duplicate slugs gracefully
      if (e.code === 11000) {
        console.log(`Skipped: duplicate slug for "${title}"\n`);
      } else {
        console.error(`Failed to save: ${e.message}\n`);
      }
    }
  }

  console.log("🎉 Seeding complete!");
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});