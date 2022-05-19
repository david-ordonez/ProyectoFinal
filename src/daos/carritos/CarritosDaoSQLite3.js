import ContenedorSQL from "../../contenedores/ContenedorSQL.js"


class CarritosDaoSQLite3 extends ContenedorSQL {
    constructor(){
        super('carrito');
    }
}

export default CarritosDaoSQLite3
