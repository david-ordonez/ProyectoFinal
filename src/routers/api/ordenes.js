import { Router } from 'express';
import ControladorOrdenes from '../../controllers/ordenes.js';
import { apiAuth } from '../middleware/authmw.js';

const ordenesRouter = new Router();
const ordenesController = new ControladorOrdenes();

ordenesRouter.get('/', ordenesController.getOrdenes);
ordenesRouter.get('/:id', ordenesController.getOrden);
ordenesRouter.post('/', apiAuth, ordenesController.guardarOrden);
ordenesRouter.put('/:id', apiAuth, ordenesController.actualizarOrden);
ordenesRouter.delete('/:id', ordenesController.borrarOrden);

export default ordenesRouter;