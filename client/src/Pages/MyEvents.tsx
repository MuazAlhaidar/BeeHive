import React from "react";
import "../CSS/Events/MyEvents.css";
import EventList from "../Components/Events/EventsList";
import EventsForm from "../Components/Events/EventsForm";

interface MemberInfo {
  name: string;
  points: number;
}

interface EventInfo {
  name: string;
  address: string;
  time: string;
  date: string;
  description: string;
  members: Array<MemberInfo> | null;
}

function MyEvents() {
  const fakeEvents = Array<EventInfo>(
    {
      name: "HR event",
      address: "5648 Thing St.",
      time: "88:88",
      date: "8888-88-88",
      description: "Thing thang",
      members: [
        { name: "john", points: 0 },
        { name: "Thomas", points: 0 },
      ],
    },
    {
      name: "CR event",
      address: "8459 Thang St.",
      time: "88:88",
      date: "8888-88-88",
      description: "Thang thing",
      members: [
        { name: "John", points: 0 },
        { name: "Lisa", points: 0 },
      ],
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
    e.push({ name, address, time, date, description, members: null });
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
