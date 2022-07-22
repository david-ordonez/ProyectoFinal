import mongoose from 'mongoose'
import config from '../config.js'

class ContenedorMongoDb {

    constructor(modelSchema){
        mongoose.connect(config.mongodb.mongoUrl) ;

        this.modelSchema = modelSchema;
    }

    async save(item) {
        return await this.modelSchema.create(item);
    }

    async getById(id) {
        return await this.modelSchema.find({id: `${id}`});
    }

    async getAll() {
        return await this.modelSchema.find({});
    }

    async deleteById(id) {
        return await this.modelSchema.deleteOne({id: `${id}`});
    }

    async deleteAll() {
        return await this.modelSchema.deleteMany({});
    }

    async update(id, item){
        return await this.modelSchema.findOneAndUpdate({id: `${id}`}, item, { new: true });
    }    
}

export default ContenedorMongoDb