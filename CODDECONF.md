# CoddeConf
 
A developer events discovery platform built for the tech community — find, explore, and connect through events that matter to you.
 
Live: https://dev-events-app-phi.vercel.app  
Stack: Next.js (App Router) · TypeScript · Tailwind CSS · MongoDB/Mongoose · Cloudinary · PostHog
 
---
 
## Table of Contents
 
- [Overview](#overview)
- [What Has Been Built](#what-has-been-built)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Future Milestones](#future-milestones)
---
 
## Overview
 
CoddeConf is a full-stack web application that helps developers discover and keep up with tech events — conferences, hackathons, workshops, meetups, and more. Users can browse events by category, search in real-time, and manage their own event listings.
 
---
 
## What Has Been Built
 
### Database & Data Layer
- MongoDB connected via Mongoose with a full `Event` model/schema
- Seed script using Faker.js that generates realistic developer event data with Unsplash images uploaded to Cloudinary
- MongoDB serialisation handling to safely pass data from Server Components to Client Components in Next.js
### Events Listing Page
- Responsive CSS Grid layout displaying all events
- Each event card shows the cover image, title, date, location, and category
- Stats bar at the top of the page showing total number of events, total categories, and active listings
### Live Search
- Search bar with debounced API calls so searches fire after the user stops typing, not on every keystroke
- Search queries the database and returns matching events in real time without a full page reload
- Implemented using Next.js API routes and `useSearchParams`
### Browse by Category
- Category filter buttons on the events listing page
- Clicking a category queries MongoDB using the `$in` operator and returns only events matching that category
- Active category is visually highlighted
### Event Detail Page
- Dynamic route (`/events/[id]`) for each event
- Displays full event information: title, cover image, date, time, location, category, organiser, and description
- Async `params` handling following the Next.js 15+ pattern
### Image Management
- Cloudinary integration for uploading and serving all event cover images
- Images are uploaded during seeding and when creating new events
- Cloudinary environment variables configured and working on both local and Vercel
### Authentication
- Shared `AuthForm` component used by both the Sign In and Sign Up pages
- Form handles toggling between sign-in and sign-up modes
- Styled using a `globals.css` and `@apply` workflow — no inline Tailwind classes in JSX
- Two-column name field grid layout on the Sign Up form
- NextAuth.js set up with MongoDB adapter for session and user management
- Protected routes in place for pages that require a logged-in user
### Navigation
- Responsive Navbar across all pages
- Hamburger menu for mobile viewports
- Category navigation links and quick access to key pages
### Analytics
- PostHog integrated for tracking user behaviour and product events across the platform
### Deployment
- Deployed on Vercel with environment variables configured
- `NEXT_PUBLIC_BASE_URL` set correctly for API calls in production
- Suspense boundaries added around components that make dynamic database calls, satisfying Next.js App Router requirements
- Tailwind CSS build issues resolved for production
---
 
## Tech Stack
 
| Layer      | Technology                           |
|------------|--------------------------------------|
| Framework  | Next.js 14+ (App Router)             |
| Language   | TypeScript                           |
| Styling    | Tailwind CSS (globals.css + @apply)  |
| Database   | MongoDB with Mongoose                |
| Media      | Cloudinary                           |
| Auth       | NextAuth.js with MongoDB adapter     |
| Analytics  | PostHog                              |
| Deployment | Vercel                               |
 
---
 
## Project Structure
 
```
dev-events/
├── app/
│   ├── (auth)/
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── events/
│   │   ├── [id]/
│   │   └── create/
│   ├── api/
│   │   ├── auth/
│   │   └── events/
│   └── page.tsx
├── components/
│   ├── shared/
│   │   ├── AuthForm.tsx
│   │   ├── EventCard.tsx
│   │   ├── Navbar.tsx
│   │   └── SearchBar.tsx
│   └── ui/
├── lib/
│   ├── database/
│   │   └── models/
│   └── utils/
├── public/
└── styles/
    └── globals.css
```
 
---
 
## Getting Started
 
```bash
# Clone the repo
git clone https://github.com/your-username/dev-events.git
cd dev-events
 
# Install dependencies
npm install
 
# Set up environment variables
cp .env.example .env.local
 
# Run the development server
npm run dev
```
 
Open http://localhost:3000 in your browser.
 
### Seed the Database
 
```bash
npm run seed
```
 
---
 
## Environment Variables
 
Create a `.env.local` file in the root of the project:
 
```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string
 
# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
 
# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
 
# PostHog
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
 
# App
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```
 
---
 
## Future Milestones

---

### Milestone D1 — Database Connection Debugging

Resolve MongoDB Atlas connection issues that are preventing database operations.

**Tasks:**

- [x] Investigate connection string format
- [x] Update seed script to use direct connection (not SRV)
- [x] Add authSource parameter to connection string
- [ ] Verify cluster is running and not paused
- [ ] Test connection with MongoDB Compass
- [ ] Re-verify IP whitelist configuration
- [ ] Get fresh connection string from Atlas dashboard
- [ ] Run seed script to populate events
- [ ] Verify events display on homepage and event details page

---

### Milestone 1 — Ticket Booking System

Enable users to register for and book tickets to events directly on the platform.

**Completed:**
- [x] Design and implement a `Ticket` Mongoose model (fields: event, tier name, price, total slots, slots remaining)
- [x] Design and implement a `Booking` Mongoose model
- [x] Build a ticket selection UI on the event detail page showing available tiers and remaining slots

**Pending:**
- [ ] Build a multi-step booking flow: select ticket > review order > confirm
- [ ] Integrate Paystack or Flutterwave for payment processing
- [ ] Create a booking confirmation page displaying booking reference and event details
- [ ] Generate a unique QR code per booking using the `qrcode` npm package
- [ ] Set up email confirmation on successful booking using Resend or Nodemailer
- [ ] Build a user dashboard page showing upcoming bookings, past bookings, and QR codes
- [ ] Build an organiser dashboard showing attendee list and ticket inventory per event
- [ ] Add webhook handling for payment status updates (paid, failed, refunded)
- [ ] Write API routes: `POST /api/bookings`, `GET /api/bookings/[id]`, `GET /api/events/[id]/bookings`
---
 
### Milestone 2 — Real-World Developer Events Integration
 
Pull in real, live developer events from external sources to sit alongside user-created listings.
 
**Tasks:**
 
- [ ] Research and select external event sources (Eventbrite API, Luma, Meetup.com, or community-maintained feeds)
- [ ] Register for API access and obtain credentials for chosen sources
- [ ] Build a data normalisation layer that maps each external event schema to the DevEvents `Event` model
- [ ] Write an ingestion service that fetches, normalises, and upserts external events into MongoDB
- [ ] Set up Vercel Cron Jobs to run the ingestion service on a schedule (e.g. every 6 hours)
- [ ] Add an `isExternal` flag and a `source` field to the `Event` model to distinguish external from community-listed events
- [ ] Display a source badge on event cards and detail pages (Official vs Community Listed)
- [ ] Add location-based filtering (by city or country) on the browse page
- [ ] Implement caching for external API responses to stay within rate limits
- [ ] Write a cleanup job to automatically flag or remove expired and cancelled external events
---
 
### Milestone 3 — Personalisation and Notifications
 
Give users a personalised experience based on their interests and activity.
 
**Tasks:**
 
- [ ] Add an `interests` field to the User model (array of tags e.g. "React", "AI", "DevOps", "Cloud")
- [ ] Build an onboarding step after sign-up that lets users pick their interest tags
- [ ] Build a settings page where users can update their interest tags at any time
- [ ] Implement a personalised event feed on the homepage filtered by the user's tags
- [ ] Add a Save/Bookmark feature allowing users to save events to a personal list
- [ ] Build a Saved Events page in the user dashboard
- [ ] Set up in-app notifications for events matching user preferences
- [ ] Set up email digest notifications (e.g. weekly roundup of relevant upcoming events)
- [ ] Add an unsubscribe and notification preferences page to the user settings
---
 
### Milestone 4 — Organiser Tools
 
Give event organisers dedicated tools to manage and analyse their events.
 
**Tasks:**
 
- [ ] Add an `isOrganiser` role flag to the User model
- [ ] Build an organiser application or upgrade flow for users who want to list events
- [ ] Build an organiser dashboard with a list of their created events and key stats (views, bookings, revenue)
- [ ] Integrate PostHog event-level analytics into the organiser dashboard (views over time, conversion rate)
- [ ] Add support for co-organiser collaboration — allow organisers to add other users as co-organisers on an event
- [ ] Build a sponsor section on the event detail page for organisers to display sponsor logos and links
- [ ] Allow organisers to edit and delete their events from the dashboard
- [ ] Send organisers a summary email after their event with final attendance numbers
---
 
### Milestone 5 — Community and Social Features
 
Build community features that help developers connect around events.
 
**Tasks:**
 
- [ ] Build public user profile pages showing display name, bio, interests, and event history
- [ ] Add an event badge and achievement system (e.g. "Attended 5 events", "First Hackathon")
- [ ] Build a comment and Q&A thread on each event detail page
- [ ] Add a Follow Organiser feature so users get notified when a followed organiser posts a new event
- [ ] Implement Open Graph and Twitter Card meta tags on event detail pages for rich social sharing previews
- [ ] Add a social share button on event cards and detail pages (Twitter/X, LinkedIn, WhatsApp)
---
 
## Contributing
 
This project is currently in active development. Contributions, feedback, and feature suggestions are welcome. Open an issue or submit a pull request.
 
---
 
## License
 
MIT - CoddeConf