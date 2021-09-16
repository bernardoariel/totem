const { Socket } = require('socket.io');
const {io} = require('../index');
// Sockets messages 

var totems = [
    {
        "id":1,
        "socket_id":'',
        "name":'',
        "state":false
    },
    {
        "id":2,
        "socket_id":'',
        "name":'',
        "state":false
    }
]

io.on('connection', (client) => {

    //cuando un cliente se conecta
    console.log('Client logged in', client.id);
    
    //cuando un cliente de desconecta
    client.on('disconnect', () => {
        console.log('Client logged out disconnect', client.id)
        bsq_totem = totems.find( totem => totem.socket_id === client.id )
        if(bsq_totem)   {
            bsq_totem.socket_id='';
            bsq_totem.state=false;
            console.log('--------- desconectado -----',client.id)
            console.log(totems)
        }

       
    });
    
    client.on('totem_register', (totem_name)=>{
        
        totems[totem_name.id]['socket_id']=totem_name.socket_id;
        totems[totem_name.id]['name']=totem_name.name;
        totems[totem_name.id]['state']=true;
        client.emit('register_ok');
        console.log('LOG:SERVER:TOTEMS->',totems);
    })


    client.on('sos:server', (data)=>{
        io.emit('sos:server',data)
    })

    client.on('solved', (totem_name)=>{
        io.emit('solved2',totem_name)
        
    })
    
    client.on('totem:response', (data)=>{
        console.log("activo",data);
        // tomo el valor del totem name y le asigno el id de cliente
        // totems[totem_name] = client.id;
        //
        //client.emit('register_ok');
        // console.log(totems);
    })

    // setInterval(() => {
      

    //         for (const clave in totems) {
    //             console.log('---------inicia----------------')
                
    //             console.log("clave->",totems[clave])
    //             console.log("---------------------------------");
    //             // console.log(io.to(totems[clave]).emit('connected'))
    //             io.emit('response:activity',totems[clave]);
    //         }

      
    // }, 10000);

});