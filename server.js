const express = require('express');
const app = express();

const droneRouter = require('./src/drones/routes');
const camerasRouter = require('./src/cameras/routes');
const usersRouter = require('./src/users/routes');

const port = 3000;

const BASE_URL = '/api/v1';

app.use(express.json());

app.get(`/`, (req, res) => {
    res.send('Pix4d API');
});

app.use(`${BASE_URL}/drones`, droneRouter);
app.use(`${BASE_URL}/cameras`, camerasRouter);
app.use(`${BASE_URL}/users`, usersRouter);

app.listen(port, () => `Listen on port ${port}...`);

/**
 * What you need for execute this code:
 * 
 * postgresql cli (psql), node
 * 
 * Commands:
 * 
 * Copy and paste in psql in order the code inside database.sql
 * Modify db.js with your local postgres credential
 * Run the code with "node ./server.js"
 * 
 * Inside ./src/drones/route you can find some comments and code documentation
 */