const fm = require('../util/filemanager');

class Contenedor {
    constructor(fileName) {
        this._fileName = fileName;
    }

    async save(item) {
        try {
            const items = await fm.readFile(this._fileName);
            const ultimoId = items.length > 0 ? items[items.length - 1].id : 0;
            const nuevoId = ultimoId + 1;

            const newItem = {...item,id: nuevoId, timestamp: Date.now() };

            items.push(newItem);
            
            await fm.saveFile(this._fileName,JSON.stringify(items,null,2));

            return newItem;

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