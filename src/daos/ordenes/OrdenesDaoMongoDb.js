import ContenedorMongoDb from '../../contenedores/ContenedorMongoDb.js';
import * as model from '../../models/index.js';

class OrdenesDaoMongoDb extends ContenedorMongoDb {
    
    constructor() {
        super(model.Ordenes);
    }
}

export default OrdenesDaoMongoDb;
