import knex from 'knex';

class ContenedorSQL {
    constructor(config, tabla) {
        this.knex = knex(config);
        this.tabla = tabla;
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

export default ContenedorSQL;