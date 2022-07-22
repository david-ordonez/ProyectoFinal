import mongoose from 'mongoose';

const User = mongoose.model('usuarios', {
    username: String,
    password: String,
    nombre: String,
    direccion: String,
    fechaNac: Date,
    telefono: String,
    avatar: String
});

export default User;