import React, { useState } from "react";
import "../CSS/Group.css";
import LogoAndTitle from "../Components/LogoAndTitle";
import { group } from "console";
import "../Components/groupList";

function AddGroup(props: { userid: string; sendevent: any }) {
  const [name, setName] = React.useState("");

  const handleSubmit = (evt: any) => {
    evt.preventDefault();
    props.sendevent({ name }.name);
    // TODO create a function to pass the data above to a event class
    // To be appended to a table
  };

  return (
    <div>
      <h1> Send 'me The Group</h1>
      <form onSubmit={handleSubmit}>
        <label> Event Name </label>
        <input
          type="text"
          id="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />

        {/* <label> AuthorID </label><br/> */}
        {/* <input type="text" id="AuthorID" value={AuthorID} onChange={e => setAuthorID(e.target.value)} /><br/> */}

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

function ChangeGroup(props: { Group: any; sendEdit: any }) {
  const [name, setName] = React.useState("");

  const handleSubmit = (evt: any) => {
    evt.preventDefault();
    // props.sendevent({name}.name, {Description}.Description, {Address}.Address, {Date}.Date, {Time}.Time)
    // TODO create a function to pass the data above to a event class
    // To be appended to a table
    console.log("FUCK", { name }.name);
    props.sendEdit({ name }.name);
  };

  return (
    <div>
      <h1> Nice </h1>
      <form onSubmit={handleSubmit}>
        <table>
          <tr>
            <th>
              {" "}
              <label>
                {" "}
                Event Name<b>:</b>{" "}
              </label>
            </th>
            <th>
              {" "}
              <label> {props.Group.name} </label>
            </th>
            <th>
              {" "}
              <input
                type="text"
                id="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />{" "}
            </th>
          </tr>
          <tr>
            <input type="submit" value="Change Entry?" />
          </tr>
        </table>
      </form>
    </div>
  );
}

type GroupType = {
  name: string;
};

function ViewEvents(props: {
  Groups: any;
  DeleteGroup: any;
  showEditGroup: any;
}) {
  return (
    <div>
      {props.Groups.map((group: GroupType, id: number) => (
        <tr>
          <th>
            <button onClick={() => props.DeleteGroup(id)}>
              {" "}
              Delete Group{" "}
            </button>
          </th>
          <th>
            <button onClick={() => props.showEditGroup(id)}>
              {" "}
              Edit Event{" "}
            </button>
          </th>
          <th> {group.name} </th>
        </tr>
      ))}
    </div>
  );
}

type MyProps = {
  // using `interface` is also ok
  groupName: string;
};

export default class GroupPage extends React.Component<
  MyProps,
  { groups: any; edit: boolean; curEditId: number }
> {
  constructor(public props: MyProps) {
    super(props);
    this.state = {
      groups: [
        {
          name: "Good Group",
        },
        {
          name: "Bad Group",
        },
      ],
      edit: false,
      curEditId: -1,
    };
  }
  getNewGroup(name: string) {
    this.state.groups.push({ name });
    this.setState({ groups: this.state.groups });
  }
  deleteGroup(id: number) {
    alert(
      "Email people goign to event " +
        this.state.groups[id].name +
        " about the event's cancelilation"
    );
    this.state.groups.splice(id, 1);
    this.setState({ groups: this.state.groups });
  }
  showEditGroup(id: number) {
    let currEvent = this.state.groups[id];
    if (id == this.state.curEditId) {
      this.setState({ edit: !this.state.edit });
      this.setState({ curEditId: -1 });
    } else {
      this.setState({ edit: true });
      this.setState({ curEditId: id });
    }
  }

  EditEvent(name: string) {
    this.state.groups[this.state.curEditId] = {
      name,
    };
    console.log("ROCK", this.state.groups);
    this.setState({ groups: this.state.groups });
  }
  render() {
    console.log(this.state.curEditId, this.state.edit);
    return (
      <div>
        {this.state.edit ? (
          <div>
            <h1>
              {" "}
              This is a prototype {this.state.curEditId} {this.state.edit}{" "}
            </h1>
            <ChangeGroup
              Group={this.state.groups[this.state.curEditId]}
              sendEdit={this.EditEvent.bind(this)}
            />
          </div>
        ) : null}
        <AddGroup
          userid={this.props.groupName}
          sendevent={this.getNewGroup.bind(this)}
        />
        <ViewEvents
          Groups={this.state.groups}
          DeleteGroup={this.deleteGroup.bind(this)}
          showEditGroup={this.showEditGroup.bind(this)}
        />
      </div>
    );
  }
}
