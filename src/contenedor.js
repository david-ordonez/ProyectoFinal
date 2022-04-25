const fm = require('./filemanager');

class Contenedor {
    constructor(fileName) {
        this._fileName = fileName;
    }

    async save(item) {
        try {
            const products = await fm.readFile(this._fileName);
            const ultimoId = products.length > 0 ? products[products.length - 1].id : 0;
            const nuevoId = ultimoId + 1;

            const newProduct = {...item,id: nuevoId };

            products.push(newProduct);
            
            await fm.saveFile(this._fileName,JSON.stringify(products,null,2));

            return nuevoId;

        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const items = await fm.readFile(this._fileName);
            return items.find(element => element.id === id);
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            const items = await fm.readFile(this._fileName);
            return items;       
        } catch (error) {
            throw error;
        }
    }

    async deleteById(id) {
        try {
            const items = await fm.readFile(this._fileName);
            const filterItems = items.filter(element => element.id !== id);            
            await fm.saveFile(this._fileName,JSON.stringify(filterItems,null,2));
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAll() {
        try {
            const data = await fm.saveFile(this._fileName, '');
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, item){
        try {
            const oldItem = this.getById(id);
            Object.keys(oldItem).forEach(key => {
                if(item.hasOwnProperty(key))
                    oldItem[key] = item[key];
            });
            return oldItem;
            
        } catch (error) {
            
        }
    }
}

module.exports = Contenedor;