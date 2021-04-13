import React from "react";
import "../CSS/EmailModal.css";
import { email as sendEmail } from "../api/User";
import { MemberInfo } from "../Interfaces";

interface IProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  members: MemberInfo[] | null;
}

function EmailModal({ showModal, setShowModal, members }: IProps) {
  const [email, setEmail] = React.useState({
    subject: "",
    body: "",
  });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(!showModal);

    if (members === null) {
      alert("List of people to email to is empty");
    } else {
      sendEmail(members, email.subject, email.body);
    }
    setEmail({ subject: "", body: "" });
  };

  const handleCancel = () => {
    setShowModal(!showModal);
    setEmail({ subject: "", body: "" });
  };

  return (
    <div>
      {showModal ? (
        <div className="EmailModal-Background">
          <div className="EmailModal-FormDiv">
            <form className="EmailModal-Form" onSubmit={handleSend}>
              <div className="EmailModal-SubjectDiv">
                <label className="EmailModal-SubjectLabel">Subject</label>
                <input
                  className="EmailModal-Subject"
                  type="text"
                  id="subject"
                  value={email.subject}
                  onChange={(e) =>
                    setEmail({
                      subject: e.target.value,
                      body: email.body,
                    })
                  }
                />
              </div>
              <div className="EmailModal-BodyDiv">
                <label className="EmailModal-BodyLabel">Body</label>
                <textarea
                  className="EmailModal-Body"
                  aria-multiline
                  id="body"
                  value={email.body}
                  onChange={(e) =>
                    setEmail({
                      subject: email.subject,
                      body: e.target.value,
                    })
                  }
                />
              </div>
              <div className="EmailModal-BtnDiv">
                <button className="EmailModal-CancelBtn" onClick={handleCancel}>
                  Cancel
                </button>
                <input
                  className="EmailModal-SendBtn"
                  type="submit"
                  value="Send"
                />
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default EmailModal;
