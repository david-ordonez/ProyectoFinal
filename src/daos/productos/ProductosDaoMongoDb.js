import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js"
import * as model from '../models/producto.js'

class ProductosDaoMongoDb extends ContenedorMongoDb {
    
    constructor() {
        super(model.producto);
    }
}

export default ProductosDaoMongoDb
