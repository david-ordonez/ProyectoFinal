import ContenedorFirebase from "../../contenedores/ContenedorFirebase.js"
import config from '../../config.js'
class CarritosDaoFirebase extends ContenedorFirebase {
    constructor() {
        super(config.firebase.databaseURL, 'carrito')
    }

}

export default CarritosDaoFirebase
