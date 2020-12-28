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
      name: "",
      address: "",
      time: "",
      date: "",
      description: "",
    },
    {
      name: "HR event",
      address: "5648 Thing St.",
      time: "00:00 AM",
      date: "01/22/2018",
      description: "Thing thang",
    },
    {
      name: "CR event",
      address: "8459 Thang St.",
      time: "00:01 AM",
      date: "01/35/2018",
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
  };

  return (
    <div className="MyEvents">
      <div className="MyEvents-EventList">
        <EventList eventList={events} selectEvent={selectEvent} />
      </div>
      <div className="MyEvents-EventManager">
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
      </div>
    </div>
  );
}

export default MyEvents;
