import { Decimal128 } from "mongodb";
import mongoose from "mongoose";
import * as model from './producto.js';

const carritosCollection = 'carrito';

const carritosSchema = new mongoose.Schema({
    productos: [model.producto]
});

export const carrito = mongoose.model(carritosCollection, carritosSchema);