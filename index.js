const express = require('express');
const path = require('path');
require('dotenv').config();

// Express app
const app = express();

app.get('/server', (req, res) => {
    res.sendFile(__dirname + '/server/index.html');
});

app.get('/video', (req, res) => {
    res.sendFile(__dirname + '/server/sos1.mp4');
});
// Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');



// Public path
const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));


server.listen(process.env.PORT, (err) => {

    if (err) throw new Error(err);

    console.log('Server running on port', 3000);

});