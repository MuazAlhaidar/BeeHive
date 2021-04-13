import React from "react";
import "../../CSS/Events/EventsEdit.css";

interface IProps {
  showModal: boolean;
  currentEvent: {
    id: string;
    title: string;
    address: string;
    time: string;
    date: string;
    description: string;
  };
  setCurEvent: (curEvent: {
    id: string;
    title: string;
    address: string;
    time: string;
    date: string;
    description: string;
  }) => void;
  setShowModal: (showModal: boolean) => void;
  editEvent: (
    id: string,
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
  currentEvent,
  setCurEvent,
}: IProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editEvent(
      currentEvent.id,
      currentEvent.title,
      currentEvent.address,
      currentEvent.time,
      currentEvent.date,
      currentEvent.description
    );
    setShowModal(!showModal);
  };

  const handleCancel = () => {
    setShowModal(!showModal);
  };
  let tmpdate = currentEvent.date.replaceAll("/", "-");
  let [month, day, year] = tmpdate.split("-");
  let senddate = `${year}-${month}-${day}`;

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
                  value={currentEvent.title}
                  onChange={(e) =>
                    setCurEvent({
                      id: currentEvent.id,
                      title: e.target.value,
                      address: currentEvent.address,
                      time: currentEvent.time,
                      date: currentEvent.date,
                      description: currentEvent.description,
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
                    value={currentEvent.address}
                    onChange={(e) =>
                      setCurEvent({
                        id: currentEvent.id,
                        title: currentEvent.title,
                        address: e.target.value,
                        time: currentEvent.time,
                        date: currentEvent.date,
                        description: currentEvent.description,
                      })
                    }
                  />
                  <input
                    className="EventEdit-Time"
                    type="time"
                    id="time"
                    value={currentEvent.time}
                    onChange={(e) =>
                      setCurEvent({
                        id: currentEvent.id,
                        title: currentEvent.title,
                        address: currentEvent.address,
                        time: e.target.value,
                        date: currentEvent.date,
                        description: currentEvent.description,
                      })
                    }
                  />
                  <input
                    className="EventEdit-Date"
                    type="date"
                    id="date"
                    value={senddate}
                    onChange={(e) =>
                      setCurEvent({
                        id: currentEvent.id,
                        title: currentEvent.title,
                        address: currentEvent.address,
                        time: currentEvent.time,
                        date: e.target.value,
                        description: currentEvent.description,
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
                  value={currentEvent.description}
                  onChange={(e) =>
                    setCurEvent({
                      id: currentEvent.id,
                      title: currentEvent.title,
                      address: currentEvent.address,
                      time: currentEvent.time,
                      date: currentEvent.date,
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
