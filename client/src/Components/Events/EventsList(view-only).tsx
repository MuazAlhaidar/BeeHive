import React from "react";
import "../../CSS/Events/EventsList.css";
import Event from "./Event";
import { EventInfo } from "../../Interfaces";

enum Relation {
  RSVP,
  NotRSVP,
}

interface IProps {
  eventList: Array<EventInfo>;
  selectEvent: (i: number) => void;
}

function EventList({ eventList, selectEvent }: IProps) {
  const events = eventList;

  return (
    <div>
      {events.map((curEvent, index) => {
        return (
          <Event
            key={`event-${index}`}
            name={curEvent.title}
            index={index}
            selectEvent={selectEvent}
          />
        );
      })}
    </div>
  );
}

export default EventList;
