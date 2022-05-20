import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js"
import config from '../../config.js'

class ProductosDaoArchivo extends ContenedorArchivo {
    constructor() {
        super(config.fileSystem.dbFolder + 'productos.json');
    }
}

export default ProductosDaoArchivo
