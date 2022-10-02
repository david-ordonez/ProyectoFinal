import config from '../config.js';
import { sendMail } from '../utils/mail.js';
import { ordenesDao as ordenes } from '../daos/index.js';

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
        const newOrder = await this.ordenesDao.save(orden);
        if(newOrder){
            await sendMail(config.mailAdmin, JSON.stringify(newOrder));
        }
    }

    async updateOrden(id, orden){
        return await this.ordenesDao.update(id, orden);
    }

    async deleteOrden(id){
        return await this.ordenesDao.deleteById(id);
    }

}