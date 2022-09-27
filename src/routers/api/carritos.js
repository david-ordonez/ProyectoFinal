import { Router } from 'express';
import ControladorCarritos from '../../controllers/carritos.js';


const carritoRouter = new Router();
const controladorCarritos = new ControladorCarritos();


carritoRouter.get('/', controladorCarritos.getCarritos);
carritoRouter.get('/:id', controladorCarritos.getCarrito);
carritoRouter.post('/', controladorCarritos.guardarCarrito);
carritoRouter.delete('/:id', controladorCarritos.borrarCarrito);

carritoRouter.get('/:id/productos', async (req, res) => {
    const id = parseInt(req.params.id);
    const carrito = await carrito.getById(id);
    if (carrito) {
        return res.send(carrito.productos);
    }
    res.status(404).send({ error: 'Carrito no encontrado' });
});

carritoRouter.post('/:id/productos', async (req, res) => {
    const id = parseInt(req.params.id);
    const carritoReq = await carrito.getById(id);
    if (carritoReq && carritoReq.productos) {
        const newProducto = await productos.getById(id);
        carritoReq.productos.push(newProducto);
        return res.send(carrito.update(id, carritoReq));
    }
    res.status(404).send({ error: 'Producto no encontrado' });
});

carritoRouter.delete('/:id/productos/:id_prod', async (req, res) => {
    const id = parseInt(req.params.id);
    const carritoReq = await carrito.getById(id);
    if (carritoReq) {
        const id_prod = parseInt(req.params.id_prod);
        const filteredProductos = carritoReq.productos.filter(
            (element) => element.id !== id_prod
        );
        carritoReq.productos = filteredProductos;
        return res.send(await carrito.update(id, carritoReq));
    }

    res.status(404).send({ error: 'Carrito no encontrado' });
});


export default carritoRouter;