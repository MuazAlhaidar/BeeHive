import * as React from "react";


// export default function AddEvent(){
// export default const AddEvent: React.FC = () => {
function AddEvent(){
    const [name, setName] = React.useState("");
    const [Description, setDescription] = React.useState("");
    const [Address, setAddress] = React.useState("");
    const [Date, setDate] = React.useState("");
    const [Time, setTime] = React.useState("");
    const [AuthorID, setAuthorID] = React.useState("");

    const handleSubmit = (evt:any) => {
	evt.preventDefault();
	console.log( 
	    {
	    name:{name}.name,
	    Description:{Description}.Description,
	    Address:{Address}.Address,
	    Date:{Date}.Date,
	    Time:{Time}.Time,
	    AuthorID:{AuthorID}.AuthorID,
	    }
	)
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

		    <label> AuthorID </label><br/>
		    <input type="text" id="AuthorID" value={AuthorID} onChange={e => setAuthorID(e.target.value)} /><br/>

		    <input type="submit" value="Submit" />
		    </form> 

		    </div>
    )
}
export default class EventPage extends React.Component{
	render(){
		return <h1> I am your Turbo Lover! </h1>
	}
}
