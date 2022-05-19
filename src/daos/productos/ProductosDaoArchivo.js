import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js"

class ProductosDaoArchivo extends ContenedorArchivo {
    constructor() {
        super(config.fileSystem.dbFolder + 'productos.json');
    }
}

export default ProductosDaoArchivo
