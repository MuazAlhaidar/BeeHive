import React from "react";
import "../CSS/Events/MyEvents.css";
import EventList from "../Components/Events/EventsList(view-only)";
import EventsForm from "../Components/Events/EventsForm(view-only)";
import EventsFormNonMember from "../Components/Events/EventsForm(NonMember)";
import * as API from "../api/Event";

interface MemberInfo {
  name: string;
  points: number;
}

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
  members: Array<MemberInfo> | null;
  id: number;
  relation: Relation
}

interface IProp {
  name: string;
  id: number|any;
}

async function reload(id:any) {
  const allevents = await API.getAllEvents(id);
  console.log(allevents)
  const events = allevents.map((i: any) => {
    var date_obj = new Date(i.Time);
    let _date =
      +(+date_obj.getMonth()) +
      "/" +
      date_obj.getDay() +
      "/" +
      date_obj.getFullYear();
    let minute = date_obj.getMinutes();
    let hour = date_obj.getHours();
    let _hour = ("0" + hour).slice(-2);
    let _minute = ("0" + minute).slice(-2);
    let _time = _hour + ":" + _minute;
    let _relation = null
    {

            console.log(id, i.Manager, i.RSVP, " STATE OF THIS BULLSHTI")
            if( i.Manager === 1){
                    console.log(id, " IS MANAGER")
                    _relation = Relation.Manager
            }
            else if (i.RSVP === 1){
                    console.log(id, " IS RSVP")
                    _relation = Relation.RSVP
            }
            else{
                    console.log(id, " IS NOT RSVP/MANAGER")
                    _relation = Relation.NotRSVP
            }
    }
    return {
      name: i.Name,
      description: i.Description,
      address: i.Address,
      time: _time,
      date: _date,
      members: null,
      id: i.id,
      relation: _relation
    };
  });
  return events;
}

function MyEvents({ name, id }: IProp) {
  const [events, setEvents] = React.useState(Array<EventInfo>());
  React.useEffect(() => {
    reload(id).then((res) => setEvents(res));
  }, []);
  const [eventIndex, setEventIndex] = React.useState(0);

  const selectEvent = (i: number) => {
    let index = i === undefined ? 0 : i;
    setEventIndex(index);
  };

  console.log(events)
  return (
    <div className="MyEvents">
      <div className="MyEvents-EventList">
        <EventList eventList={events} selectEvent={selectEvent} />
      </div>
      <div className="MyEvents-EventForm">
        {name === "" ? (
          eventIndex > events.length - 1 ? (
            <EventsFormNonMember
              name={""}
              address={""}
              time={""}
              date={""}
              description={""}
            />
          ) : (
            <EventsFormNonMember
              name={events[eventIndex].name}
              address={events[eventIndex].address}
              time={events[eventIndex].time}
              date={events[eventIndex].date}
              description={events[eventIndex].description}
            />
          )
        ) : eventIndex > events.length - 1 ? (
          <EventsForm
            name={""}
            address={""}
            time={""}
            date={""}
            description={""}
            relation={Relation.NotRSVP}
          />
        ) : (
          <EventsForm
            name={events[eventIndex].name}
            address={events[eventIndex].address}
            time={events[eventIndex].time}
            date={events[eventIndex].date}
            description={events[eventIndex].description}
            relation={events[eventIndex].relation}
          />
        )}
        {/* {eventIndex > events.length - 1 ? (
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
        )} */}
      </div>
    </div>
  );
}

export default MyEvents;
