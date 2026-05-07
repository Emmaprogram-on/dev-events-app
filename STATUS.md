# STATUS.md - Project Status Tracker

## Current Status: BUILDING

**Last Updated:** May 5, 2026

---

## What Has Been Built (Completed)
**Status:** DONE

- [x] MongoDB connected via Mongoose with full Event model/schema
- [x] Seed script using Faker.js with Unsplash/Cloudinary images
- [x] Events listing page with responsive CSS Grid
- [x] Stats bar showing total events, categories, active listings
- [x] Live search with debounced API calls
- [x] Browse by category with MongoDB $in operator
- [x] Event detail page (/events/[id])
- [x] Cloudinary integration for images
- [x] Shared AuthForm component for Sign In/Sign Up
- [x] NextAuth.js with MongoDB adapter
- [x] Protected routes for authenticated users
- [x] Responsive Navbar with hamburger menu
- [x] PostHog analytics integration
- [x] Deployed on Vercel

---

## Milestone 1: Ticket Booking System
**Status:** PENDING

**Tasks:**

- [x] Design and implement a Booking Mongoose model
- [x] Build ticket selection UI on event detail page (basic dialog)
- [x] Design and implement a Ticket Mongoose model
- [x] Build ticket selection UI with tiers and remaining slots
- [ ] Build multi-step booking flow: select ticket > review order > confirm
- [ ] Create booking confirmation page displaying booking reference
- [ ] Generate a unique QR code per booking using the qrcode package
- [ ] Set up email confirmation on successful booking using Resend or Nodemailer
- [ ] Build a user dashboard page showing upcoming bookings, past bookings, and QR codes
- [ ] Build an organiser dashboard showing attendee list and ticket inventory per event
- [ ] Add webhook handling for payment status updates (paid, failed, refunded)
- [ ] Write API routes: POST /api/bookings, GET /api/bookings/[id], GET /api/events/[id]/bookings

**Current Task:** Build multi-step booking flow: select ticket > review order > confirm

---

## Milestone 2: Real-World Developer Events Integration
**Status:** PENDING

**Tasks:**
- [ ] Research and select external event sources
- [ ] Register for API access and obtain credentials
- [ ] Build data normalisation layer
- [ ] Write ingestion service for external events
- [ ] Set up Vercel Cron Jobs
- [ ] Add isExternal flag and source field to Event model
- [ ] Display source badge on event cards/pages
- [ ] Add location-based filtering
- [ ] Implement caching for external API responses
- [ ] Write cleanup job for expired events

**Current Task:** N/A - Pending

---

## Milestone 3: Personalisation and Notifications
**Status:** PENDING

**Tasks:**
- [ ] Add interests field to User model
- [ ] Build onboarding step for interest tags
- [ ] Build settings page for interest tags
- [ ] Implement personalised event feed on homepage
- [ ] Add Save/Bookmark feature
- [ ] Build Saved Events page
- [ ] Set up in-app notifications
- [ ] Set up email digest notifications

**Current Task:** N/A - Pending

---

## Milestone 4: Organiser Tools
**Status:** PENDING

**Tasks:**
- [ ] Add isOrganiser role flag to User model
- [ ] Build organiser application/upgrade flow
- [ ] Build organiser dashboard with stats
- [ ] Integrate PostHog analytics in dashboard
- [ ] Add co-organiser collaboration support
- [ ] Build sponsor section on event page
- [ ] Allow organisers to edit/delete events
- [ ] Send summary email after events

**Current Task:** N/A - Pending

---

## Milestone 5: Community and Social Features
**Status:** PENDING

**Tasks:**
- [ ] Build public user profile pages
- [ ] Add event badge and achievement system
- [ ] Build comment and Q&A thread on event pages
- [ ] Add Follow Organiser feature
- [ ] Implement Open Graph and Twitter Card meta tags
- [ ] Add social share buttons

**Current Task:** N/A - Pending

---

## Summary
- **Completed Features:** 14 items (What Has Been Built)
- **Completed Milestone Tasks:** 4 (Booking model, basic booking UI, Ticket model, Ticket selection UI)
- **Pending Milestone Tasks:** 8 (Milestone 1)
- **Current Milestone:** Milestone 1 - Ticket Booking System (BUILDING)

---

## Milestone D1: Database Connection Debugging
**Status:** DONE

**Issues Identified:**
- MongoDB Atlas connection failing with "IP not whitelisted" error
- Root cause: TLS settings needed for Node.js driver (`tls=true&tlsAllowInvalidCertificates=true`)
- Solution: Use direct connection format with explicit cluster hostname

**Next Steps:**
- Use new connection format in production

---

## Next Action
Resume Milestone 1 - Build multi-step booking flow

---

## Identified Gaps & Architectural Decisions (May 5, 2026)

These observations were made during codebase review before starting the next task. Items marked with **[ACTION]** will be addressed as part of the upcoming work; others are deferred per product priorities.

1. **[ACTION]** **Booking model is too thin** — Currently only stores `eventId` and `email`. It needs to be expanded to include:
   - `ticketId` (reference to the selected tier)
   - `quantity` (number of tickets booked)
   - `totalPrice` (calculated at booking time)
   - `status` (e.g. `pending`, `confirmed`, `cancelled`)
   - `bookingReference` (unique human-readable code)
   - `userId` (optional link to authenticated user; needed for dashboard)

2. **[ACTION]** **Ticket selection UI is not wired to data persistence** — `TicketSelection.tsx` fires PostHog analytics and flips a local `submitted` state, but it never actually calls `createBooking` or decrements `slotsRemaining` via `updateTicketSlots`. This will be fixed as part of the multi-step flow.

3. **[ACTION]** **No booking API routes exist yet** — Need to create `POST /api/bookings`, `GET /api/bookings/[id]`, and `GET /api/events/[id]/bookings` (or equivalent Server Actions) before the flow can be completed.

4. **[ACTION]** **Booking confirmation page is missing** — After the user clicks confirm, they should land on a dedicated confirmation page showing the booking reference, event details, and (eventually) the QR code.

5. **[DEFERRED]** **QR code generation** — Requires installing the `qrcode` package and adding it to the confirmation page / dashboard. Will be handled in a later task.

6. **[DEFERRED]** **Email confirmation** — Resend or Nodemailer setup is deferred until after the core booking flow is solid.

7. **[DEFERRED]** **User/organiser dashboards** — Will be built after the booking creation flow and confirmation page are complete.

---

## Next Action
Resume Milestone 1 - Build multi-step booking flow