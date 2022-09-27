import ContenedorSQL from '../../contenedores/ContenedorSQL.js';
import config from '../../config.js';

class CarritosDaoMariaDb extends ContenedorSQL {
    constructor(){
        super(config.mariaDb, 'carrito');
    }
}

export default CarritosDaoMariaDb;
