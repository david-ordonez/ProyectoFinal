import { productosDao as productos } from '../daos/index.js';

export default class ServiciosProductos {
    constructor(){
        this.productosDao = productos;
    }

    async getProductos(){
        return await this.productosDao.getAll();
    }

    async getProductoById(id){
        return await this.productosDao.getById(id);
    }

    async saveProducto(producto){
        return await this.productosDao.save(producto);
    }

    async updateProducto(id, producto){
        return await this.productosDao.update(id,producto);
    }

    async deleteProducto(id){
        return await this.productosDao.deleteById(id);
    }
}