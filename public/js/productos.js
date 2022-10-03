/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const productosApi = {
    get: async () => {
        const data = await fetch('/api/productos');
        return await data.json();
    },
    post: (nuevoProd) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoProd)
        };
        return fetch('/api/productos', options);
    },
    put: (idProd, nuevoProd) => {
        const options = {
            method: 'PUT',
            body: JSON.stringify(nuevoProd),
            headers: {
                'Content-Type': 'application/json',
            }
        };
        return fetch(`/api/productos/${idProd}`, options);
    },
    delete: (idProd) => {
        const options = {
            method: 'DELETE'
        };
        return fetch(`/api/productos/${idProd}`, options);
    },
};

//-------------------------------------------------------------------
// productos

actualizarListaProductos();

const formAgregarProducto = document.getElementById('formAgregarProducto');
formAgregarProducto.addEventListener('submit', e => {
    e.preventDefault();
    const producto = leerProductoDelFormulario();
    productosApi.post(producto)
        .then(actualizarListaProductos)
        .then(() => {
            formAgregarProducto.reset();
        })
        .catch((err) => {
            alert(err.message);
        });
});

function leerProductoDelFormulario() {
    const producto = {
        title: formAgregarProducto[0].value,
        price: formAgregarProducto[1].value,
        thumbnail: formAgregarProducto[2].value
    };
    return producto;
}

function actualizarListaProductos() {
    return productosApi.get()
        .then(prods => makeHtmlTable(prods))
        .then(html => {
            document.getElementById('productos').innerHTML = html;
        });
}

function borrarProducto(idProd) {
    productosApi.delete(idProd)
        .then(actualizarListaProductos);
}

function actualizarProducto(idProd) {
    const nuevoProd = leerProductoDelFormulario();
    productosApi.put(idProd, nuevoProd)
        .then(actualizarListaProductos);
}


function llenarFormulario(title = '', price = '', thumbnail = '') {
    formAgregarProducto[0].value = title;
    formAgregarProducto[1].value = price;
    formAgregarProducto[2].value = thumbnail;
}

function makeHtmlTable(productos) {
    let html = `
        <style>
            .table td,
            .table th {
                vertical-align: middle;
            }
        </style>`;

    if (productos.length > 0) {
        html += `
        <h2>Lista de Productos</h2>
        <div class="table-responsive">
            <table class="table table-dark">
                <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Foto</th>
                </tr>`;
        for (const prod of productos) {
            html += `
                    <tr>
                    <td><a type="button" onclick="llenarFormulario('${prod.title}', '${prod.price}','${prod.thumbnail}')" title="copiar a formulario...">${prod.title}</a></td>
                    <td>$${prod.price}</td>
                    <td><img width="50" src=${prod.thumbnail} alt="not found"></td>
                    <td><a type="button" onclick="borrarProducto('${prod.id}')">borrar</a></td>
                    <td><a type="button" onclick="actualizarProducto('${prod.id}')">actualizar</a></td>
                    </tr>`;
        }
        html += `
            </table>
        </div >`;
    }
    return Promise.resolve(html);
}

//-------------------------------------------------------------------------------------

// MENSAJES

/* --------------------- DESNORMALIZACIÓN DE MENSAJES ---------------------------- */
// Definimos un esquema de autor
const authorSchema = new normalizr.schema.Entity('author', {}, { idAttribute: 'email' });
const mensajeSchema = new normalizr.schema.Entity('post', {
    author: authorSchema
}, { idAttribute: 'id' });

const postsSchema = new normalizr.schema.Entity('posts', {
    mensajes: [mensajeSchema]
}, { idAttribute: 'id' });
/* ----------------------------------------------------------------------------- */

const inputUsername = document.getElementById('username');
const inputMensaje = document.getElementById('inputMensaje');
const btnEnviar = document.getElementById('btnEnviar');

const formPublicarMensaje = document.getElementById('formPublicarMensaje');
formPublicarMensaje.addEventListener('submit', e => {
    e.preventDefault();
    const fecha = new Date();
    const mensaje = {
        author: {
            email: inputUsername.value,
            nombre: document.getElementById('firstname').value,
            apellido: document.getElementById('lastname').value,
            edad: document.getElementById('age').value,
            alias: document.getElementById('alias').value,
            avatar: document.getElementById('avatar').value
        },
        text: inputMensaje.value,
        fecha: `${fecha.toLocaleDateString('es-MX')} ${fecha.toLocaleTimeString('es-MX')}`
    };

    socket.emit('nuevoMensaje', mensaje);
    formPublicarMensaje.reset();
    inputMensaje.focus();
    return false;
});

socket.on('listaMensajes', async listaMensajes => {    
    const denormalizedData = normalizr.denormalize(listaMensajes.normalizedData?.result, postsSchema, listaMensajes.normalizedData?.entities);
    console.log('desnormalizado =>' + JSON.stringify(denormalizedData));
    if(denormalizedData){
        const html = await makeHtmlList(denormalizedData.mensajes);
        document.getElementById('mensajes').innerHTML = html;
        document.getElementById('compresion-info').innerText = listaMensajes.porcentaje !== 0 ? `${listaMensajes.porcentaje}`: '';
    }
});

function makeHtmlList(mensajes) {
    return mensajes.map(mensaje => {
        return (`
        <div>
            <b style="color:blue;">${mensaje.author.email}</b>
            [<span style="color:brown;">${mensaje.fecha}</span>] :
            <i style="color:green;">${mensaje.text}</i>
            <img width="50" src="${mensaje.author.avatar}" alt=" ">
        </div>
    `);
    }).join(' ');
}

inputUsername.addEventListener('input', () => {
    const hayEmail = inputUsername.value.length;
    const hayTexto = inputMensaje.value.length;
    inputMensaje.disabled = !hayEmail;
    btnEnviar.disabled = !hayEmail || !hayTexto;
});

inputMensaje.addEventListener('input', () => {
    const hayTexto = inputMensaje.value.length;
    btnEnviar.disabled = !hayTexto;
});
