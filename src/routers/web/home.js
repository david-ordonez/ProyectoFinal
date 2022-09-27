import { Router } from 'express';
import { webAuth } from '../middleware/authmw.js';

const homeWebRouter = new Router();

homeWebRouter.get('/home', webAuth, (req, res) => {
    res.render('pages/home', {nombre: req.session.nombre});
});

export default homeWebRouter;