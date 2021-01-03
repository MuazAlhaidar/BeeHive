import React from "react";
import "../CSS/Events/MyEvents.css";
import EventList from "../Components/Events/EventsList";
import EventsForm from "../Components/Events/EventsForm";

interface EventInfo {
  name: string;
  address: string;
  time: string;
  date: string;
  description: string;
}

function MyEvents() {
  const fakeEvents = Array<EventInfo>(
    {
      name: "HR event",
      address: "5648 Thing St.",
      time: "88:88",
      date: "88/88/8888",
      description: "Thing thang",
    },
    {
      name: "CR event",
      address: "8459 Thang St.",
      time: "88:88",
      date: "88/88/8888",
      description: "Thang thing",
    }
  );
  const [events, setEvents] = React.useState(fakeEvents);
  const [eventIndex, setEventIndex] = React.useState(0);

  const selectEvent = (i: number) => {
    let index = i === undefined ? 0 : i;
    setEventIndex(index);
  };

  const addEvent = (
    name: string,
    address: string,
    time: string,
    date: string,
    description: string
  ) => {
    const e = events.slice();
    e.push({ name, address, time, date, description });
    setEvents(e);
  };

  const removeEvent = (i: number) => {
    const e = events.slice();
    e.splice(i, 1);
    setEvents(e);
    setEventIndex(events.length);
  };

  return (
    <div className="MyEvents">
      <div className="MyEvents-EventList">
        <EventList
          eventList={events}
          selectEvent={selectEvent}
          addEvent={addEvent}
        />
      </div>
      <div className="MyEvents-EventForm">
        {eventIndex > events.length - 1 ? (
          <EventsForm
            name={""}
            address={""}
            time={""}
            date={""}
            description={""}
            removeEvent={() => {
              removeEvent(eventIndex);
            }}
          />
        ) : (
          <EventsForm
            name={events[eventIndex].name}
            address={events[eventIndex].address}
            time={events[eventIndex].time}
            date={events[eventIndex].date}
            description={events[eventIndex].description}
            removeEvent={() => {
              removeEvent(eventIndex);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default MyEvents;
