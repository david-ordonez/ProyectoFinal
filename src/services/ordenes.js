import { ordenesDao as ordenes } from "../daos/index.js";

export default class ServiciosOrdenes{
    constructor() {
        this.ordenesDao = ordenes;
    }

    async getOrdenes(){
        return await this.ordenesDao.getAll();
    }

    async getOrdenById(id){
        return await this.ordenesDao.getById(id);
    }

    async saveOrden(orden){
        return await this.ordenesDao.save(orden);
    }

    async updateOrden(id, orden){
        return await this.ordenesDao.update(id, orden);
    }

    async deleteOrden(id){
        return await this.ordenesDao.deleteById(id);
    }

}