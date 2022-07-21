import mongoose from "mongoose";

const productosCollection = 'productos';

export const productoSchema = new mongoose.Schema({
    nombre: {type: String, required: true, max: 100},
    descripcion: {type: String, required: true, max: 100},
    codigo: {type: String, required: true, max: 20},
    foto: {type: String, required: true},
    precio: {type: mongoose.Decimal128, required: true},
    stock: {type: Number, default: 0}
});

export const producto = mongoose.model(productosCollection, productoSchema);