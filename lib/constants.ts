export type Event = {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
};

export const events: Event[] = [
  {
    title: "Google I/O 2026",
    image: "/images/event1.png",
    slug: "google-io-2026",
    location: "Shoreline Amphitheatre, Mountain View, CA",
    date: "May 2026",
    time: "9:00 AM PT",
  },
  {
    title: "Microsoft Build 2026",
    image: "/images/event2.png",
    slug: "microsoft-build-2026",
    location: "Seattle, WA + Online",
    date: "May 2026",
    time: "8:30 AM PT",
  },
  {
    title: "AWS re:Invent 2026",
    image: "/images/event3.png",
    slug: "aws-reinvent-2026",
    location: "Las Vegas, NV",
    date: "November 2026",
    time: "8:00 AM PT",
  },
  {
    title: "HackMIT 2026",
    image: "/images/event4.png",
    slug: "hackmit-2026",
    location: "Cambridge, MA",
    date: "September 2026",
    time: "10:00 AM ET",
  },
  {
    title: "PyCon US 2026",
    image: "/images/event5.png",
    slug: "pycon-us-2026",
    location: "Salt Lake City, UT",
    date: "April 2026",
    time: "9:00 AM MT",
  },
  {
    title: "JSConf Community Meetup NYC",
    image: "/images/event6.png",
    slug: "jsconf-community-meetup-nyc",
    location: "New York, NY",
    date: "June 18, 2026",
    time: "6:30 PM ET",
  },
];
