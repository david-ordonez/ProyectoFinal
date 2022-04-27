# ProyectoFinal


Proyecto basado en Node.js y express para aplicacion de eCommerce Backend.

## API para Productos

### Obtener todos los productos

Me permite listar todos los productos disponibles

```http
  GET /api/productos
```

### Obtener un producto

Me permite listar un producto por su id

```http
  GET /api/productos/:id
```

| Parametro | Tipo     | Descripcion                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Requerido**. Id del producto    |

### Agregar un producto

```http
  POST /api/productos/
```
Recibe y agrega un producto al listado y lo devuelve con su id asignado.
\*disponible para administradores solamente\*

| Atributo  | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `nombre`   | `string` | **Requerido**. nombre del producto    |
| `descripcion`   | `string` | **Requerido**. descripcion del producto    |
| `código`   | `string` | **Requerido**. codigo del producto    |
| `precio`   | `float`  | **Requerido**. precio del producto    |
| `foto`| `string`| **Requerido**. direccion de la imagen del producto    |
| `stock`| `integer`| **Requerido**. numero de articulos en el stock del producto|

### Actualizar un producto

```http
  PUT /api/productos/:id
```
Recibe y actualiza un producto según su id.
\*disponible para administradores solamente\*

| Atributo  | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **Requerido**. Id del producto para actualizar    |
| `nombre`   | `string` | **Requerido**. nombre del producto    |
| `descripcion`   | `string` | **Requerido**. descripcion del producto    |
| `código`   | `string` | **Requerido**. codigo del producto    |
| `precio`   | `float`  | **Requerido**. precio del producto    |
| `foto`| `string`| **Requerido**. direccion de la imagen del producto    |
| `stock`| `integer`| **Requerido**. numero de articulos en el stock del producto|

### Borrar un producto

Elimina un producto según su id.
\*disponible para administradores solamente\*

```http
  DELETE /api/productos/:id
```

| Parametro | Tipo     | Descripcion                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Requerido**. Id del producto    |


## API para Carrito

### Agregar un carrito

```http
  POST /api/carrito/
```
Crea un carrito y lo devuelve con su Id.


| Atributo  | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`   | `number` | **Requerido**. id del carrito    |
| `productos`   | `Array de productos` | **Requerido**. Datos del producto derivado de los productos anteriormente dados de alta los campos estan especificados en los productos individuales de la API de productos    |

### Borrar un carrito

Vacía un carrito y lo elimina.

```http
  DELETE /api/carrito/:id
```

| Parametro | Tipo     | Descripcion                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Requerido**. Id del carrito    |

### Obtener todos los productos

Me permite listar todos los productos disponibles

```http
  GET /api/carrito/:id/productos
```
Permite listar todos los productos guardados en el carrito

| Parametro | Tipo     | Descripcion                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Requerido**. Id del carrito    |

### Agregar productos al carrito

Para incorporar productos al carrito por su id de producto

```http
  POST /api/carrito/:id/productos
```
Permite listar todos los productos guardados en el carrito

| Parametro | Tipo     | Descripcion                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Requerido**. Id del carrito    |

### Borrar un producto del carrito

Eliminar un producto del carrito por su id de carrito y de
producto

```http
  DELETE '/:id/productos/:id_prod
```

| Parametro | Tipo     | Descripcion                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Requerido**. Id del carrito    |
| `id_prod`      | `number` | **Requerido**. Id del producto    |

