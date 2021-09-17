const { Socket } = require('socket.io');
const {io} = require('../index');
// Sockets messages 

var totems = [
    {
        "id":1,
        "socket_id":'',
        "name":'totem1',
        "stream":false,//nos indica que hizo una solicitud
        "state":false//nos indica que el totem funciona
    },
    {
        "id":2,
        "socket_id":'',
        "name":'totem2',
        "stream":false,
        "state":false
    }
]

var server = {
    
    "socket_id":'',
    "name":'server',//nos indica que hizo una solicitud
    "state":false//nos indica que el totem funciona
}
io.on('connection', (client) => {

    //cuando un cliente se conecta
    console.log('Client logged in', client.id);
    
    //cuando un cliente de desconecta
    client.on('disconnect', () => {
        console.log('Client logged out disconnect', client.id)
        bsq_totem = totems.find( totem => totem.socket_id === client.id )
        if(bsq_totem)   {
            bsq_totem.socket_id='';
            bsq_totem.stream=false;
            bsq_totem.state=false;
            console.log('--------- desconectado -----',client.id)
            console.log(totems)
        }else{
            server['socket_id']=''
            server['state']=false
            console.log('SERVE logged out disconnect', server)
        }

        
       
    });
    
    client.on('totem_register', (totem_name)=>{
        
        totems[totem_name.id]['socket_id']=totem_name.socket_id;
        totems[totem_name.id]['name']=totem_name.name;
        totems[totem_name.id]['state']=true;
        client.emit('register_ok');
        console.log('LOG:SERVER:TOTEMS->',totems);
    })

    client.on('socket:server', (data)=>{
        //cargo
        server['socket_id']=data
        server['state']=true
        console.log(server);
        for (const clave in totems) {
            // console.log('---------inicia----------------')
            
             console.log("clave->",totems[clave])
            // console.log("---------------------------------");
            // console.log(io.to(totems[clave]).emit('connected'))
            io.emit('response:activity:stream',totems[clave]);
        }
    })
    client.on('sos:server', (data)=>{
        console.log(data.name);
        bsq_totem = totems.find( totem => totem.name === data.name )
        if(bsq_totem){
           
            bsq_totem.stream=true;
           
        }
        io.emit('sos:server',data)
    })

    client.on('solved', (totem_name)=>{
        io.emit('solved2',totem_name)
        bsq_totem = totems.find( totem => totem.name === totem_name )
        if(bsq_totem){
           
            bsq_totem.stream=false;
           
        }
        
    })
    //creoo una funcion para recorrer los array conectados
    
    client.on('totem_conectados', ()=>{
        console.log('totem_conectados');
        io.emit('totem_conectados',totems)
    })
    client.on('totem:response', (data)=>{
        console.log("activo",data);
        // tomo el valor del totem name y le asigno el id de cliente
        // totems[totem_name] = client.id;
        //
        //client.emit('register_ok');
        // console.log(totems);
    })

    setInterval(() => {
      

            for (const clave in totems) {
                // console.log('---------inicia----------------')
                
                // console.log("clave->",totems[clave])
                // console.log("---------------------------------");
                // console.log(io.to(totems[clave]).emit('connected'))
                io.emit('response:activity',totems[clave]);
            }

      
    }, 10000);

});