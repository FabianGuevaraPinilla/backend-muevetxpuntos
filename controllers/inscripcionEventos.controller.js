const mongoose = require("mongoose");
//modelo de inscripcion de evento
const InscripcionEvento = require("../models/InscripcionEvento.model");
const PuntosUsuarios = require("../models/puntosUsuarios.model");
const Evento = require("../models/eventos.model");
let response = {
    msg: null,
    exito: null,
}

exports.nuevaInscripcion = function (req, res, next) {
    let idEvento = mongoose.Types.ObjectId(req.body.id_evento);
    let inscripcion = new InscripcionEvento({
        id_documento: req.body.id_documento,
        id_evento: idEvento,
        correo: req.body.correo,
    })
    inscripcion.save(function (err) {
        if (err) {
            console.log = false,
                response.exito = false,
                response.msg = "exito al guardar la inscripción al evento"
            res.json(response)
            return;
        }
        response.exito = true;
        response.msg = "la inscripcion se guardó correctamente"
        next()
    })
}

exports.actualizarPuntos = (req, res, next) => {
    console.log("buscando el valor de puntos del evento")
    //realizar la consulta de los puntos del evento
    Evento.findById(req.body.id_evento, (error, dataEvento, next) => {
        if (error) {
            console.log(error);
            return next(error);
        } else {
            response.msg = response.msg + "\nEl evento tiene " + dataEvento.valor_puntos
            response.exito = true
 
            //buscar si ya existe un registro con el id dado
            id_usuario = parseInt(req.body.id_documento, 10)
            console.log(id_usuario)
            if (!isNaN(id_usuario)) {
                PuntosUsuarios.findOne({ _id: id_usuario }, function (err, usuarioPuntos) {
                    if(err){
                        next(err)
                        return
                    }else{
                        //no hay error en la consulta
                        if (usuarioPuntos){
                            let updateUsuarioPuntos = {
                                _id: usuarioPuntos._id,
                                acumulado: usuarioPuntos.acumulado + dataEvento.valor_puntos,
                                redimido: usuarioPuntos.redimido
                            }
                            console.log(updateUsuarioPuntos)
                            PuntosUsuarios.findByIdAndUpdate(id_usuario, {$set: updateUsuarioPuntos}, (err)=>{
                                if(err){
                                    console.log =false,
                                    response.exito =false,
                                    response.msg ="error al modificar el registro de puntos del usuario"
                                    res.json(response)
                                    return;
                                }
                                response.exito =true,
                                response.msg ="el registro de puntos se modificó correctamente"
                                res.json(response)
                            })
                        }else{
                            let newUsuarioPuntos = new PuntosUsuarios({
                                _id: id_usuario,
                                acumulado: dataEvento.valor_puntos,
                                redimido: 0
                            })
                            newUsuarioPuntos.save(function(err){
                                if(err){
                                console.log =false,
                                response.exito =false,
                                response.msg ="error al guardar el registro de puntos acumulados por el premio"
                                res.json(response)
                                return;
                                }
                            })
                            response.msg = "no hBIA REGISTRO"
                            res.json(response)
                        }
                    }
                })
            } else {
                response.msg = "error con el usuario recibido"
                res.json(response)
            }
        }
    })

}


exports.consultarInscripcion = function (req, res) {
    //leer los params de la url
    let query = req.query;
    if (query.usuario != undefined && query.evento != undefined) {
        console.log("vamos a consultar evento y usuario")
        response.msg = "inscripciones de un usuario " + query.usuario + " con evento"
        try {
            let id_evento = mongoose.Types.ObjectId(req.query.evento);
            let id_usuario = parseInt(req.query.usuario, 10);

            if (!isNaN(id_usuario)) {
                console.log("numero valido")
                console.log(id_usuario)
                consultarInscripcionByEventoAndUsuario(id_evento, id_usuario, res);
                return
            } else {
                response.exito = false
                response.msg = "El id de usario no es un número"
                res.json(response)
                return
            }

        }
        catch (error) {
            response.exito = false
            response.msg = error
            res.json(response)
            return
        }
    }

    if (query.usuario != undefined) {
        console.log("vamos a consultar los eventos a los que se inscribió un usuario")
        response.msg = "inscripciones de un usuario"
        //res.json(response)

        id_usuario = parseInt(req.query.usuario, 10)


        if (!isNaN(id_usuario)) {
            console.log("numero valido")
            consultarInscripcionByUsuario(id_usuario, res);
            return
        } else {
            response.exito = false
            response.msg = "El id de usario no es un número"
            res.json(response)
            return
        }


    }
    if (query.evento != undefined) {
        console.log("vamos a consultar los usuarios que se inscribieron a un evento")
        response.msg = "inscripciones de un evento"
        try {
            let idEvento = mongoose.Types.ObjectId(query.evento);
            console.log(idEvento)
            consultarInscripcionByEvento(idEvento, res);
            return
        }
        catch (error) {
            response.exito = false
            response.msg = "error"
            res.json(response)
            return
        }
    }

    console.log("vamos a consultar todas las inscripciones")
    response.msg = "inscripciones totales"
    //res.json(response)

    var queryMongo = InscripcionEvento.aggregate(
        [
            {
                $lookup: {
                    from: 'funcionarios',
                    localField: 'id_documento',
                    foreignField: 'id_documento',
                    as: 'funcionario'
                }
            },
            {
                $unwind: {
                    path: "$funcionario",
                }
            },
            {
                $lookup: {
                    from: 'eventos',
                    localField: 'id_evento',
                    foreignField: '_id',
                    as: 'evento'
                }
            },
            {
                $unwind: {
                    path: "$evento",
                }
            },
            {
                $project: {
                    titulo: '$id_documento',
                    nombre: '$funcionario.primer_nombre',
                    apellido: "$funcionario.primer_apellido",
                    correo: "$correo",
                    id_evento: "$id_evento",
                    titulo_evento: "$evento.titulo"
                }
            },
        ])
    queryMongo.exec((error, inscripciones) => {
        if (error) {
            console.log(error);
        } else {
            res.json(inscripciones)
        }
    });
}

