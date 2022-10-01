import ServiciosOrdens from '../services/ordenes.js';

export default class ControladorOrdenes {
    constructor(){
        this.ServiciosOrdens = new ServiciosOrdens();
    }

    getOrdenes = async(req,res) => {
        try {
            const ordenes = await this.ServiciosOrdens.getOrdenes();
            res.send(ordenes);
        } catch (error) {
            res.status(500).json({ error: error.message });
            throw error;
        }
    };

    getOrden = async(req,res) => {
        try {
            const id = req.params.id;
            const orden = await this.ServiciosOrdens.getOrdenById(id);
            res.send(orden);
        } catch (error) {
            res.status(500).json({ error: error.message });
            throw error;
        }
    };

    borrarOrden = async(req,res) => {
        try {
            const id = req.params.id;
            await this.ServiciosOrdens.deleteOrden(id);
            res.send();
        } catch (error) {
            res.status(500).json({ error: error.message });
            throw error;
        }
    };

    guardarOrden = async (req,res) => {
        try {
            const orden = req.body;
            const ordenGuardado = this.ServiciosOrdens.saveOrden(orden);
            res.json(ordenGuardado);
        } catch (error) {
            console.log('error al guardar ordenes', error);
            res.status(500).json({ error: error.message });
        }
    };

    actualizarOrden = async (req,res) => {
        try {
            const id = req.params.id;
            const orden = req.body;
            const ordenGuardado = this.ServiciosOrdens.updateOrden(id,orden);
            res.json(ordenGuardado);
        } catch (error) {
            console.log('error al actualizar ordenes', error);
            res.status(500).json({ error: error.message });            
        }
    };
}