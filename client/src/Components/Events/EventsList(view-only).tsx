import React from "react";
import "../../CSS/Events/EventsList.css";
import Event from "./Event";

enum Relation{
        Manager,
        RSVP,
        NotRSVP
}

interface EventInfo {
  name: string;
  address: string;
  time: string;
  date: string;
  description: string;
  relation: Relation
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
              console.log(curEvent)
        return (
          <Event
            key={`event-${index}`}
            name={curEvent.name}
            index={index}
            selectEvent={selectEvent}
          />
        );
      })}
    </div>
  );
}

export default EventList;
