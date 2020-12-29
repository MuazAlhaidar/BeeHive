import React from "react";
import "../../CSS/Events/EventsList.css";
import Event from "./Event";

interface EventInfo {
  name: string;
  address: string;
  time: string;
  date: string;
  description: string;
}

interface IProps {
  eventList: Array<EventInfo>;
  selectEvent: (i: number) => void;
}

function EventList({ eventList, selectEvent }: IProps) {
  const events = eventList;

  return (
    <div>
      <button className="EventList-AddButton">+</button>
      {events.map((curEvent, index) => {
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
