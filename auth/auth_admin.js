module.exports = (req, res, next)=>{
    if(req.usuario.rol == "ADMIN"){
        next()
    }
    else{
        res.status(403).send({
            msg: "no tiene los permisos necesarios para realizar la petición"
        })
    }
}