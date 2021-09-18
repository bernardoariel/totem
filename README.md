#Simple sockets server!

* Setup: npm install
* Run: npm run start:dev

#Url PAGE SERVER!
* http://localhost:3000/totems/server
# se envia un primer parametro que puede ser cualquier expresion
# y finaliza con server http://localhost:3000/:parametro/server
#Url PAGE TOTEM
http://localhost:3000/totem1
http://localhost:3000/totem2
# http://localhost:3000/:parametro/
#Variables y Arrays
* time_refresh => cantidad de segundo para revisar los totems
* totems => se ingresa los datos de los totems
#  {
#       "id":1, 
#       "socket_id":'', =>toma el valor que brinda la coneccion del socket.io
#       "name":'totem1', => le damos el nombre del totem que viene en la url
#       "stream":false, => nos indica si el totem esta trasmitiendo
#       "state":false => nos indica el estado del totem
#   }
* server
# "socket_id":'',
# "name":'server'
# "state":false