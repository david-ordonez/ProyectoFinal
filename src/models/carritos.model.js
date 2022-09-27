import mongoose from 'mongoose';

const collection = 'carritos';

const schemaItems = mongoose.Schema({ 
    nombre: {type: String, required: true, max: 100},
    cantidad: Number
});

export const schema = mongoose.Schema({
    _id: { type: String, required: true },
    email: {type: String, required: true, max: 50},
    fecha: {type: Date, required: true},
    direccion: {type: String, required: true, max: 255},
    items: [schemaItems]
});

export const Carritos = mongoose.model(collection, schema);