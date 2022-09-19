import mongoose from "mongoose";

const collection = 'productos';

export const schema = mongoose.Schema({
    _id: { type: String, required: true },
    nombre: {type: String, required: true, max: 100},
    descripcion: {type: String, required: true, max: 100},
    precio: {type: mongoose.Decimal128, required: true},
    categoria: {type: String, required: true, max: 20},
    foto: {type: String, required: true}
});

export const Productos = mongoose.model(collection, schema);