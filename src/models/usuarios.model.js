import mongoose from 'mongoose';

const collection = 'usuarios';

export const schema = mongoose.Schema({
    _id: { type: String, required: true },
    email: {type: String, required: true, max: 15},
    password: {type: String, required: true, max: 255},
    nombre: {type: String, required: true, max: 50},
    direccion: {type: String, required: true, max: 255},
    telefono: {type: String, required: true, max: 20},
    foto: {type: String}
    //avatar: String
});

export const User = mongoose.model(collection, schema);