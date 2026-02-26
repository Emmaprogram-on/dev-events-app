<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the **DevEvent** Next.js App Router application. Here is a summary of all changes made:

- **`instrumentation-client.ts`** *(new)* — Initializes PostHog client-side using the Next.js 15.3+ recommended approach. Configured with a reverse proxy (`/ingest`), automatic exception/error tracking (`capture_exceptions: true`), and debug mode in development.
- **`next.config.ts`** *(updated)* — Added PostHog reverse proxy rewrites (`/ingest/static/*` and `/ingest/*`) and `skipTrailingSlashRedirect: true` so PostHog API requests are routed through the Next.js server, improving ad-blocker resilience and data accuracy.
- **`components/ExploreBtn.tsx`** *(updated)* — Added `'use client'` context and a `posthog.capture('explore_events_clicked')` call inside the button's click handler, tracking when users engage with the homepage CTA.
- **`components/EventCard.tsx`** *(updated)* — Added `'use client'` directive and a `posthog.capture('event_card_clicked', { ... })` call on the `<Link>` `onClick`, recording which event (title, slug, location, date) a user clicks on.
- **`.env.local`** *(updated)* — `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` written securely via environment variables (never hardcoded in source).
- **`posthog-js`** *(installed)* — Added as a production dependency via npm.

## Events instrumented

| Event Name | Description | File |
|---|---|---|
| `explore_events_clicked` | User clicked the "Explore Events" CTA button on the homepage to scroll to the events list | `components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicked on an event card to view its detail page; captures `event_title`, `event_slug`, `event_location`, `event_date` | `components/EventCard.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- 📊 **Dashboard — Analytics basics**: https://us.posthog.com/project/323695/dashboard/1308152
- 📈 **Explore Events Clicks (Daily)**: https://us.posthog.com/project/323695/insights/jonNXwiN
- 📈 **Event Card Clicks (Daily)**: https://us.posthog.com/project/323695/insights/GOH0L4Ez
- 🔀 **Explore → Event Click Funnel**: https://us.posthog.com/project/323695/insights/ZpJk0wZW
- 👥 **Daily Active Users — Explore & Event Views**: https://us.posthog.com/project/323695/insights/6nTGfLzb
- 🏆 **Top Events by Click Volume**: https://us.posthog.com/project/323695/insights/En59qP5T

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/posthog-integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
