/* eslint-disable no-case-declarations */
let productosDao;
let carritosDao;
let ordenesDao;

switch (process.env.PERS) {
case 'json':
    const { default: ProductosDaoArchivo } = await import('./productos/ProductosDaoArchivo.js');
    const { default: CarritosDaoArchivo } = await import('./carritos/CarritosDaoArchivo.js');

    productosDao = new ProductosDaoArchivo();
    carritosDao = new CarritosDaoArchivo();
    break;
case 'firebase':
    const { default: ProductosDaoFirebase } = await import('./productos/ProductosDaoFirebase.js');
    const { default: CarritosDaoFirebase } = await import('./carritos/CarritosDaoFirebase.js');

    productosDao = new ProductosDaoFirebase();
    carritosDao = new CarritosDaoFirebase();
    break;
        
case 'mongodb':
    const { default: ProductosDaoMongoDb } = await import('./productos/ProductosDaoMongoDb.js');
    const { default: CarritosDaoMongoDb } = await import('./carritos/CarritosDaoMongoDb.js');
    const { default: OrdenesDaoMongoDb } = await import('./ordenes/OrdenesDaoMongoDb.js');

    productosDao = new ProductosDaoMongoDb();
    carritosDao = new CarritosDaoMongoDb();
    ordenesDao = new OrdenesDaoMongoDb();
    break;
        
case 'mariadb':
    const { default: ProductosDaoMariaDb } = await import('./productos/ProductosDaoMariaDb.js');
    const { default: CarritosDaoMariaDb } = await import('./carritos/CarritosDaoMariaDb.js');

    productosDao = new ProductosDaoMariaDb();
    carritosDao = new CarritosDaoMariaDb();
    break;
        
case 'sqlite3':
    const { default: ProductosDaoSQLite3 } = await import('./productos/ProductosDaoSQLite3.js');
    const { default: CarritosDaoSQLite3 } = await import('./carritos/CarritosDaoSQLite3.js');

    productosDao = new ProductosDaoSQLite3();
    carritosDao = new CarritosDaoSQLite3();
    break;
       
default:
        
    break;
}

export { productosDao, carritosDao, ordenesDao};