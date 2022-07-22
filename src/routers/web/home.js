import { Router } from 'express'
import { webAuth } from '../middleware/authmw.js'

import path from 'path'
import { fileURLToPath } from 'url';

const __dirname = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../views/');

const homeWebRouter = new Router()

homeWebRouter.get('/home', webAuth, (req, res) => {
    res.render('pages/home', {nombre: req.session.nombre});
})

export default homeWebRouter