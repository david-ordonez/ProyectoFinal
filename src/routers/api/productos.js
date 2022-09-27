import { Router } from 'express';
import ControladorProductos from '../../controllers/productos.js';
import { apiAuth } from '../middleware/authmw.js';

const productosRouter = new Router();
const productosController = new ControladorProductos();

productosRouter.get('/', productosController.getProductos);
productosRouter.get('/:id', productosController.getProducto);
productosRouter.post('/', apiAuth, productosController.guardarProducto);
productosRouter.put('/:id', apiAuth, productosController.actualizarProducto);
productosRouter.delete('/:id', productosController.borrarProducto);

export default productosRouter;