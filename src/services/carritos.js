import { carritosDao as carritos } from '../daos/index.js';

export default class ServiciosCarritos {
    constructor(){
        this.carritosDao = carritos;
    }

    async getCarritos(){
        return await this.carritosDao.getAll();
    }

    async getCarritoById(id){
        return await this.carritosDao.getById(id);
    }

    async saveCarrito(Carrito){
        return await this.carritosDao.save(Carrito);
    }

    async updateCarrito(id, Carrito){
        return await this.carritosDao.update(id,Carrito);
    }

    async deleteCarrito(id){
        return await this.carritosDao.deleteById(id);
    }
}