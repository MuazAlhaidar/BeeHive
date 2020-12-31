import React from "react";
import "../../CSS/Events/EventsAdd.css";

interface IProps {
  addEvent: (
    name: string,
    address: string,
    time: string,
    date: string,
    description: string
  ) => void;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

function EventAdd({ addEvent, showModal, setShowModal }: IProps) {
  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [time, setTime] = React.useState("");
  const [date, setDate] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEvent(name, address, time, date, description);
    setShowModal(!showModal);
  };

  return (
    <div>
      {showModal ? (
        <div className="EventsAdd-Background">
          <div className="EventsAdd-AddForm">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  placeholder="Name"
                  type="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="address">Address</label>
                <input
                  placeholder="Address"
                  type="address"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="time">Time</label>
                <input
                  placeholder="Time"
                  type="time"
                  id="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="date">Date</label>
                <input
                  placeholder="Date"
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <input
                  placeholder="Description"
                  type="description"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <input
                  className="EventsAdd-AddBtn"
                  type="submit"
                  value="Submit"
                />
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default EventAdd;
