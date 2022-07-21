import express from 'express';
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import { logRequests,logError,logNotFound } from "./routers/middleware/logmw.js";
import { conectarDB } from "./controllerdb.js";
import config from "./config.js";
import logger from './utils/logger.js';

import productosRouter from './routers/api/productos.js';
import carritoRouter from './routers/api/carritos.js';


const app = express();
app.use(logRequests);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(
  session({
    store: MongoStore.create(config.mongoRemote),
    secret: "secreto",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// servidor
app.use('/api/productos', productosRouter);
app.use('/api/carrito', carritoRouter);
app.use(logError);
app.use(logNotFound);


if(config.tipoInicio == 'cluster'){
    if (cluster.isPrimary) {
      const numCpu = os.cpus().length;
      console.log(numCpu);
      console.log(`PID MASTER ${process.pid}`);
    
      for(let i=0; i< numCpu; i++) {
          cluster.fork()
      }
    
      cluster.on('exit', worker => {
         console.log(`Worker ${worker.process.pid} died`);
         cluster.fork();
      });
    } else {
      iniciarServer();
    }
  } else {
    iniciarServer();
  }

function iniciarServer(){
    conectarDB(config.mongodb.url, (err) => {
        if(err) return logger.fatal(`${err} - Error al conectar con la BD`)
        logger.info('Base de datos conectada');

        const server = app.listen(config.port, () => {
            logger.info(`Servidor http escuchando en el puerto ${server.address().port}`);
        })
        server.on("error", error => logger.fatal(`Error en servidor => ${error}`));
        
    });
}
