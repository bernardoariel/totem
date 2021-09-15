const express = require('express');
const path = require('path');
const app = express();
const publicPath = path.resolve(__dirname, 'public');
require('dotenv').config();

// Midleware
app.set('view engine', 'ejs')
app.set('views',__dirname + '/views')
// Public path
app.use(express.static(publicPath));
// console.log(publicPath);
app.get('/:id',(req,res)=>{
    valorId=req.params.id
    res.render('index',{totem: valorId})
})
app.get('/:id/server', (req, res) => {
    res.render('server',{comisaria: 4045})
});

// app.get('/:id/video', (req, res) => {
//     res.sendFile(__dirname + '/sos1.mp4');
// });


// Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');


server.listen(process.env.PORT, (err) => {

    if (err) throw new Error(err);

    console.log('Server running on port', 3000);

});