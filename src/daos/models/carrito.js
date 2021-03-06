import mongoose from "mongoose";
import * as model from './producto.js';

const carritosCollection = 'carrito';

const carritosSchema = new mongoose.Schema({
    productos: [model.productoSchema]
});

export const carrito = mongoose.model(carritosCollection, carritosSchema);