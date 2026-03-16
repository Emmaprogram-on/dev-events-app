import Image from "next/image";
import Link from "next/link";
import { IEvent } from "@/database/event.model";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventsPage = async () => {
  const response = await fetch(`${BASE_URL}/api/events`, { cache: "no-store" });
  const { events } = await response.json();

  return (
    <section id="events-page">
      <div className="events-page-header">
        <h1>Explore Events</h1>
        <p className="text-light-100 text-lg mt-2">
          Browse all upcoming developer events in one place.
        </p>
      </div>

      <div className="events-table-wrapper">
        {/* Table Header */}
        <div className="events-table-head">
          <span className="col-image">Image</span>
          <span className="col-title">Event Title</span>
          <span className="col-location">Location</span>
          <span className="col-date">Date</span>
          <span className="col-mode">Mode</span>
          {/* <span className="col-action"></span> */}
        </div>

        {/* Table Rows */}
        {events && events.length > 0 ? (
          events.map((event: IEvent & { _id: string; slug: string }) => (

            <Link href={`/events/${event.slug}`} className="events-table-row" key={event.slug}>
              {/* Image */}
              <div className="col-image">
                <Image
                  src={event.image}
                  alt={event.title}
                  width={80}
                  height={56}
                  className="event-row-image"
                />
              </div>

              {/* Title */}
              <div className="col-title">
                <p className="event-row-title">{event.title}</p>
                <p className="event-row-tags">
                  {event.tags?.slice(0, 3).map((tag) => (
                    <span className="pill" key={tag}>{tag}</span>
                  ))}
                </p>
              </div>

              {/* Location */}
              <div className="col-location">
                <div className="flex flex-row gap-2 items-center">
                  <Image src="/icons/pin.svg" alt="location" width={14} height={14} />
                  <p className="text-light-200 text-sm">{event.location}</p>
                </div>
              </div>

              {/* Date */}
              <div className="col-date">
                <div className="flex flex-row gap-2 items-center">
                  <Image src="/icons/calendar.svg" alt="date" width={14} height={14} />
                  <p className="text-light-200 text-sm">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Mode */}
              <div className="col-mode">
                <span className="pill">{event.mode}</span>
              </div>

              {/* Action */}
              {/* <div className="col-action">
                <Link href={`/events/${event.slug}`} className="view-event-btn">
                  View
                </Link>
              </div> */}
            </Link>
          ))
        ) : (
          <div className="events-empty">
            <p className="text-light-200">No events found.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsPage;