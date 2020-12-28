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
      <div>{name}</div>
      <div>
        <div>{address}</div>
        <div>{time}</div>
        <div>{date}</div>
      </div>
      <div>{description}</div>
      <div>
        <div>
          <button>Edit Event</button>
          <button>Members</button>
          <button>Email Members</button>
        </div>
        <div>
          <button onClick={removeEvent}>Delete Event</button>
        </div>
      </div>
    </div>
  );
}

export default EventsForm;
