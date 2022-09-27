import fm from '../utils/filemanager.js';

class ContenedorArchivo {
    constructor(ruta) {
        this.ruta = ruta;
    }

    async guardar(item) {
        try {
            const items = await fm.readFile(this.ruta);
            const ultimoId = items.length > 0 ? items[items.length - 1].id : 0;
            const nuevoId = ultimoId + 1;

            const newItem = {...item,id: nuevoId, timestamp: Date.now() };

            items.push(newItem);
            
            await fm.saveFile(this.ruta,JSON.stringify(items,null,2));

            return newItem;

        } catch (error) {
            console.log(error);
        }
    }

    async listar(id) {
        try {
            const items = await fm.readFile(this.ruta);
            return items.find(element => element.id === id);
        } catch (error) {
            console.log(error);
        }
    }

    async listarAll() {
        const items = await fm.readFile(this.ruta);
        return items;       
    }

    async borrar(id) {
        try {
            const items = await fm.readFile(this.ruta);
            const filterItems = items.filter(element => element.id !== id);            
            await fm.saveFile(this.ruta,JSON.stringify(filterItems,null,2));
        } catch (error) {
            console.log(error);
        }
    }

    async borrarAll() {
        try {
            await fm.saveFile(this.ruta, '');
        } catch (error) {
            console.log(error);
        }
    }

    async actualizar(id, item){
        try {
            const items = await fm.readFile(this.ruta);
            const oldItemIndex = items.findIndex(element => element.id === id);
            if(oldItemIndex == -1 ) 
                throw new Error('Elemento no encontrado');
            
            const oldItem = items[oldItemIndex];
            
            Object.keys(oldItem).forEach(key => {
                // eslint-disable-next-line no-prototype-builtins
                if(item.hasOwnProperty(key))
                    oldItem[key] = item[key];
            });

            await fm.saveFile(this.ruta,JSON.stringify(items,null,2));
            return oldItem;
            
        } catch (error) {
            console.log(error);
        }
    }    
}

export default ContenedorArchivo;