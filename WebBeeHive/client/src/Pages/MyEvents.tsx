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
import { store, redux_index } from "../store";
import { MemberInfo, EventInfo } from "../Interfaces";
import { getFormattedDate, getFormattedTime } from "../DateAndTimeFormat";

async function reload(user: string) {
  let tmp = await API.getEventsForManager(user);
  return tmp;
}

function MyEvents(props: { id: any }) {
  const emptyEvent: EventInfo = {
    id: "0",
    title: "",
    creator: "",
    address: "",
    date: new Date(2000, 1, 1, 0, 0),
    description: "",
    rsvp: Array<MemberInfo>(),
    signin: Array<string>(),
  };

  const [events, setEvents] = React.useState(Array<EventInfo>());
  const [eventIndex, setEventIndex] = React.useState(-1);
  const [showEventEditModal, setShowEventEditModal] = React.useState(false);
  const [showEventMemberModal, setShowEventMemberModal] = React.useState(false);
  const [showEmailModal, setShowEmailModal] = React.useState(false);
  const [checkReload, setReload] = React.useState(false);
  const [
    showTransferManagerModal,
    setShowTransferManagerModal,
  ] = React.useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = React.useState(
    false
  );
  const [curEvent, setCurEvent] = React.useState({
    id: "",
    title: "",
    address: "",
    time: "",
    date: "",
    description: "",
  });

  React.useEffect(() => {
    reload(props.id).then((res) => {
      setEvents(res);
    });
  }, [eventIndex, checkReload]);

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
          id: "",
          title: "",
          address: "",
          time: "",
          date: "",
          description: "",
        })
      : setCurEvent({
          id: events[index].id,
          title: events[index].title,
          address: events[index].address,
          time: getFormattedTime(events[index]),
          date: getFormattedDate(events[index]),
          description: events[index].description,
        });
    store.dispatch(redux_index(i));
  };

  const addEvent = async (
    title: string,
    address: string,
    time: string,
    date: string,
    description: string
  ) => {
    let [year, month, day] = date.split("-").map((i) => parseInt(i));
    let [hour, minute] = time.split(":").map((i) => parseInt(i));
    let thedate = new Date(year, month - 1, day, hour, minute);
    // console.log(date)
    // console.log(time)
    // console.log(thedate)
    // console.log(`Year:${year}\n Month:${month}\n Day:${day}\n Hour:${hour}\n ${minute}`)
    // TODO Have this take in a UUID
    let _tmp = await API.newEvent(
      props.id,
      title,
      description,
      address,
      thedate
    );
    const e = events.slice();
    e.push({
      id: _tmp.data.id,
      title,
      address,
      date: thedate,
      description,
      rsvp: Array<MemberInfo>(),
      signin: Array<string>(),
      creator: "",
    });
    setEvents(e);
    setEventIndex(events.length);
    let id = "";
    setCurEvent({
      id,
      title,
      address,
      time,
      date,
      description,
    });
  };

  const editEvent = async (
    id: string,
    title: string,
    address: string,
    time: string,
    date: string,
    description: string
  ) => {
    if (events[eventIndex] !== undefined) {
      // let [month, day, year] = date.split("-").map((i) => parseInt(i));
      // let [hour, minute] = time.split(":").map((i) => parseInt(i));
      // let thedate = new Date(year, month - 1, day, hour - 5, minute);
      let [year, month, day] = date.split("-").map((i) => parseInt(i));
      let [hour, minute] = time.split(":").map((i) => parseInt(i));
      let thedate = new Date(year, month - 1, day, hour, minute);
      await API.updateEvent(id, title, description, address, thedate);
      const e = events.slice();
      e[eventIndex].title = title;
      e[eventIndex].address = address;
      e[eventIndex].date = thedate;
      e[eventIndex].description = description;
      setEvents(e);
      setCurEvent({
        id: events[eventIndex].id,
        title: events[eventIndex].title,
        address: events[eventIndex].address,
        time:
          events[eventIndex].date.getHours() +
          ":" +
          events[eventIndex].date.getMinutes(),
        date: events[eventIndex].date.getDate().toString(),
        description: events[eventIndex].description,
      });
    }
  };

  const removeEvent = async (i: number) => {
    if (events[i] !== undefined) {
      await API.deleteEvent(events[i].id);
      const e = events.slice();
      e.splice(i, 1);
      setEvents(e);
      setEventIndex(-1);
    }

    setCurEvent({
      id: "",
      title: "",
      address: "",
      time: "",
      date: "",
      description: "",
    });
  };

  return (
    <div className="MyEvents">
      <EmailModal
        showModal={showEmailModal}
        setShowModal={setShowEmailModal}
        members={
          events[eventIndex] !== undefined
            ? (events[eventIndex].rsvp as MemberInfo[])
            : null
        }
      />
      <EventEdit
        showModal={showEventEditModal}
        setShowModal={setShowEventEditModal}
        editEvent={editEvent}
        currentEvent={curEvent}
        setCurEvent={setCurEvent}
      />
      <EventMemberModal
        showModal={showEventMemberModal}
        setShowModal={setShowEventMemberModal}
        members={
          events[eventIndex] !== undefined
            ? (events[eventIndex].rsvp as MemberInfo[])
            : null
        }
        signin={
          events[eventIndex] !== undefined ? events[eventIndex].signin : null
        }
        eventid={
          events[eventIndex] !== undefined ? events[eventIndex].id : null
        }
        setReloadPage={setReload}
        reloadPage={checkReload}
      />
      <TransferManagerModal
        showModal={showTransferManagerModal}
        setShowModal={setShowTransferManagerModal}
        setReload={setReload}
        event={events[eventIndex] !== undefined ? events[eventIndex].id : null}
        reload={checkReload}
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
            event={emptyEvent}
            toggleEmailModal={toggleEmailModal}
            toggleEventEditModal={toggleEventEditModal}
            toggleEventMemberModal={toggleEventMemberModal}
            toggleTransferManagerModal={toggleTransferManagerModal}
            toggleConfirmationModal={toggleConfirmationModal}
          />
        ) : (
          <EventsForm
            event={events[eventIndex]}
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
