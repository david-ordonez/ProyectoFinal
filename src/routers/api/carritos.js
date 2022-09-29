import { Router } from 'express';
import ControladorCarritos from '../../controllers/carritos.js';


const carritoRouter = new Router();
const controladorCarritos = new ControladorCarritos();


carritoRouter.get('/', controladorCarritos.getCarritos);
carritoRouter.get('/:id', controladorCarritos.getCarrito);
carritoRouter.post('/', controladorCarritos.guardarCarrito);
carritoRouter.delete('/:id', controladorCarritos.borrarCarrito);
carritoRouter.get('/:id/productos', controladorCarritos.getProductosFromCarrito);
carritoRouter.post('/:id/productos', controladorCarritos.addProductosToCarrito);
carritoRouter.delete('/:id/productos/:id_prod', controladorCarritos.borrarProductosFromCarrito);


export default carritoRouter;