import * as React from "react";


// export default function AddEvent(){
// export default const AddEvent: React.FC = () => {
// function AddEvent(props:{userid:string, sendevent:()=>void}){
function AddEvent(props:{userid:string, sendevent:any}){
    const [name, setName] = React.useState("");
    const [Description, setDescription] = React.useState("");
    const [Address, setAddress] = React.useState("");
    const [Date, setDate] = React.useState("");
    const [Time, setTime] = React.useState("");

    const handleSubmit = (evt:any) => {
	    evt.preventDefault();
	    props.sendevent({name}.name, {Description}.Description, {Address}.Address, {Date}.Date, {Time}.Time)
	    // TODO create a function to pass the data above to a event class
	    // To be appended to a table
    }

    return (
	    <div>
		    <h1> Send 'me The Event</h1>
		    <form onSubmit={handleSubmit} >
			    <label> Event Name </label><br/>
			    <input type="text" id="Name" value={name} onChange={e => setName(e.target.value)} /><br/>

			    <label> Description </label><br/>
			    <input type="text" id="Description" value={Description} onChange={e => setDescription(e.target.value)} /><br/>

			    <label> Address </label><br/>
			    <input type="text" id="Address" value={Address} onChange={e => setAddress(e.target.value)} /><br/>

			    <label> Date </label><br/>
			    <input type="text" id="Date" value={Date} onChange={e => setDate(e.target.value)} /><br/>

			    <label> Time </label><br/>
			    <input type="text" id="Time" value={Time} onChange={e => setTime(e.target.value)} /><br/>

			    {/* <label> AuthorID </label><br/> */}
			    {/* <input type="text" id="AuthorID" value={AuthorID} onChange={e => setAuthorID(e.target.value)} /><br/> */}

			    <input type="submit" value="Submit" />
		    </form> 

	    </div>
    )
}

// export default function AddEvent(){
// export default const AddEvent: React.FC = () => {
// function AddEvent(props:{userid:string, sendevent:()=>void}){
function AddEvent(props:{userid:string, sendevent:any}){
    const [name, setName] = React.useState("");
    const [Description, setDescription] = React.useState("");
    const [Address, setAddress] = React.useState("");
    const [Date, setDate] = React.useState("");
    const [Time, setTime] = React.useState("");

    const handleSubmit = (evt:any) => {
	    evt.preventDefault();
	    props.sendevent({name}.name, {Description}.Description, {Address}.Address, {Date}.Date, {Time}.Time)
	    // TODO create a function to pass the data above to a event class
	    // To be appended to a table
    }

    return (
	    <div>
		    <h1> Send 'me The Event</h1>
		    <form onSubmit={handleSubmit} >
			    <label> Event Name </label><br/>
			    <input type="text" id="Name" value={name} onChange={e => setName(e.target.value)} /><br/>

			    <label> Description </label><br/>
			    <input type="text" id="Description" value={Description} onChange={e => setDescription(e.target.value)} /><br/>

			    <label> Address </label><br/>
			    <input type="text" id="Address" value={Address} onChange={e => setAddress(e.target.value)} /><br/>

			    <label> Date </label><br/>
			    <input type="text" id="Date" value={Date} onChange={e => setDate(e.target.value)} /><br/>

			    <label> Time </label><br/>
			    <input type="text" id="Time" value={Time} onChange={e => setTime(e.target.value)} /><br/>

			    {/* <label> AuthorID </label><br/> */}
			    {/* <input type="text" id="AuthorID" value={AuthorID} onChange={e => setAuthorID(e.target.value)} /><br/> */}

			    <input type="submit" value="Submit" />
		    </form> 

	    </div>
    )
}

type EventType={ name:string, description:string, address:string, date:string, time:string};

// function ViewEvents(Events:[EventType]){
function ViewEvents(props:{Events:any, DeleteEvents:any, editEvent:any}){
	return(
		<div>
			{
				props.Events.map((event:EventType, id:number) =>(
				<tr> 
					<th><button onClick={() =>props.DeleteEvents(id)}>  Delete Event </button></th>
					<th><button onClick={() =>props.editEvent(id)}>  Edit Event </button></th>
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

export default class EventPage extends React.Component<MyProps, {events:any, edit:boolean}>{
	constructor(public props:MyProps){
		super(props);
		this.state ={events:[
			{name:"muaz roasting event", description:"we gonna roast him so bad", address:"eel street", date:"everyday", time:"12:61" }
			,{name:"yea yea yea yea!", description:"smoke weed everyday", address:"zaki's house", date:"every saturday", time:"04:20" }
		],
		edit:false
		};
	}
	getNewEvent(name:string, description:string, address:string, date:string, time:string){
		this.state.events.push({name, description, address, date, time});
		this.setState({events: this.state.events});
	}

	deleteEvent(id:number){
		alert("Email people goign to event " +  this.state.events[id].name + " about the event's cancelilation");
		this.state.events.splice(id,1);
		this.setState({events: this.state.events});
	}

	editEvent(id:number){
		let currEvent = this.state.events[id];
		this.setState({edit:true});
	}



	render(){
		return <div>
			{this.state.edit ? <h1> Rocka hola! </h1> : null}
			<AddEvent userid={this.props.userid} sendevent={this.getNewEvent.bind(this)}/>
			<ViewEvents  Events={this.state.events} DeleteEvents={this.deleteEvent.bind(this)} editEvent={this.editEvent.bind(this)}  />

		</div>
	}
}
