const express = require('express');
const { Router } = express;
const Contenedor = require('./contenedor');

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// router de productos y carrito
const productos = new Contenedor('productos.json');
const carrito = new Contenedor('carrito.json');
const isAdmin = false;

const productosRouter = new Router();
const carritoRouter = new Router();


function verificarAdmin(req, res, next){
    if(isAdmin)
        next();
    else
        res.status(401).send({
            error: -1,
            descripcion: `La ruta ${req.baseUrl} metodo ${req.method} no implementada`
        });
}

// servidor
app.use('/api/productos', productosRouter);
app.use('/api/carrito', carritoRouter);

app.use((req, res, next) => {
    res.status(404).send({
        error: -2,
        descripcion: `La ruta ${req.originalUrl} metodo ${req.method} no implementada`
    });
});

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
})
server.on("error", error => console.log(`Error en servidor ${error}`));

//RUTAS LLAMANDO A LOS METODOS DE LA CLASE

productosRouter.get('/', async (req, res) => {
    res.send(await productos.getAll());
})

productosRouter.get('/:id',async (req, res) => {
    const id = parseInt(req.params.id);
    const producto = await buscarProducto(id);
    if(producto)
        return res.send(producto);

    res.status(404).send({ error: 'Producto no encontrado' });
})

productosRouter.post('/', verificarAdmin, async (req, res) => {
    const newProducto = req.body;
    if (newProducto){
        const item = await productos.save(newProducto)
        return res.send(item);
    }

    res.status(400).send({ error: 'Error al agregar' })
})

productosRouter.put('/:id', verificarAdmin, async (req, res) => {
    const id = parseInt(req.params.id);
    const nuevoProducto = req.body;
    if (buscarProducto(id))
        return res.send(await productos.update(id, nuevoProducto));
    res.status(404).send({ error: 'Producto no encontrado' });
})

productosRouter.delete('/:id', verificarAdmin,async (req, res) => {
    const id = parseInt(req.params.id);
    if (buscarProducto(id))
        return res.send(await productos.DeleteById(id));

    res.status(404).send({ error: 'Producto no encontrado' });
})

const buscarProducto = async (id) => {
    const producto = await productos.getById(id)
    return producto;
}

/****************************End points de carrito    ************************************************* */
carritoRouter.get('/', async (req, res) => {
    res.send(await carrito.getAll());
})

carritoRouter.post('/', async (req, res) => {
    const newCarrito = req.body;
    if (newCarrito)
        return res.send(await carrito.save(newCarrito));

    res.status(400).send({ error: 'Error al agregar' })
})


carritoRouter.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (buscarCarrito(id))
        return res.send(await carrito.DeleteById(id));

    res.status(404).send({ error: 'carrito no encontrado' });
})

carritoRouter.get('/:id/productos', async (req, res) => {
    const id = parseInt(req.params.id);
    const carrito = await buscarCarrito(id);
    if(carrito){
        res.send(carrito.productos);
    }
    res.status(404).send({ error: 'Carrito no encontrado' });
})

carritoRouter.post('/:id/productos',async (req, res) => {
    const id = parseInt(req.params.id);
º
    const carritoReq = await buscarCarrito(id);
    if(carritoReq && carritoReq.productos){
        const newProducto = await buscarProducto(id)
        carritoReq.productos.push(newProducto)
        return res.send(carrito.update(id, carritoReq));
    }
    res.status(404).send({ error: 'Producto no encontrado' });
})

carritoRouter.delete('/:id/productos/:id_prod', async (req, res) => {
    const id = parseInt(req.params.id);
    const carritoReq = await buscarCarrito(id)
    if(carritoReq){
        const id_prod = parseInt(req.params.id_prod);
        const filteredProductos = carritoReq.productos.filter(element => element.id !== id_prod);
        carritoReq.productos = filteredProductos;
        return res.send(await carrito.update(id,carritoReq));
    }
       
    res.status(404).send({ error: 'Carrito no encontrado' });
})

const buscarCarrito = async (id) => {
    const carrito = await carrito.getById(id)
    return carrito;
}