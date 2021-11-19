const PuntosUsuarios = require("../models/puntosUsuarios.model");
const Premio = require("../models/premios.model");


//ver los puntos de un usuario
exports.getPuntosUser = (req, res) => {
    PuntosUsuarios.findById()
    res.json({
        msg: "consulta de puntos de usuario",
        user: req.usuario
    })
}

// consulta de puntos, listado general y por usuario
exports.getPuntos = (req, res, next) => {
    // res.json({
    //     msg: "puntos de los usuarios",
    //     user: req.usuario
    // })
    if (req.query.usuario === undefined) {
        PuntosUsuarios.find(function (err, puntos) {

            if (err) {
                res.status(400)
                return false
            } else {
                res.json({
                    puntos
                })
                return true
            }
        })
    } else {
        PuntosUsuarios.findById(req.query.usuario, (err, usuarioPuntos) => {
            if (err) {
                res.json({
                    msg: "error usuario no encontrado"
                })
            } else {
                res.json({
                    usuarioPuntos
                })
            }
        })
    }
}
// redimir un premio
exports.acumular = (req, res, next) => {
    //se guarda en la coleccion de puntos redimidos la peticion
    res.json({
        msg: "acumular puntos de usuario",
        user: req.usuario
    })

}


exports.verificarPuntosDisponibles = (req, res, next) => {
    //se busca el premio 
    Premio.findById(req.query.premio, (error, premio) => {
        if (error) {
            console.log(error);
            res.status(400)
            res.json({
                msg: "Error con el premio requerido"
            })
            return next(error);
        }
        // res.json(premio);

        // se consulta el 
        PuntosUsuarios.findById(req.query.usuario, (errUser, usuario) => {
            if (errUser) {
                console.log(errUser);
                res.status(400)
                res.json({
                    msg: "Error consultando el usuario requerido"
                })
                return next(errUser);
            }
            console.log("se tiene ", premio.valor_puntos, " y se tiene ", usuario.acumulado)

            next()

        })
    })
}


// redimir
exports.redimir = (req, res, next) => {
    if (req.query.user != undefined && req.query.premio != undefined) {
        //se guarda en la coleccion de puntos redimidos la peticion
        PuntosUsuarios.updateOne(
            { _id: req.query.usuario },
            { $inc: { acumulado: -200 } }, (err, respuesta) => {
                if (err) {
                    res.json({
                        msg: "redimir de puntos de usuario error",
                        user: req.usuario
                    })
                    return
                }
                res.json({
                    msg: "redimir de puntos de usuario exitoso",
                    user: req.usuario
                })
            }
        )


    } else {
        //se guarda en la coleccion de puntos redimidos la peticion
        res.status(400)
        res.json({
            msg: "no se puede redimir de puntos de usuario, datos erroneos o faltantes",
            user: req.usuario
        })
        return

    }

}
