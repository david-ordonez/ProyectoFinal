import mensajesApi from '../../api/mensajes.js';
import { normalizarMensajes } from '../../normalizacion/index.js';

export default async function configurarSocket(socket, sockets) {
    socket.emit('listaMensajes',await mensajesApi.listarAll());
    socket.on('nuevoMensaje', async nuevoMensaje => {
        await mensajesApi.guardar(nuevoMensaje);

        const listaMensajes = await mensajesApi.listarAll();  
        const normalizedData = normalizarMensajes(listaMensajes);


        sockets.emit('listaMensajes',{ normalizedData } );
    });    
}
