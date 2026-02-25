import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { events } from "@/lib/constants";

// const events = [
//   { image: '/images/event1.png', title: 'Event 1', slug: 'event-1', location: 'location-1', date: 'Date 1', time: 'Time 1' },
//   { image: '/images/event2.png', title: 'Event 2', slug: 'event-2', location: 'location-2', date: 'Date 2', time: 'Time 2' },
//   { image: '/images/event3.png', title: 'Event 3', slug: 'event-3', location: 'location-3', date: 'Date 3', time: 'Time 3' },
//   { image: '/images/event4.png', title: 'Event 4', slug: 'event-4', location: 'location-4', date: 'Date 4', time: 'Time 4' },
//   { image: '/images/event5.png', title: 'Event 5', slug: 'event-5', location: 'location-5', date: 'Date 5', time: 'Time 5' },
// ]

const page = () => {
  return (
      <section>
      <h1 className="text-center">The Hub for Every Dev. Event <br />You Should Not Miss</h1>
      <p className="text-center mt-5">Hackathons, Meetups, Conferences, and more All in One Place</p>

      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>

        <ul className="events">
          {events.map((event) => (
            <li key={event.title}>
              <EventCard {...event} />
          </li>))}
        </ul>
      </div>
      </section>
  );
};

export default page;
