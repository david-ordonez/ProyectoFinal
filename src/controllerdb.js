import mongoose from 'mongoose';

// eslint-disable-next-line no-unused-vars
let baseDeDatosConectada;

export function conectarDB(url, cb) {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
        if (!err) {
            baseDeDatosConectada = true;
        } 
        
        if (cb != null) {
            cb(err);
        }
    });
}
