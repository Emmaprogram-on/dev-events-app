import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { IEvent } from "@/database/event.model";
// import { cacheLife } from "next/cache";
import { getAllEvents } from "@/lib/action/event.action";
import Link from "next/link";

const StatsBar = () => {
  const stats = [
    { value: "50+", label: "Events" },
    { value: "20+", label: "Cities" },
    { value: "10+", label: "Countries" },
    { value: "100%", label: "Free to Browse" },
  ];

  return (
    <div className="stats-section">
      <div className="stats-header">
        <h2 className="stats-heading">
          Discover. Book. <br className="sm:hidden" />
          <span className="text-primary underline decoration-primary">Attend.</span>
        </h2>
        <p className="stats-description">
          DevEvents is your go-to hub for discovering the best developer events 
  happening around the world. Whether you are looking for a hackathon to 
  sharpen your skills, a conference to expand your network, or a local 
  meetup to connect with like-minded developers — we've got you covered. 
  Browse events, secure your spot in seconds, and never miss what matters 
  in the dev world again.
        </p>
      </div>

      <div className="w-full border-t border-dark-200" />

      <div className="stats-bar">
        {stats.map((stat) => (
          <div className="stat-item" key={stat.label}>
            <p className="stat-value">{stat.value}</p>
            <p className="stat-label">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const page = async () => {
  // 'use cache';
  // cacheLife('hours')
  const events = await getAllEvents();
  
  const categories = [
  {
    name: "AI & Machine Learning",
    description: "AI, ML, Data",
    tags: ["AI", "ML", "Data"],
  },
  {
    name: "Cloud & DevOps",
    description: "Cloud, DevOps, Docker, Serverless, Kubernetes",
    tags: ["Cloud", "DevOps", "Docker", "Serverless", "Kubernetes"],
  },
  {
    name: "Security & Web3",
    description: "Security, Web3, Blockchain",
    tags: ["Security", "Web3", "Blockchain"],
  },
  {
    name: "Web Development",
    description: "React, Node.js, TypeScript, API",
    tags: ["React", "Node.js", "TypeScript", "API"],
  },
  {
    name: "Systems & Languages",
    description: "Rust, Open Source",
    tags: ["Rust", "Open Source"],
  },
  {
    name: "Community & Networks",
    description: "Networking, Microservices",
    tags: ["Networking", "Microservices"],
  },
];

  return (
      <section>
      <h1 className="text-center">The Hub for Every Dev Event <br />You Should Not Miss</h1>
      <p className="text-center mt-5">Hackathons, Meetups, Conferences, and more All in One Place</p>

      <ExploreBtn />

<div className="categories-section">
    <h3>Browse by Category</h3>
           
    <div className="categories-grid">
      {categories.map((category) => (
      <Link
        key={category.name}
        href={`/events/category/${category.tags.join(",")}`}
        className="category-card"
       >
        <p className="category-name">{category.name}</p>
        <p className="category-description">{category.description}</p>
      </Link>
    ))}
  </div>
</div>

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>

        <ul className="events">
          {events && events.length > 0 && events.slice(0, 3).map((event: IEvent) => (
            <li key={event.title} className="list-none">
              <EventCard {...JSON.parse(JSON.stringify(event))} />
            </li>))}
        </ul>
      </div>
      
      <StatsBar />
      </section>
  );
};

export default page;
