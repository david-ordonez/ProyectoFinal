import mongoose from "mongoose";

const collection = 'mensajes';

export const schema = mongoose.Schema({
    _id: { type: String, required: true },
    email: {type: String, required: true, max: 50},
    tipo: {type: String, required: true, max: 10, enum:['usuario','sistema']},
    fecha: {type: Date, required: true},
    cuerpo: {type: String, required: true, max: 255}
});

export const Mensajes = mongoose.model(collection, schema);