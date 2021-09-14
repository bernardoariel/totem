const {io} = require('../index');

// Sockets messages
io.on('connection', (client) => {
    
    console.log('Client logged in', client.id);

    client.on('disconnect', () => {
        console.log('Client logged out', client.id)
    });
    
    client.on('sos:message',(data)=>{
        console.log(data);
        client.emit('sos:server',data)
    })

    client.on('message', (payload) => { 
        console.log('Payload: ', payload)
        io.emit('message', {admin: 'New message!'})
    });

    client.on('new-message', (payload) => { 

        io.emit('new-message', payload); // emits to every client
        client.broadcast.emit('new-message', payload); // emits to every client except the one emiting
    });

    client.on('message-from-client', (payload) =>{
        
        console.log('New message:');
        console.log('From: ' + payload['name']);
        console.log('Message: ' + payload['message']);
        console.log('.===========================.');
        io.emit('message-from-client', payload);
       
    });

});