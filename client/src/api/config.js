const firebase = require("firebase/app")
const config = {
  apiKey: 'AIzaSyBzNPS44siWEPbps4VelmGvi-SPkd6MNCk',
  projectId: 'beehive-6cba8',
};
firebase.initializeApp(config);
module.exports = {firebase}

