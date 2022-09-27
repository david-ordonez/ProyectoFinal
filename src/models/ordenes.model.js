import mongoose from 'mongoose';

const collection = 'ordenes';

const schemaItems = mongoose.Schema({ 
    nombre: {type: String, required: true, max: 100},
    cantidad: Number
});

export const schema = mongoose.Schema({
    _id: { type: String, required: true },
    numeroOrden: {type: Number, required: true},
    fecha: {type: Date, required: true},
    estado: {type: String, required: true, max: 10},
    email: {type: String, required: true, max: 50},
    items: [schemaItems]
});

export const Ordenes = mongoose.model(collection, schema);