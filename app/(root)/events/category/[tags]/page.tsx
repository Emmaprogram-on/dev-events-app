import EventCard from "@/components/EventCard";
import { IEvent } from "@/database/event.model";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const CategoryPage = async ({ params }: { params: Promise<{ tags: string }> }) => {
  const { tags } = await params;
  console.log("BASE_URL:", BASE_URL);
  console.log("tags:", tags);
  const decodedTags = decodeURIComponent(tags).split(",");

  const response = await fetch(`${BASE_URL}/api/events/category?tags=${decodedTags.join(",")}`, {
    cache: "no-store",
  });

    const data = await response.json();
  console.log("API response:", data);
  console.log("events:", data.events);
  const { events } = data;

  // const { events } = await response.json();


  return (
    <section>
      <div className="mb-10">
        <h1>{decodedTags[0]}</h1>
        <p className="text-light-200 mt-2">
          Showing events tagged with {decodedTags.join(", ")}
        </p>
      </div>

      <div className="events">
        {events && events.length > 0 ? (
          events.map((event: IEvent) => (
            <EventCard key={event.title} {...JSON.parse(JSON.stringify(event))} />
          ))
        ) : (
          <p className="text-light-200">No events found for this category.</p>
        )}
      </div>
    </section>
  );
};

export default CategoryPage;