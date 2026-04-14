"use client";

import { events } from "@/lib/constants";
import EventCard from "./EventCard";

const Explorebtn = () => {
  return (
    <div>
      <button
        type="button"
        id="explore-btn"
        className="mt-7 mx-auto"
        onClick={() => console.log("button clicked")}
      >
        Explore Button
      </button>
      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>

        <ul className="events list-none">
          {events.map((event) => (
            <li key={event.title}>
              <EventCard
                title={event.title}
                image={event.image}
                slug={event.slug}
                location={event.location}
                date={event.date}
                time={event.time}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Explorebtn;
