const isAdmin = true;

function verificarAdmin(req, res, next){
    if(isAdmin)
        next();
    else
        res.status(401).send({
            error: -1,
            descripcion: `La ruta ${req.baseUrl} metodo ${req.method} no autorizada`
        });
}

export default verificarAdmin;