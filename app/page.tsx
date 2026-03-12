import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { IEvent } from "@/database/event.model";
import { cacheLife } from "next/cache";
import { getAllEvents } from "@/lib/action/event.action";

// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const page = async () => {
  'use cache';
  cacheLife('hours')
const events = await getAllEvents();

  return (
      <section>
      <h1 className="text-center">The Hub for Every Dev Event <br />You Should Not Miss</h1>
      <p className="text-center mt-5">Hackathons, Meetups, Conferences, and more All in One Place</p>

      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>

        <ul className="events">
          {events && events.length > 0 && events.map((event: IEvent) => (
            <li key={event.title} className="list-none">
              <EventCard {...event} />
          </li>))}
        </ul>
      </div>
      </section>
  );
};

export default page;
