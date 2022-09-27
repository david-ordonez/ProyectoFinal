import ServiciosCarritos from '../services/carritos.js';

export default class ControladorCarritos {
    constructor() {
        this.ServiciosCarritos = new ServiciosCarritos();
    }

    getCarritos = async(req,res) => {
        try {
            const carritos = await this.ServiciosCarritos.getCarritos();
            res.send(carritos);
        } catch (error) {
            res.status(500).json({ error: error.message });
            throw error;
        }
    };

    getCarrito = async(req,res) => {
        try {
            const id = req.params.id;
            const carrito = await this.Servicioscarritos.getCarritoById(id);
            res.send(carrito);
        } catch (error) {
            res.status(500).json({ error: error.message });
            throw error;
        }
    };

    guardarCarrito = async (req,res) => {
        try {
            const carrito = req.body;
            const carritoGuardado = this.Servicioscarritos.saveCarrito(carrito);
            res.json(carritoGuardado);
        } catch (error) {
            console.log('error al guardar productos', error);
            res.status(500).json({ error: error.message });
        }
    };

    borrarCarrito = async(req,res) => {
        try {
            const id = req.params.id;
            await this.Servicioscarritos.deleteCarrito(id);
            res.send();
        } catch (error) {
            res.status(500).json({ error: error.message });
            throw error;
        }
    };
}