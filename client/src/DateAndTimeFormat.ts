import { EventInfo } from "./Interfaces";

function getFormattedDate(event: EventInfo) {
  // If a value is less than 10 then put a 0
  // in front of it

  try{
  let month =
    event.date.getMonth() + 1 < 10
      ? "0" + (event.date.getMonth() + 1)
      : event.date.getMonth() + 1;
  // we add +1 here because Firebase has
  // months indexed from 0-11 not 1-12

  let day =
    event.date.getDate() < 10
      ? "0" + event.date.getDate()
      : event.date.getDate();

  let year =
    event.date.getFullYear() < 10
      ? "0" + event.date.getFullYear()
      : event.date.getFullYear();
  console.log(`${month}/${day}/${year}`)
  return `${month}/${day}/${year}`;
  }
  catch(e){
          console.log(event.title, event.date)
          return "wow/this/sucks"
  }

}

function getFormattedTime(event: EventInfo) {
  // If a value is less than 10 then put a 0
  // in front of it

  try{
  let hour =
    event.date.getHours() < 10
      ? "0" + event.date.getHours()
      : event.date.getHours();
  let minute =
    event.date.getMinutes() < 10
      ? "0" + event.date.getMinutes()
      : event.date.getMinutes();

  return `${hour}:${minute}`;
  }
  catch(e){
          console.log(e)
          return "this/sucks"
  }
}

export { getFormattedDate, getFormattedTime };
