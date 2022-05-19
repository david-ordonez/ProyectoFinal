import admin from "firebase-admin"
import config from '../config.js'

class ContenedorFirebase {
    constructor(databaseURL, collection) {
        admin.initializeApp({
            credential: admin.credential.cert(config.cert),
            databaseURL: databaseURL
        });

        const db = admin.firestore();
        this.query = db.collection(collection);
    }

    async guardar(item) {
        let doc = this.query.doc(`${item.id}`);
        return await doc.create(item);
    }

    async listar(id) {
        const doc = this.query.doc(`${id}`);
        const item = await doc.get();
        const response = item.data();
        return response;
    }

    async listarAll() {
        const querySnapshot = await this.query.get();
        let docs = querySnapshot.docs;

        const response = docs.map(doc => ({
            id: doc.id,
            nombre: doc.data().nombre,
            dni: doc.data().dni,
        }));

        return response;
    }

    async borrar(id) {
        const doc = this.query.doc(`${id}`);
        let item = await doc.delete();
        return item;
    }

    async borrarAll() {
        return await this.query.from(this.tabla).del();
    }

    async actualizar(id, item){
        const doc = query.doc(`${id}`);
        let item = await doc.update(item)
    }    
}

export default ContenedorFirebase