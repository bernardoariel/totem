const { Socket } = require('socket.io');
const {io} = require('../index');

//variables y array
time_refresh = 1000000;
var totems = [
    {
        "id":1,
        "socket_id":'',
        "name":'totem1',
        "stream":false,//nos indica que hizo una solicitud
        "state":false,//nos indica que el totem funciona
        "nameTotem":'t1',
        "adressTotem":'junin 444',
        "camaraIpTotem":'66.0.151.1',
        "cameraPressetNro":'nro1',
        "emergencyNumber":'1009'
    },
    {
        "id":2,
        "socket_id":'',
        "name":'totem2',
        "stream":false,
        "state":false,
        "nameTotem":'t2',
        "adressTotem":'las heras',
        "camaraIpTotem":'4000.',
        "cameraPressetNro":'nr3',
        "emergencyNumber":'1006'
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
            // bsq_totem.stream=false;
            bsq_totem.state=false;
        }else{
            //si server 'socketid' tiene valor
            //cierro esa pestaña del navegador a partir del socketid
            // y tomo los valores nuevos
            server['socket_id']=''
            server['state']=false
            console.log('SERVE logged out disconnect', server)
        }

    });
    //registro los totems que se conectan
    client.on('socket:totem_register', (totem_name)=>{
        totems[totem_name.id]['socket_id']=totem_name.socket_id;
        totems[totem_name.id]['name']=totem_name.name;
        totems[totem_name.id]['state']=true;
        // client.emit('totem:register_ok');
        // console.log('LOG:SERVER:TOTEMS->',totems);
    })
    //registro los datos del //server
    client.on('socket:server', (id_server)=>{
        /* if(server['socket_id'].length > 0 && id_server == server['socket_id']){
            //elimino el server anterior
            io.emit('server:die',id_server)
        } */

            //cargo los datos del servidor
            server['socket_id']=id_server
            server['state']=true

        console.log({server})
    })
    //recibo el pedido de video 
    client.on('socket:sos', (data)=>{
        console.log(data.name);
        bsq_totem = totems.find( totem => totem.name === data.name )
        if(bsq_totem){
            bsq_totem.stream=true;
        }
        //envio el video al servidor
        io.emit('server:sos',data)
    })
    //recibo 'RESUELTO del Server
    client.on('socket:solved', (totem_name)=>{
        //lo envio al cliente
        io.emit('totem:solved',totem_name)
        
        bsq_totem = totems.find( totem => totem.name === totem_name )
        if(bsq_totem){
           
           bsq_totem.stream=false;
           
        }
        
    })
    //consulta de los totems desde el server
    client.on('socket:totem_conectados', ()=>{
        io.emit('server:totem_conectados',totems)
    })
    //consulta de los totems desde el server
    client.on('socket:config', (datos)=>{
        console.log('socket:config',datos)
        bsq_totem = totems.find( totem => totem.name === datos.name)
        console.log("bsq_totem",bsq_totem)
        if(bsq_totem)   {

            bsq_totem['nameTotem']=datos.nameTotem
            bsq_totem['adressTotem']=datos.adressTotem
            bsq_totem['camaraIpTotem']=datos.camaraIpTotem
            bsq_totem['cameraPressetNro']=datos.cameraPressetNro
            bsq_totem['emergencyNumber']=datos.emergencyNumber
            console.log('SOCKET:CONFIGURADO EL TOTEM',bsq_totem)
        }
    })
    //controlo los state cada cierto tiempo
    setInterval(() => {
        //compruebo los estados y envio a response:activity
        for (const clave in totems) {
            
            io.emit('server:activity',totems);
        }
        console.log('server:activity')
    }, time_refresh);

});