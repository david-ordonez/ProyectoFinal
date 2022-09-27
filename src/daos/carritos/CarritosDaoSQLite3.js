import ContenedorSQL from '../../contenedores/ContenedorSQL.js';
import config from '../../config.js';


class CarritosDaoSQLite3 extends ContenedorSQL {
    constructor(){
        super(config.sqlite3,'carrito');
    }
}

export default CarritosDaoSQLite3;
