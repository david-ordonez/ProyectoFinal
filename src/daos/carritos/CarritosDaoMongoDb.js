import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js";
import * as model from '../models/carrito.js'

class CarritosDaoMongoDb extends ContenedorMongoDb {
    constructor() {
        super(model.carrito);
    }
}

export default CarritosDaoMongoDb
