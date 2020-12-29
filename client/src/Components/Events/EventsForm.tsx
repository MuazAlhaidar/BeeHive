import React from "react";

interface EventInfo {
  name: string;
  address: string;
  time: string;
  date: string;
  description: string;
  removeEvent: () => void;
}

function EventsForm({
  name,
  address,
  time,
  date,
  description,
  removeEvent,
}: EventInfo) {
  return (
    <div>
      <div>
        <div>
          <div className="EventsForm-Name">{name}</div>
          <div>
            <div className="EventsForm-Address">{address}</div>
            <div className="EventsForm-Time">{time}</div>
            <div className="EventsForm-Date">{date}</div>
          </div>
        </div>
        <div>
          <button></button>
          <button></button>
        </div>
      </div>
      <div className="EventsForm-Description">{description}</div>
      <div>
        <div>
          <button className="EventsForm-BrightButton">Edit Event</button>
          <button className="EventsForm-BrightButton">Members</button>
          <button className="EventsForm-BrightButton">Email Members</button>
        </div>
        <div>
          <button className="EventsForm-DarkButton" onClick={removeEvent}>
            Delete Event
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventsForm;
