import * as React from "react";

// export default function AddEvent(){
// export default const AddEvent: React.FC = () => {
// function AddEvent(props:{userid:string, sendevent:()=>void}){
function AddEvent(props: { userid: string; sendevent: any }) {
  const [name, setName] = React.useState("");
  const [Description, setDescription] = React.useState("");
  const [Address, setAddress] = React.useState("");
  const [Date, setDate] = React.useState("");
  const [Time, setTime] = React.useState("");

  const handleSubmit = (evt: any) => {
    evt.preventDefault();
    props.sendevent(
      { name }.name,
      { Description }.Description,
      { Address }.Address,
      { Date }.Date,
      { Time }.Time
    );
    // TODO create a function to pass the data above to a event class
    // To be appended to a table
  };

  return (
    <div>
      <h1> Add Event</h1>
      <form onSubmit={handleSubmit}>
        <label> Event Name </label>
        <br />
        <input
          type="text"
          id="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />

        <label> Description </label>
        <br />
        <input
          type="text"
          id="Description"
          value={Description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />

        <label> Address </label>
        <br />
        <input
          type="text"
          id="Address"
          value={Address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <br />

        <label> Date </label>
        <br />
        <input
          type="text"
          id="Date"
          value={Date}
          onChange={(e) => setDate(e.target.value)}
        />
        <br />

        <label> Time </label>
        <br />
        <input
          type="text"
          id="Time"
          value={Time}
          onChange={(e) => setTime(e.target.value)}
        />
        <br />

        {/* <label> AuthorID </label><br/> */}
        {/* <input type="text" id="AuthorID" value={AuthorID} onChange={e => setAuthorID(e.target.value)} /><br/> */}

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

// export default function AddEvent(){
// export default const AddEvent: React.FC = () => {
// function AddEvent(props:{userid:string, sendevent:()=>void}){
// TODO put correct event type
function ChangeEvent(props: { Event: any; sendEdit: any }) {
  const [Name, setName] = React.useState("");
  const [Description, setDescription] = React.useState("");
  const [Address, setAddress] = React.useState("");
  const [Date, setDate] = React.useState("");
  const [Time, setTime] = React.useState("");

  const handleSubmit = (evt: any) => {
    evt.preventDefault();
    // props.sendevent({name}.name, {Description}.Description, {Address}.Address, {Date}.Date, {Time}.Time)
    // TODO create a function to pass the data above to a event class
    // To be appended to a table
    console.log(
      "FUCK",
      { Name }.Name,
      { Description }.Description,
      { Address }.Address,
      { Date }.Date,
      { Time }.Time
    );
    props.sendEdit(
      { Name }.Name,
      { Description }.Description,
      { Address }.Address,
      { Date }.Date,
      { Time }.Time
    );
  };

  return (
    <div>
      <h1> Edit Event </h1>
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
              <label> {props.Event.name} </label>
            </th>
            <th>
              {" "}
              <input
                type="text"
                id="Name"
                value={Name}
                onChange={(e) => setName(e.target.value)}
              />{" "}
            </th>
          </tr>

          <tr>
            <th>
              {" "}
              <label> Description </label>{" "}
            </th>
            <th>
              {" "}
              <label> {props.Event.description}</label>{" "}
            </th>
            <th>
              {" "}
              <input
                type="text"
                id="Description"
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
              />{" "}
            </th>
          </tr>

          <tr>
            <th>
              {" "}
              <label> Address </label>{" "}
            </th>
            <th>
              {" "}
              <label> {props.Event.address}</label>{" "}
            </th>
            <th>
              {" "}
              <input
                type="text"
                id="Address"
                value={Address}
                onChange={(e) => setAddress(e.target.value)}
              />{" "}
            </th>
          </tr>

          <tr>
            <th>
              {" "}
              <label> Date </label>{" "}
            </th>
            <th>
              {" "}
              <label> {props.Event.date}</label>{" "}
            </th>
            <th>
              {" "}
              <input
                type="text"
                id="Date"
                value={Date}
                onChange={(e) => setDate(e.target.value)}
              />{" "}
            </th>
          </tr>

          <tr>
            <th>
              {" "}
              <label> Time </label>{" "}
            </th>
            <th>
              {" "}
              <label> {props.Event.time}</label>{" "}
            </th>
            <th>
              {" "}
              <input
                type="text"
                id="Time"
                value={Time}
                onChange={(e) => setTime(e.target.value)}
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

type EventType = {
  name: string;
  description: string;
  address: string;
  date: string;
  time: string;
};

// function ViewEvents(Events:[EventType]){
function ViewEvents(props: {
  Events: any;
  DeleteEvents: any;
  showEditEvent: any;
}) {
  return (
    <div>
      {props.Events.map((event: EventType, id: number) => (
        <tr>
          <th>
            <button onClick={() => props.DeleteEvents(id)}>
              {" "}
              Delete Event{" "}
            </button>
          </th>
          <th>
            <button onClick={() => props.showEditEvent(id)}>
              {" "}
              Edit Event{" "}
            </button>
          </th>
          <th> {event.name} </th>
          <th> {event.description} </th>
          <th> {event.address} </th>
          <th> {event.date} </th>
          <th> {event.time} </th>
        </tr>
      ))}
    </div>
  );
}

type MyProps = {
  // using `interface` is also ok
  userid: string;
};

export default class EventPage extends React.Component<
  MyProps,
  { events: any; edit: boolean; curEditId: number }
> {
  constructor(public props: MyProps) {
    super(props);
    this.state = {
      events: [
        {
          name: "HR event",
          description: "employee engagement",
          address: "3525 walnut",
          date: "december 5th",
          time: "12:61",
        },
        {
          name: "IT event",
          description: "Employee learning",
          address: "63542 everything",
          date: "every saturday",
          time: "04:20",
        },
      ],
      edit: false,
      curEditId: -1,
    };
  }
  getNewEvent(
    name: string,
    description: string,
    address: string,
    date: string,
    time: string
  ) {
    this.state.events.push({ name, description, address, date, time });
    this.setState({ events: this.state.events });
  }

  deleteEvent(id: number) {
    alert(
      "Email people goign to event " +
        this.state.events[id].name +
        " about the event's cancelilation"
    );
    this.state.events.splice(id, 1);
    this.setState({ events: this.state.events });
  }

  showEditEvent(id: number) {
    let currEvent = this.state.events[id];
    if (id == this.state.curEditId) {
      this.setState({ edit: !this.state.edit });
      this.setState({ curEditId: -1 });
    } else {
      this.setState({ edit: true });
      this.setState({ curEditId: id });
    }
  }

  EditEvent(
    name: string,
    description: string,
    address: string,
    date: string,
    time: string
  ) {
    this.state.events[this.state.curEditId] = {
      name,
      description,
      address,
      date,
      time,
    };
    console.log("ROCK", this.state.events);
    this.setState({ events: this.state.events });
  }

  render() {
    console.log(this.state.curEditId, this.state.edit);
    return (
      <div>
        {this.state.edit ? (
          <div>
            <h1>
              {" "}
              Rocka hola {this.state.curEditId} {this.state.edit}{" "}
            </h1>
            <ChangeEvent
              Event={this.state.events[this.state.curEditId]}
              sendEdit={this.EditEvent.bind(this)}
            />
          </div>
        ) : null}
        <AddEvent
          userid={this.props.userid}
          sendevent={this.getNewEvent.bind(this)}
        />
        <ViewEvents
          Events={this.state.events}
          DeleteEvents={this.deleteEvent.bind(this)}
          showEditEvent={this.showEditEvent.bind(this)}
        />
      </div>
    );
  }
}
