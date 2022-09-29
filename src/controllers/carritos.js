
import ServiciosCarritos from '../services/carritos.js';

export default class ControladorCarritos {
    constructor() {
        this.ServiciosCarritos = new ServiciosCarritos();
    }

    getCarritos = async (req, res) => {
        try {
            const carritos = await this.ServiciosCarritos.getCarritos();
            res.send(carritos);
        } catch (error) {
            res.status(500).json({ error: error.message });
            throw error;
        }
    };

    getCarrito = async (req, res) => {
        try {
            const id = req.params.id;
            const carrito = await this.Servicioscarritos.getCarritoById(id);
            res.send(carrito);
        } catch (error) {
            res.status(500).json({ error: error.message });
            throw error;
        }
    };

    guardarCarrito = async (req, res) => {
        try {
            const carrito = req.body;
            const carritoGuardado = this.Servicioscarritos.saveCarrito(carrito);
            res.json(carritoGuardado);
        } catch (error) {
            console.log('error al guardar productos', error);
            res.status(500).json({ error: error.message });
        }
    };

    borrarCarrito = async (req, res) => {
        try {
            const id = req.params.id;
            await this.Servicioscarritos.deleteCarrito(id);
            res.send();
        } catch (error) {
            res.status(500).json({ error: error.message });
            throw error;
        }
    };

    getProductosFromCarrito = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const carrito = await this.Servicioscarritos.getCarritoById(id);
            if (carrito) {
                return res.send(carrito.items);
            }
            res.status(404).send({ error: 'Carrito no encontrado' });
        } catch (error) {
            res.status(500).json({ error: error.message });
            throw error;
        }
    };

    addProductosToCarrito = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const carritoReq = await this.Servicioscarritos.getCarritoById(id);
            if (carritoReq) {
                carritoReq.items.push(req.body);
                const updCarrito = await this.Servicioscarritos.updateCarrito(id, carritoReq);
                return res.send(updCarrito);
            }
            res.status(404).send({ error: 'Carrito no encontrado' });
        } catch (error) {
            res.status(500).json({ error: error.message });
            throw error;
        }
    };

    borrarProductosFromCarrito = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const carritoReq = await this.Servicioscarritos.getById(id);
            if (carritoReq) {
                const id_prod = parseInt(req.params.id_prod);
                const filteredProductos = carritoReq.productos.filter(
                    (element) => element.id !== id_prod
                );
                carritoReq.productos = filteredProductos;
                const updCarrito = await this.Servicioscarritos.updateCarrito(id, carritoReq);
                return res.send(updCarrito);
            }
            res.status(404).send({ error: 'Carrito no encontrado' });
        } catch (error) {
            res.status(500).json({ error: error.message });
            throw error;
        }
    };
}