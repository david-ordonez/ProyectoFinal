import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js"
import * as model from '../../models/productos.model.js'

class ProductosDaoMongoDb extends ContenedorMongoDb {
    
    constructor() {
        super(model.producto);
    }
}

export default ProductosDaoMongoDb
