import knex from 'knex'
import config from '../config.js'
import { asPOJO } from '../utils/objectUtils.js'

class ContenedorSQL {
    constructor(tabla) {
        this.knex = knex(config.sqlite3)
        this.tabla = tabla
    }

    async guardar(item) {
        return await this.knex.from(this.tabla).insert(item);
    }

    async listar(id) {
        return await this.knex.from(this.tabla).select('*').where('id',id);
    }

    async listarAll() {
        return await this.knex.from(this.tabla).select('*');
    }

    async borrar(id) {
        return await this.knex.from(this.tabla).where('id',id).del();
    }

    async borrarAll() {
        return await this.knex.from(this.tabla).del();
    }

    async actualizar(id, item){
        return await this.knex.from(this.tabla).where('id', id).update(item);
    }    
}

export default ContenedorSQL