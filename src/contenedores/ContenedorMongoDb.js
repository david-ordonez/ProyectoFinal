import mongoose from 'mongoose'
import config from '../config.js'

class ContenedorMongoDb {

    constructor(schema){
        await mongoose.connect(config.mongodb.url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        }) ;

        this.model = schema;
    }

    async guardar(item) {
        return await this.model.create(item);
    }

    async listar(id) {
        return await this.model.find({id: `${id}`});
    }

    async listarAll() {
        return await this.model.find({});
    }

    async borrar(id) {
        return await this.model.deleteOne({id: `${id}`});
    }

    async borrarAll() {
        return await this.model.deleteMany({});
    }

    async actualizar(id, item){
        return await this.model.findOneAndUpdate({id: `${id}`}, item, { new: true });
    }    
}

export default ContenedorMongoDb