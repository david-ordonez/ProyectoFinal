import ContenedorArchivo from '../../contenedores/ContenedorArchivo.js';
import config from '../../config.js';

class CarritosDaoArchivo extends ContenedorArchivo {
    constructor() {
        super(config.fileSystem.dbFolder + 'carrito.json');
    }
}

export default CarritosDaoArchivo;
