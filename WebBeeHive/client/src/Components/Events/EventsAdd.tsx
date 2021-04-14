import React from "react";
import "../../CSS/Events/EventsAdd.css";

interface IProps {
  addEvent: (
    title: string,
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
    id: -1,
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
    setNewEvent({
      name: "",
      address: "",
      time: "",
      date: "",
      description: "",
      id: -1,
    });
  };

  const handleCancel = () => {
    setShowModal(!showModal);
    setNewEvent({
      name: "",
      address: "",
      time: "",
      date: "",
      description: "",
      id: -1,
    });
  };

  return (
    <div>
      {showModal ? (
        <div className="EventsAdd-Background">
          <div className="EventsAdd-AddFormDiv">
            <form className="EventsAdd-AddForm" onSubmit={handleSubmit}>
              <div className="EventsAdd-NameDiv">
                <label className="EventsAdd-NameLabel">Name</label>
                <input
                  className="EventsAdd-Name"
                  type="text"
                  id="name"
                  value={newEvent.name}
                  onChange={(e) =>
                    setNewEvent({
                      name: e.target.value,
                      address: newEvent.address,
                      time: newEvent.time,
                      date: newEvent.date,
                      description: newEvent.description,
                      id: newEvent.id,
                    })
                  }
                        required
                />
              </div>
              <div className="EventsAdd-AddressTimeDateDiv">
                <div className="EventsAdd-AddressTimeDateLabels">
                  <label className="EventsAdd-AddressLabel">Address</label>
                  <label className="EventsAdd-TimeLabel">Time</label>
                  <label className="EventsAdd-DateLabel">Date</label>
                </div>
                <div className="EventsAdd-AddressTimeDateInputs">
                  <input
                    className="EventsAdd-Address"
                    type="text"
                    id="address"
                    value={newEvent.address}
                    onChange={(e) =>
                      setNewEvent({
                        name: newEvent.name,
                        address: e.target.value,
                        time: newEvent.time,
                        date: newEvent.date,
                        description: newEvent.description,
                        id: newEvent.id,
                      })
                    }
                          required
                  />
                  <input
                    className="EventsAdd-Time"
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
                        id: newEvent.id,
                      })
                    }
                          required
                  />
                  <input
                    className="EventsAdd-Date"
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
                        id: newEvent.id,
                      })
                    }
                          required
                  />
                </div>
              </div>
              <div className="EventsAdd-DescriptionDiv">
                <label className="EventsAdd-DescriptionLabel">
                  Description
                </label>
                <textarea
                  className="EventsAdd-Description"
                  aria-multiline
                  id="description"
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({
                      name: newEvent.name,
                      address: newEvent.address,
                      time: newEvent.time,
                      date: newEvent.date,
                      description: e.target.value,
                      id: newEvent.id,
                    })
                  }
                />
              </div>
              <div className="EventsAdd-BtnDiv">
                <button className="EventsAdd-CancelBtn" onClick={handleCancel}>
                  Cancel
                </button>
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
