const Fire = require("firebase/app");
const config = {
  apiKey: "AIzaSyBzNPS44siWEPbps4VelmGvi-SPkd6MNCk",
  projectId: "beehive-6cba8",
};
Fire.default.initializeApp(config);
module.exports = { Fire };
