import React from "react";
import "../CSS/Events/MyEvents.css";
import EventList from "../Components/Events/EventsList";
import EventsForm from "../Components/Events/EventsForm";
import EmailModal from "../Components/EmailModal";
import EventEdit from "../Components/Events/EventsEdit";
import EventMemberModal from "../Components/Events/EventMemberModal";
import TransferManagerModal from "../Components/TransferManagerModal";
import ConfirmationModal from "../Components/ConfirmationModal";
import * as API from "../api/Event";

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
        id: number;
        members: Array<MemberInfo> | null;
}

async function reload(id: number) {
        const allevents = await API.getEventManager(id);
        // const members = await API.get_members()

        console.log(allevents)
        if(allevents === undefined){
                return [];
        }
        else{
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
                        let _id = i.id;
                        return {
                                name: i.Name,
                                description: i.Description,
                                address: i.Address,
                                time: _time,
                                date: _date,
                                members: null,
                                id: _id,
                        };
                });
                return events;
        }
}

function MyEvents(props: { id: any }) {

  const [events, setEvents] = React.useState(Array<EventInfo>());
  console.log(events)
  const [eventIndex, setEventIndex] = React.useState(0);
  const [showEventEditModal, setShowEventEditModal] = React.useState(false);
  const [showEventMemberModal, setShowEventMemberModal] = React.useState(false);
  const [showEmailModal, setShowEmailModal] = React.useState(false);
  const [
    showTransferManagerModal,
    setShowTransferManagerModal,
  ] = React.useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = React.useState(
    false
  );
  const [curEvent, setCurEvent] = React.useState({
    name: "",
    address: "",
    time: "",
    date: "",
    description: "",
  });

        React.useEffect(() => {
                reload(props.id).then((res) => setEvents(res));
        }, []);

        const toggleEmailModal = () => {
                setShowEmailModal(!showEmailModal);
        };

        const toggleEventEditModal = () => {
                setShowEventEditModal(!showEventEditModal);
        };

        const toggleEventMemberModal = () => {
                setShowEventMemberModal(!showEventMemberModal);
        };


  const toggleTransferManagerModal = () => {
    setShowTransferManagerModal(!showTransferManagerModal);
  };

  const toggleConfirmationModal = () => {
    setShowConfirmationModal(!showConfirmationModal);
  };

  const selectEvent = (i: number) => {
    let index = i === undefined ? 0 : i;
    setEventIndex(index);
    i === undefined
      ? setCurEvent({
          name: "",
          address: "",
          time: "",
          date: "",
          description: "",
        })
      : setCurEvent({
          name: events[index].name,
          address: events[index].address,
          time: events[index].time,
          date: events[index].date,
          description: events[index].description,
        });
  };

  const addEvent = async (
    name: string,
    address: string,
    time: string,
    date: string,
    description: string
  ) => {
    let [month, day, year] = date.split("-").map((i) => parseInt(i));
    let [hour, minute] = time.split(":").map((i) => parseInt(i));
    let thedate = new Date(year, month - 1, day, hour - 5, minute);
    let _tmp = await API.newEvent(
      name,
      description,
      address,
      thedate,
      props.id
    );
    const e = events.slice();
    e.push({
      name,
      address,
      time,
      date,
      description,
      id: _tmp.id,
      members: null,
    });
    setEvents(e);
    setEventIndex(events.length);
    setCurEvent({
      name: name,
      address: address,
      time: time,
      date: date,
      description: description,
    });
  };

  const editEvent = async (
    name: string,
    address: string,
    time: string,
    date: string,
    description: string
  ) => {
    if (events[eventIndex] !== undefined) {
      let [month, day, year] = date.split("-").map((i) => parseInt(i));
      let [hour, minute] = time.split(":").map((i) => parseInt(i));
      let thedate = new Date(year, month - 1, day, hour - 5, minute);
      await API.update(
        events[eventIndex].id,
        name,
        description,
        address,
        thedate
      );
      const e = events.slice();
      e[eventIndex].name = name;
      e[eventIndex].address = address;
      e[eventIndex].time = time;
      e[eventIndex].date = date;
      e[eventIndex].description = description;
      setEvents(e);
      setCurEvent({
        name: events[eventIndex].name,
        address: events[eventIndex].address,
        time: events[eventIndex].time,
        date: events[eventIndex].date,
        description: events[eventIndex].description,
      });
    }
  };

  const removeEvent = async (i: number) => {
    if (events[i] !== undefined) {
      await API.Delete(events[i].id);
      const e = events.slice();
      e.splice(i, 1);
      setEvents(e);
      setEventIndex(-1);
    }

    setCurEvent({
      name: "",
      address: "",
      time: "",
      date: "",
      description: "",
    });
  };

  return (
    <div className="MyEvents">
      <EmailModal showModal={showEmailModal} setShowModal={setShowEmailModal} />
      <EventEdit
        showModal={showEventEditModal}
        setShowModal={setShowEventEditModal}
        editEvent={editEvent}
        curEvent={curEvent}
        setCurEvent={setCurEvent}
      />
      <EventMemberModal
        showModal={showEventMemberModal}
        setShowModal={setShowEventMemberModal}
      />
      <TransferManagerModal
        showModal={showTransferManagerModal}
        setShowModal={setShowTransferManagerModal}
      />
      <ConfirmationModal
        showModal={showConfirmationModal}
        setShowModal={setShowConfirmationModal}
        removeFunction={() => {
          removeEvent(eventIndex);
        }}
      />
      <div className="MyEvents-EventList">
        <EventList
          eventList={events}
          selectEvent={selectEvent}
          addEvent={addEvent}
        />
      </div>
      <div className="MyEvents-EventForm">
        {eventIndex > events.length - 1 || eventIndex < 0 ? (
          <EventsForm
            name={""}
            address={""}
            time={""}
            date={""}
            description={""}
            removeEvent={() => {
              removeEvent(eventIndex);
            }}
            toggleEmailModal={toggleEmailModal}
            toggleEventEditModal={toggleEventEditModal}
            toggleEventMemberModal={toggleEventMemberModal}
            toggleTransferManagerModal={toggleTransferManagerModal}
            toggleConfirmationModal={toggleConfirmationModal}
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
            toggleEmailModal={toggleEmailModal}
            toggleEventEditModal={toggleEventEditModal}
            toggleEventMemberModal={toggleEventMemberModal}
            toggleTransferManagerModal={toggleTransferManagerModal}
            toggleConfirmationModal={toggleConfirmationModal}
          />
        )}
      </div>
    </div>
  );
}

export default MyEvents;
