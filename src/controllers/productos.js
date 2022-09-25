import ServiciosProductos from "../services/productos.js";

export default class ControladorProductos {
    constructor(){
        this.ServiciosProductos = new ServiciosProductos();
    }

    getProductos = async(req,res) => {
        try {
            const productos = await this.ServiciosProductos.getProductos();
            res.send(productos);
        } catch (error) {
            res.status(500).json({ error: error.message });
            throw error;
        }
    }

    getProducto = async(req,res) => {
        try {
            const id = req.params.id;
            const producto = await this.ServiciosProductos.getProductoById(id);
            res.send(producto);
        } catch (error) {
            res.status(500).json({ error: error.message });
            throw error;
        }
    }

    borrarProducto = async(req,res) => {
        try {
            const id = req.params.id;
            await this.ServiciosProductos.deleteProducto(id);
            res.send();
        } catch (error) {
            res.status(500).json({ error: error.message });
            throw error;
        }
    }

    guardarProducto = async (req,res) => {
        try {
            const producto = req.body;
            const productoGuardado = this.ServiciosProductos.saveProducto(producto);
            res.json(productoGuardado);
        } catch (error) {
            console.log('error al guardar productos', error);
            res.status(500).json({ error: error.message });
        }
    }

    actualizarProducto = async (req,res) => {
        try {
            const id = req.params.id;
            const producto = req.body;
            const productoGuardado = this.ServiciosProductos.updateProducto(id,producto);
            res.json(productoGuardado);
        } catch (error) {
            console.log('error al actualizar productos', error);
            res.status(500).json({ error: error.message });            
        }
    }
}