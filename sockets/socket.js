const { Socket } = require('socket.io');
const {io} = require('../index');
// Sockets messages 

var totems = {}

io.on('connection', (client) => {
    // var reqUrl = document.getElementById('totem')
    //cuando un cliente se conecta
    console.log('Client logged in', client.id);
    

    //cuando un cliente de desconecta
    client.on('disconnect', () => {
        console.log('Client logged out', client.id)
    });
  
    //el servidor recibe el dato
    client.on('message-from-client', (payload) =>{
        
        console.log('New message:');
        console.log('From: ' + payload['name']);
        console.log('Message111: ' + payload['message']);
        console.log('.===========================.');
        io.emit('message-from-client',payload)
    });
    client.on('sos:server', (data)=>{
        io.emit('sos:server',data)
    })
    
    client.on('solved', (totem_name)=>{
        io.to(totems[totem_name]).emit('solved')
    })
    client.on('totem_register', (totem_name)=>{
        console.log("register");
        totems[totem_name] = client.id;
        client.emit('register_ok');
    })
    

});