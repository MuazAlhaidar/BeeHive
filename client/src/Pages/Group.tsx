import React from "react";
import "../CSS/Group.css";
import "../Components/Groups/GroupsList";

function AddGroup(props: { userid: string; sendevent: any }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [members, setMembers] = React.useState("");
  const handleSubmit = (evt: any) => {
    evt.preventDefault();
    props.sendevent(
      { name }.name,
      { description }.description,
      { members }.members
    );
    // TODO create a function to pass the data above to a event class
    // To be appended to a table
  };

  return (
    <div>
      <h1>Add Group</h1>
      <form className="Group-AddGroup" onSubmit={handleSubmit}>
        <label> Group Name </label>
        <input
          type="text"
          id="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />

        <label> Contact Info </label>
        <input
          type="text"
          id="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* <label> AuthorID </label><br/> */}
        {/* <input type="text" id="AuthorID" value={AuthorID} onChange={e => setAuthorID(e.target.value)} /><br/> */}
        <br />
        <label> Members </label>
        <input
          type="text"
          id="Members"
          value={members}
          onChange={(e) => setMembers(e.target.value)}
        />
        <br />
        <input className="Group-AddBtn" type="submit" value="Submit" />
      </form>
    </div>
  );
}

function ChangeGroup(props: { Group: any; sendEdit: any }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [members, setMembers] = React.useState("");
  const handleSubmit = (evt: any) => {
    evt.preventDefault();
    // props.sendevent({name}.name, {Description}.Description, {Address}.Address, {Date}.Date, {Time}.Time)
    // TODO create a function to pass the data above to a event class
    // To be appended to a table
    console.log("FUCK", { name }.name, { description }.description);
    props.sendEdit(
      { name }.name,
      { description }.description,
      { members }.members
    );
  };

  return (
    <div>
      <h1> Edit Group Information </h1>
      <div className="Group-EditGroupFormBox">
        <div className="Group-EditGroupForm">
          <form onSubmit={handleSubmit}>
            <table>
              <tr>
                <th>
                  {" "}
                  <label>
                    {" "}
                    Group Name<b>:</b>{" "}
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
                <th>
                  {" "}
                  <label> Contact Information: </label>{" "}
                </th>
                <th>
                  {" "}
                  <label> {props.Group.description}</label>{" "}
                </th>

                <th>
                  {" "}
                  <input
                    type="text"
                    id="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />{" "}
                </th>
              </tr>

              <tr>
                <th>
                  {" "}
                  <label> Members: </label>{" "}
                </th>
                <th>
                  {" "}
                  <label> {props.Group.members}</label>{" "}
                </th>

                <th>
                  {" "}
                  <input
                    type="text"
                    id="Members"
                    value={members}
                    onChange={(e) => setMembers(e.target.value)}
                  />{" "}
                </th>
              </tr>
              <tr>
                <input
                  className="Group-EditGroup"
                  type="submit"
                  value="Change Entry?"
                />
              </tr>
            </table>
          </form>
        </div>
      </div>
    </div>
  );
}

type GroupType = {
  name: string;
  description: string;
  members: string;
};

function ViewGroups(props: {
  Groups: any;
  DeleteGroup: any;
  showEditGroup: any;
}) {
  return (
    <div className="Group-GroupListBox">
      <div className="Group-GroupList">
        <div className="Group-GroupListLabels">
          <th>Name</th>
          <th>Contact</th>
          <th>Members</th>
        </div>
        {props.Groups.map((group: GroupType, id: number) => (
          <tr>
            <th>
              <button
                className="Group-DeleteGroup"
                onClick={() => props.DeleteGroup(id)}
              >
                {" "}
                Delete Group{" "}
              </button>
            </th>
            <th>
              <button
                className="Group-EditGroup"
                onClick={() => props.showEditGroup(id)}
              >
                {" "}
                Edit Group{" "}
              </button>
            </th>
            <div className="Group-GroupInfo">
              <th> {group.name} </th>
              <th> {group.description}</th>
              <th> {group.members}</th>
            </div>
          </tr>
        ))}
      </div>
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
          description: "777-777-7777",
          members: "Muaz, Omar",
        },
        {
          name: "Bad Group",
          description: "123-456-7890",
          members: "Kevin, Zaki",
        },
      ],
      edit: false,
      curEditId: -1,
    };
  }
  getNewGroup(name: string, description: string, members: string) {
    this.state.groups.push({ name, description, members });
    this.setState({ groups: this.state.groups });
  }
  deleteGroup(id: number) {
    alert(
      "Are you sure you would like to delete group " +
        this.state.groups[id].name +
        " ?"
    );
    this.state.groups.splice(id, 1);
    this.setState({ groups: this.state.groups });
  }
  showEditGroup(id: number) {
    if (id === this.state.curEditId) {
      this.setState({ edit: !this.state.edit });
      this.setState({ curEditId: -1 });
    } else {
      this.setState({ edit: true });
      this.setState({ curEditId: id });
    }
  }

  EditGroup(name: string, description: string, members: string) {
    this.state.groups[this.state.curEditId] = {
      name,
      description,
      members,
    };
    console.log("ROCK", this.state.groups);
    this.setState({ groups: this.state.groups });
  }
  render() {
    console.log(this.state.curEditId, this.state.edit);
    return (
      <div className="Group">
        {this.state.edit ? (
          <div>
            <ChangeGroup
              Group={this.state.groups[this.state.curEditId]}
              sendEdit={this.EditGroup.bind(this)}
            />
          </div>
        ) : null}
        <AddGroup
          userid={this.props.groupName}
          sendevent={this.getNewGroup.bind(this)}
        />
        <ViewGroups
          Groups={this.state.groups}
          DeleteGroup={this.deleteGroup.bind(this)}
          showEditGroup={this.showEditGroup.bind(this)}
        />
      </div>
    );
  }
}
