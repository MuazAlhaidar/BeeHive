import React from "react";
import "../CSS/Events/MyEvents.css";
import EventList from "../Components/Events/EventsList(view-only)";
import EventsForm from "../Components/Events/EventsForm(view-only)";
import * as API from "../api/Event"

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

async function reload(){
        const allevents = await API.getAllEvents()
        const events = allevents.map((i:any) => {
                var date_obj = new Date(i.Time)
                return {name:i.Name, description:i.Description, address:i.Address, time:date_obj.getHours()+date_obj.getMinutes(), date:date_obj.getFullYear()+"/"+date_obj.getMonth()+"/"+date_obj.getDate(), members: null}
        })
        return events;

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
  React.useEffect(()=>{
          reload().then(res=>setEvents(res))
          // setEvents(eventList)

  })
  const [eventIndex, setEventIndex] = React.useState(0);

  const selectEvent = (i: number) => {
    let index = i === undefined ? 0 : i;
    setEventIndex(index);
  };

  return (
    <div className="MyEvents">
      <div className="MyEvents-EventList">
        <EventList eventList={events} selectEvent={selectEvent} />
      </div>
      <div className="MyEvents-EventForm">
        {eventIndex > events.length - 1 ? (
          <EventsForm
            name={""}
            address={""}
            time={""}
            date={""}
            description={""}
          />
        ) : (
          <EventsForm
            name={events[eventIndex].name}
            address={events[eventIndex].address}
            time={events[eventIndex].time}
            date={events[eventIndex].date}
            description={events[eventIndex].description}
          />
        )}
      </div>
    </div>
  );
}

export default MyEvents;
