const express = require('express');
const cors = require('cors');

// Routes setup
const users = require('./routes/users.js');

// Setting stuff up
const app = express();
app.use( cors());
app.use(express.json())

// DB setup
const db_config = require('./config/keys.js');


// Routing
app.use('/api/users', users);

const port = process.env.PORT || 4200;

app.listen(port, () => console.log(`Server started at ${port}`));

console.log("feck");
