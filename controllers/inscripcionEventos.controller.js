const mongoose = require("mongoose");
//modelo de inscripcion de evento
const InscripcionEvento = require("../models/InscripcionEvento.model");

let response = {
    msg: null,
    exito: null
}

exports.nuevaInscripcion = function (req, res) {
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
        res.json(response)
    })

}

exports.consultarInscripcion = function (req, res) {
    //leer los params de la url
    let query = req.query;
    if (query.usuario != undefined && query.evento != undefined) {
        console.log("vamos a consultar evento y usuario")
        response.msg = "inscripciones de un usuario " + query.usuario + " con evento"
        res.json(response)
        return
    }

    if (query.usuario != undefined) {
        console.log("vamos a consultar los eventos a los que se inscribió un usuario")
        response.msg = "inscripciones de un usuario"
        //res.json(response)

        id_usuario = parseInt(req.query.usuario, 10)
        

        if(!isNaN(id_usuario)){
            console.log("numero valido")
            consultarInscripcionByUsuario(id_usuario, res);
            return
        }else{
            response.exito = false
            response.msg = "El id de usario no es un número"
            res.json(response)
            return
        }


    }
    if (query.evento != undefined) {
        console.log("vamos a consultar los usuarios que se inscribieron a un evento")
        response.msg = "inscripciones de un evento"
        try{
            let idEvento = mongoose.Types.ObjectId(query.evento);
        console.log(idEvento)
        consultarInscripcionByEvento(idEvento, res);
        return
        }
        catch(error){
            response.exito= false
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
// para modificar el correo o numero de contacto????  
exports.actualizarInscripcionUsuario = function (req, res) {

}

exports.eliminarInscripcionUsuario = function (req, res) {

}