import React from "react";
import "../../CSS/Events/EventsEdit.css";

interface IProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

function EventEdit({ showModal, setShowModal }: IProps) {
  const [curEvent, setCurEvent] = React.useState({
    name: "",
    address: "",
    time: "",
    date: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(!showModal);
    setCurEvent({ name: "", address: "", time: "", date: "", description: "" });
  };

  const handleCancel = () => {
    setShowModal(!showModal);
    setCurEvent({ name: "", address: "", time: "", date: "", description: "" });
  };

  return (
    <div>
      {showModal ? (
        <div className="EventEdit-Background">
          <div className="EventEdit-EditFormDiv">
            <form className="EventEdit-EditForm" onSubmit={handleSubmit}>
              <div className="EventEdit-NameDiv">
                <input
                  className="EventEdit-Name"
                  placeholder="Name"
                  type="text"
                  id="name"
                  value={curEvent.name}
                  onChange={(e) =>
                    setCurEvent({
                      name: e.target.value,
                      address: curEvent.address,
                      time: curEvent.time,
                      date: curEvent.date,
                      description: curEvent.description,
                    })
                  }
                />
              </div>
              <div className="EventEdit-AddressTimeDateDiv">
                <input
                  className="EventsAdd-Address"
                  placeholder="Address"
                  type="text"
                  id="address"
                  value={curEvent.address}
                  onChange={(e) =>
                    setCurEvent({
                      name: curEvent.name,
                      address: e.target.value,
                      time: curEvent.time,
                      date: curEvent.date,
                      description: curEvent.description,
                    })
                  }
                />
                <input
                  className="EventEdit-Time"
                  placeholder="Time"
                  type="time"
                  id="time"
                  value={curEvent.time}
                  onChange={(e) =>
                    setCurEvent({
                      name: curEvent.name,
                      address: curEvent.address,
                      time: e.target.value,
                      date: curEvent.date,
                      description: curEvent.description,
                    })
                  }
                />
                <input
                  className="EventEdit-Date"
                  placeholder="Date"
                  type="date"
                  id="date"
                  value={curEvent.date}
                  onChange={(e) =>
                    setCurEvent({
                      name: curEvent.name,
                      address: curEvent.address,
                      time: curEvent.time,
                      date: e.target.value,
                      description: curEvent.description,
                    })
                  }
                />
              </div>
              <div className="EventEdit-DescriptionDiv">
                <textarea
                  className="EventEdit-Description"
                  placeholder="Description"
                  aria-multiline
                  id="description"
                  value={curEvent.description}
                  onChange={(e) =>
                    setCurEvent({
                      name: curEvent.name,
                      address: curEvent.address,
                      time: curEvent.time,
                      date: curEvent.date,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="EventEdit-BtnDiv">
                <button className="EventEdit-CancelBtn" onClick={handleCancel}>
                  Cancel
                </button>
                <input
                  className="EventEdit-UpdateBtn"
                  type="submit"
                  value="Update"
                />
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default EventEdit;
