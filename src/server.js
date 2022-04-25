const express = require('express');
const { Router } = express;
const Contenedor = require('./contenedor');

const app = express();
app.use(express.static('public'));

// router de productos y carrito
const productos = new Contenedor('productos.json');
const carrito = new Contenedor('carrito.json');

const productosRouter = new Router();
const carritoRouter = new Router();
productosRouter.use(express.json());
productosRouter.use(express.urlencoded({extended: true}));

// servidor
app.use('/api/productos', productosRouter);
app.use('/api/carrito', carritoRouter);

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
})
server.on("error", error => console.log(`Error en servidor ${error}`));

//RUTAS LLAMANDO A LOS METODOS DE LA CLASE

productosRouter.get('/', (req, res) => {
    res.send(productos.getAll());
})

productosRouter.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const producto = buscarProducto(id);
    if(producto)
        return res.send(producto);

    res.status(404).send({ error: 'Producto no encontrado' });
})

productosRouter.post('/', (req, res) => {
    const newProducto = req.body;
    if (newProducto)
        return res.send(productos.save(newProducto));

    res.status(400).send({ error: 'Error al agregar' })
})

productosRouter.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const nuevoProducto = req.body;
    if (buscarProducto(id))
        return res.send(productos.update(id, nuevoProducto));
    res.status(404).send({ error: 'Producto no encontrado' });
})

productosRouter.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (buscarProducto(id))
        return res.send(productos.DeleteById(id));

    res.status(404).send({ error: 'Producto no encontrado' });
})

const buscarProducto = (id) => {
    const producto = productos.getById(id)
    return producto;
}

/****************************End points de carrito    ************************************************* */
carritoRouter.get('/', (req, res) => {
    res.send(carrito.getAll());
})

carritoRouter.post('/', (req, res) => {
    const newCarrito = req.body;
    if (newCarrito)
        return res.send(carrito.save(newCarrito));

    res.status(400).send({ error: 'Error al agregar' })
})


carritoRouter.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (buscarCarrito(id))
        return res.send(carrito.DeleteById(id));

    res.status(404).send({ error: 'carrito no encontrado' });
})

carritoRouter.get('/:id/productos', (req, res) => {
    const id = parseInt(req.params.id);
    const carrito = buscarCarrito(id);
    if(carrito){
        res.send(carrito.productos);
    }
    res.status(404).send({ error: 'Carrito no encontrado' });
})

carritoRouter.post('/:id/productos', (req, res) => {
    const id = parseInt(req.params.id);

    const carritoReq = buscarCarrito(id);
    if(carrito && carrito.productos){
        const newProducto = buscarProducto(id)
        carritoReq.productos.push(newProducto)
        carrito.update(id, carritoReq);
    }
    res.status(404).send({ error: 'Producto no encontrado' });
})

carritoRouter.delete('/:id/productos/:id_prod', (req, res) => {
    const id = parseInt(req.params.id);
    if (buscarCarrito(id))
        return res.send(carrito.DeleteById(id));
    /*TODO: DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto*/
    res.status(404).send({ error: 'Producto no encontrado' });
})

const buscarCarrito = (id) => {
    const carrito = carrito.getById(id)
    return carrito;
}