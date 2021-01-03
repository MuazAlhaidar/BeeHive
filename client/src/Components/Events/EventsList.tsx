import React from "react";
import "../../CSS/Events/EventsList.css";
import Event from "./Event";
import EventAdd from "./EventsAdd";

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
  addEvent: (
    name: string,
    address: string,
    time: string,
    date: string,
    description: string
  ) => void;
}

function EventList({ eventList, selectEvent, addEvent }: IProps) {
  const events = eventList;

  const [showModal, setShowModal] = React.useState(false);

  const toggle = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <div className="EventList-Top">
        <button className="EventList-AddButton" onClick={toggle}>
          +
        </button>
      </div>
      <EventAdd
        addEvent={addEvent}
        showModal={showModal}
        setShowModal={setShowModal}
      />
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
