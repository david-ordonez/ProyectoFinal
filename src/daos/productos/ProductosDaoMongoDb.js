import ContenedorMongoDb from '../../contenedores/ContenedorMongoDb.js';
import * as model from '../../models/index.js';

class ProductosDaoMongoDb extends ContenedorMongoDb {
    
    constructor() {
        super(model.Productos);
    }
}

export default ProductosDaoMongoDb;
