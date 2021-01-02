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
  const [newEvent, setNewEvent] = React.useState({
    name: "",
    address: "",
    time: "",
    date: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEvent(
      newEvent.name,
      newEvent.address,
      newEvent.time,
      newEvent.date,
      newEvent.description
    );
    setShowModal(!showModal);
    setNewEvent({ name: "", address: "", time: "", date: "", description: "" });
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
                  value={newEvent.name}
                  onChange={(e) =>
                    setNewEvent({
                      name: e.target.value,
                      address: newEvent.address,
                      time: newEvent.time,
                      date: newEvent.date,
                      description: newEvent.description,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="address">Address</label>
                <input
                  placeholder="Address"
                  type="address"
                  id="address"
                  value={newEvent.address}
                  onChange={(e) =>
                    setNewEvent({
                      name: newEvent.name,
                      address: e.target.value,
                      time: newEvent.time,
                      date: newEvent.date,
                      description: newEvent.description,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="time">Time</label>
                <input
                  placeholder="Time"
                  type="time"
                  id="time"
                  value={newEvent.time}
                  onChange={(e) =>
                    setNewEvent({
                      name: newEvent.name,
                      address: newEvent.address,
                      time: e.target.value,
                      date: newEvent.date,
                      description: newEvent.description,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="date">Date</label>
                <input
                  placeholder="Date"
                  type="date"
                  id="date"
                  value={newEvent.date}
                  onChange={(e) =>
                    setNewEvent({
                      name: newEvent.name,
                      address: newEvent.address,
                      time: newEvent.time,
                      date: e.target.value,
                      description: newEvent.description,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <input
                  placeholder="Description"
                  type="description"
                  id="description"
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({
                      name: newEvent.name,
                      address: newEvent.address,
                      time: newEvent.time,
                      date: newEvent.date,
                      description: e.target.value,
                    })
                  }
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
