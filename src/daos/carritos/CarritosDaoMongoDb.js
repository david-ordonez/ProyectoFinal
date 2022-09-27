import ContenedorMongoDb from '../../contenedores/ContenedorMongoDb.js';
import * as model from '../../models/index.js';

class CarritosDaoMongoDb extends ContenedorMongoDb {
    constructor() {
        super(model.Carritos);
    }
}

export default CarritosDaoMongoDb;
