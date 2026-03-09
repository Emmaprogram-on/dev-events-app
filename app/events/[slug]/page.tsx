

import { notFound } from "next/navigation";
import Image from "next/image";
import BookEvent from "@/components/BookEvent";
import { getSimilarEventsBySlug } from "@/lib/action/event.action";
import { IEvent } from "@/database/event.model";
import EventCard from "@/components/EventCard";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailItem = ({ icon, alt, label }: { icon: string, alt: string, label: string }) => { 
  return (
    <div className="flex-row-gap-2 items-center">
      <Image src={icon} alt={alt} width={17} height={17} />
      <p>{label}</p>
    </div>
  )
}

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => {
  return (
    <div className="agenda">
      <h2>Agenda</h2>
      <ul>
        {agendaItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
  
}

const EventTags = ({ tags }: { tags: string[] }) => { 
  return (
    <div className="flex flex-row gap-1.5 flex-wrap">
      {tags.map((tag) => (
        <div className="pill" key={tag}>{tag}</div>
      ))}
    </div>
  )
}

const EventDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const request = await fetch(`${BASE_URL}/api/events/${slug}`);
  const { event: { title, description, image, overview, date, time, location, mode, agenda, audience, tags, organizer} } = await request.json();

  if (!description) return notFound();

  const booking = 10;

  const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);

  console.log(similarEvents);

  return (
    <section id="event">
      <div className="header">
          <h1>{title}</h1>
          <p className="mt-2">{description}</p>
      </div>

      <div className="details">
        { }
        <div className="content">
          <Image src={image} alt="Event Banner" width={800} height={800} />

          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{overview}</p>
          </section>
          <section className="flex-col-gap-2">
            <h2>Event Details</h2>
            <EventDetailItem icon="/icons/calendar.svg" alt="calendar"
            label={new Date(date).toISOString().split('T')[0]}
            />
            <EventDetailItem icon="/icons/clock.svg" alt="clock" label={time}/>
            <EventDetailItem icon="/icons/pin.svg" alt="location" label={location}/>
            <EventDetailItem icon="/icons/audience.svg" alt="users" label={audience}/>
          </section>

          <EventAgenda agendaItems={agenda} />

          <section className="flex-col-gap-2">
            <h2>About the Organizers</h2>
            <p>{ organizer }</p>
          </section>

          <EventTags tags={tags} />

        </div>
        { }
        
        <aside className="booking">
          <div className="signup-card">
            <h2>Book Your Spot</h2>
            {booking > 0 ? (
              <p className="text-sm">
                Join {booking} others who have booked for their spot for this event!
              </p>
            ) : (
              <p className="text-sm">
                Be the first to book your spot!
              </p>
            )}

            <BookEvent />
          </div>
        </aside>
      </div>

      <div className="flex w-full flex-col gap-4 pt-20">
        <h2>Similar Events</h2>
        <div className="events">
          {similarEvents.length > 0 && similarEvents.map((similarEvent: IEvent) => (
            <EventCard key={similarEvent.title} {...similarEvent}  />
          ))}
        </div>
      </div>
    </section>
  )
}

export default EventDetailsPage