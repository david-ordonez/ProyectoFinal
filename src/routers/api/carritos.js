import { Router } from "express";
import {
  carritosDao as carrito,
  productosDao as productos,
} from "./daos/index.js";

const carritoRouter = new Router();

carritoRouter.get("/", async (req, res) => {
  res.send(await carrito.getAll());
});

carritoRouter.post("/", async (req, res) => {
  const newCarrito = req.body;
  if (newCarrito) return res.send(await carrito.save(newCarrito));

  res.status(400).send({ error: "Error al agregar" });
});

carritoRouter.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const carrito = await carrito.getById(id);
  if (carrito) return res.send(await carrito.DeleteById(id));

  res.status(404).send({ error: "carrito no encontrado" });
});

carritoRouter.get("/:id/productos", async (req, res) => {
  const id = parseInt(req.params.id);
  const carrito = await carrito.getById(id);
  if (carrito) {
    return res.send(carrito.productos);
  }
  res.status(404).send({ error: "Carrito no encontrado" });
});

carritoRouter.post("/:id/productos", async (req, res) => {
  const id = parseInt(req.params.id);
  const carritoReq = await carrito.getById(id);
  if (carritoReq && carritoReq.productos) {
    const newProducto = await productos.getById(id);
    carritoReq.productos.push(newProducto);
    return res.send(carrito.update(id, carritoReq));
  }
  res.status(404).send({ error: "Producto no encontrado" });
});

carritoRouter.delete("/:id/productos/:id_prod", async (req, res) => {
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

  res.status(404).send({ error: "Carrito no encontrado" });
});


export default carritoRouter;