const {io} = require('../index');

// Sockets messages 
io.on('connection', (client) => {
    
    //cuando un cliente se conecta
    console.log('Client logged in', client.id);
    datos = {
        id:client.id,
        name:'Com.1',
        message:'Se inicio apertura de camara.'
    }
    io.emit('sos:server',datos)

    //cuando un cliente de desconecta
    client.on('disconnect', () => {
        console.log('Client logged out', client.id)
    });
  
    //cuando el cliente envia un dato
    client.on('message-from-client', (payload) =>{
        
        console.log('New message:');
        console.log('From: ' + payload['name']);
        console.log('Message: ' + payload['message']);
        console.log('.===========================.');
        io.emit('message-from-client',payload)
    });
    
    

});