// consulta para ver los eventos a los que se ha inscrito un funcionario/usuario
function consultarInscripcionByUsuario(idUser, res) {

    var queryMongo = InscripcionEvento.aggregate(
        [
            {
                $match: {
                    id_documento: idUser,
                }
            },
            {
                $lookup: {
                    from: 'funcionarios',
                    localField: 'id_documento',
                    foreignField: 'id_documento',
                    as: 'funcionario'
                }
            },
            {
                $unwind: {
                    path: "$funcionario",
                }
            },
            {
                $lookup: {
                    from: 'eventos',
                    localField: 'id_evento',
                    foreignField: '_id',
                    as: 'evento'
                }
            },
            {
                $unwind: {
                    path: "$evento",
                }
            },
            {
                $project: {
                    titulo: '$id_documento',
                    nombre: '$funcionario.primer_nombre',
                    apellido: "$funcionario.primer_apellido",
                    correo: "$correo",
                    id_evento: "$id_evento",
                    titulo_evento: "$evento.titulo"
                }
            },
        ])
    queryMongo.exec((error, inscripciones) => {
        if (error) {
            console.log(error);
        } else {
            res.json(inscripciones)
        }
    });
}
// tabla de incripciones hechas por usuarios a aun evento dado
function consultarInscripcionByEvento(idEvento, res) {

    var queryMongo = InscripcionEvento.aggregate(
        [
            {
                $match: {
                    id_evento: idEvento,
                }
            },
            {
                $lookup: {
                    from: 'funcionarios',
                    localField: 'id_documento',
                    foreignField: 'id_documento',
                    as: 'funcionario'
                }
            },
            {
                $unwind: {
                    path: "$funcionario",
                }
            },
            {
                $lookup: {
                    from: 'eventos',
                    localField: 'id_evento',
                    foreignField: '_id',
                    as: 'evento'
                }
            },
            {
                $unwind: {
                    path: "$evento",
                }
            },
            {
                $project: {
                    titulo: '$id_documento',
                    nombre: '$funcionario.primer_nombre',
                    apellido: "$funcionario.primer_apellido",
                    correo: "$correo",
                    id_evento: "$id_evento",
                    titulo_evento: "$evento.titulo"
                }
            },
        ])
    queryMongo.exec((error, inscripciones) => {
        if (error) {
            console.log(error);
        } else {
            res.json(inscripciones)
        }
    });
}

function consultarInscripcionByEventoAndUsuario(idEvento, idUser, res) {
    let retorno = undefined;
    InscripcionEvento.find({ id_evento: idEvento, id_documento: idUser }, function (err, inscripcion) {

        if (err) {
            res.status(400)
            return false
        } else {
            retorno = inscripcion
            res.json({
                data: retorno
            })
            return true
        }
    })


}

// para modificar el correo o numero de contacto????  
exports.actualizarInscripcionUsuario = function (req, res) {
    let inscripcion_evento = {
        correo: req.body.correo
    }
    InscripcionEvento.findByIdAndUpdate(req.params.idInscripcion, { $set: inscripcion_evento }, function (err) {
        if (err) {
            console.log = false,
                response.exito = false,
                response.msg = "error al modificar la inscripcion al evento"
            res.json(response)
            return;
        }
        response.exito = true,
            response.msg = "la inscripcion al evento se modificó correctamente"
        res.json(response)
    })
}

exports.eliminarInscripcionUsuario = function (req, res) {
    InscripcionEvento.findByIdAndRemove({ _id: req.params.idInscripcion }, function (err) {
        if (err) {
            console.error = false,
                response.exito = false,
                response.msg = "error al eliminar la inscripción al evento"
            res.json(response)
            return;
        }
        response.exito = true,
            response.msg = "la inscripción al evento se eliminó correctamente"
        res.json(response)
    })
}