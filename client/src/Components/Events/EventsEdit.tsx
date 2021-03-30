import React from "react";
import "../../CSS/Events/EventsEdit.css";

interface IProps {
  showModal: boolean;
  curEvent: {
    title: string;
    address: string;
    time: string;
    date: string;
    description: string;
  };
  setCurEvent: (curEvent: {
    title: string;
    address: string;
    time: string;
    date: string;
    description: string;
  }) => void;
  setShowModal: (showModal: boolean) => void;
  editEvent: (
    title: string,
    address: string,
    time: string,
    date: string,
    description: string
  ) => void;
}

function EventEdit({
  showModal,
  setShowModal,
  editEvent,
  curEvent,
  setCurEvent,
}: IProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editEvent(
      curEvent.title,
      curEvent.address,
      curEvent.time,
      curEvent.date,
      curEvent.description
    );
    setShowModal(!showModal);
  };

  const handleCancel = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      {showModal ? (
        <div className="EventEdit-Background">
          <div className="EventEdit-EditFormDiv">
            <form className="EventEdit-EditForm" onSubmit={handleSubmit}>
              <div className="EventEdit-NameDiv">
                <label className="EventEdit-NameLabel">Name</label>
                <input
                  className="EventEdit-Name"
                  type="text"
                  id="name"
                  value={curEvent.title}
                  onChange={(e) =>
                    setCurEvent({
                      title: e.target.value,
                      address: curEvent.address,
                      time: curEvent.time,
                      date: curEvent.date,
                      description: curEvent.description,
                    })
                  }
                />
              </div>
              <div className="EventEdit-AddressTimeDateDiv">
                <div className="EventEdit-AddressTimeDateLabels">
                  <label className="EventEdit-AddressLabel">Address</label>
                  <label className="EventEdit-TimeLabel">Time</label>
                  <label className="EventEdit-DateLabel">Date</label>
                </div>
                <div className="EventEdit-AddressTimeDateInputs">
                  <input
                    className="EventEdit-Address"
                    type="text"
                    id="address"
                    value={curEvent.address}
                    onChange={(e) =>
                      setCurEvent({
                        title: curEvent.title,
                        address: e.target.value,
                        time: curEvent.time,
                        date: curEvent.date,
                        description: curEvent.description,
                      })
                    }
                  />
                  <input
                    className="EventEdit-Time"
                    type="time"
                    id="time"
                    value={curEvent.time}
                    onChange={(e) =>
                      setCurEvent({
                        title: curEvent.title,
                        address: curEvent.address,
                        time: e.target.value,
                        date: curEvent.date,
                        description: curEvent.description,
                      })
                    }
                  />
                  <input
                    className="EventEdit-Date"
                    type="date"
                    id="date"
                    value={curEvent.date}
                    onChange={(e) =>
                      setCurEvent({
                        title: curEvent.title,
                        address: curEvent.address,
                        time: curEvent.time,
                        date: e.target.value,
                        description: curEvent.description,
                      })
                    }
                  />
                </div>
              </div>
              <div className="EventEdit-DescriptionDiv">
                <label className="EventEdit-DescriptionLabel">
                  Description
                </label>
                <textarea
                  className="EventEdit-Description"
                  aria-multiline
                  id="description"
                  value={curEvent.description}
                  onChange={(e) =>
                    setCurEvent({
                      title: curEvent.title,
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
