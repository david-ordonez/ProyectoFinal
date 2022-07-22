import { Router } from 'express';
import { productosDao as productos } from '../../daos/index.js'
import { apiAuth } from '../middleware/authmw.js';

const productosRouter = new Router();

productosRouter.get('/', async (req, res) => {
    res.send(await productos.getAll());
})

productosRouter.get('/:id',async (req, res) => {
    const id = parseInt(req.params.id);
    const producto = await productos.getById(id)
    if(producto)
        return res.send(producto);

    res.status(404).send({ error: 'Producto no encontrado' });
})

productosRouter.post('/', apiAuth, async (req, res) => {
    const newProducto = req.body;
    if (newProducto){
        const item = await productos.save(newProducto)
        return res.send(item);
    }

    res.status(400).send({ error: 'Error al agregar' })
})

productosRouter.put('/:id', apiAuth, async (req, res) => {
    const id = parseInt(req.params.id);
    const nuevoProducto = req.body;
    const producto = await productos.getById(id)
    if (producto)
        return res.send(await productos.update(id, nuevoProducto));
    res.status(404).send({ error: 'Producto no encontrado' });
})

productosRouter.delete('/:id', apiAuth,async (req, res) => {
    const id = parseInt(req.params.id);
    const producto = await productos.getById(id)
    if (producto)
        return res.send(await productos.DeleteById(id));

    res.status(404).send({ error: 'Producto no encontrado' });
})

export default productosRouter;