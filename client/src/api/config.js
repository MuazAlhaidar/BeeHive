// import firebase from "firebase/app";
const Fire = require("firebase-app")
const config = {
  apiKey: 'AIzaSyBzNPS44siWEPbps4VelmGvi-SPkd6MNCk',
  projectId: 'beehive-6cba8',
};
Fire.initializeApp(config);
module.exports = {Fire}
// export {firebase}
