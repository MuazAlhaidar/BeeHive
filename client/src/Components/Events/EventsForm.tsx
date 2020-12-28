import React from "react";

interface EventInfo {
  name: string;
  address: string;
  time: string;
  date: string;
  description: string;
}

function EventsForm({ name, address, time, date, description }: EventInfo) {
  return <div></div>;
}

export default EventsForm;
