import mongoose from 'mongoose'
import config from '../config.js'

class ContenedorMongoDb {

    constructor(modelSchema){
        mongoose.connect(config.mongodb.mongoUrl) ;

        this.modelSchema = modelSchema;
    }

    async guardar(item) {
        return await this.modelSchema.create(item);
    }

    async listar(id) {
        return await this.modelSchema.find({id: `${id}`});
    }

    async listarAll() {
        return await this.modelSchema.find({});
    }

    async borrar(id) {
        return await this.modelSchema.deleteOne({id: `${id}`});
    }

    async borrarAll() {
        return await this.modelSchema.deleteMany({});
    }

    async actualizar(id, item){
        return await this.modelSchema.findOneAndUpdate({id: `${id}`}, item, { new: true });
    }    
}

export default ContenedorMongoDb