const mongoose = require("mongoose");
// Importando los modelos de la base de datos
const Evento = require("../models/eventos.model");
const CategoriaEvento = require("../models/categoriaEventos.model");
const TipoEvento = require("../models/tipoEventos.model");


//modelo de respuesta
let response = {
    msg: "",
    exito: false
}



// método para crear un evento
exports.create = function (req, res) {
    let evento = new Premio({
        id_categoria: req.body.id_categoria,
        id_tipo: req.body.id_tipo,
        id_sucursal: req.body.sucursal,
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        fecha_inicio: req.body.fecha_inicio,
        fecha_fin: req.body.fecha_inicio,
        lugar: req.body.lugar,
        url: req.body.url,
        path_foto: req.body.path_foto,
        cupo: req.body.cupo,
        valor_puntos: req.body.valor_puntos,
        disponible: req.body.disponible,
    })

    evento.save(function (err) {
        if (err) {
            console.log = false,
                response.exito = false,
                response.msg = "error al guardar el evento"
            res.json(response)
            return;
        }
        response.exito = true,
            response.msg = "el evento se guardó correctamente"
        res.json(response)
    })

}

// método para retornar todos los eventos
exports.find = function (req, res) {
    var query = Evento.aggregate(
        [
            {
                $lookup: {
                    from: 'categoria_eventos',
                    localField: 'id_categoria',
                    foreignField: '_id',
                    as: 'categoria'
                }
            },
            {
                $unwind: {
                    path: "$categoria",
                }
            },
            {
                $lookup: {

                    from: 'tipo_eventos',
                    localField: 'id_tipo',
                    foreignField: '_id',
                    as: 'tipo'

                }
            },
            {
                $unwind: {
                    path: "$tipo",
                }
            },
            {
                $project: {
                    titulo: '$titulo',
                    categoria: '$categoria.nombre',
                    tipo: "$tipo.tipoEvento",
                    path_foto: '$path_foto',
                    cantidad: '$cantidad',
                    valor_puntos: '$valor_puntos',
                    fecha_inicio: '$fecha_inicio',
                    disponible: "$disponible"
                }
            }
        ]
    );
    query.exec((error, premios) => {
        if (error) {
            console.log(error);
        } else {
            res.json(premios)
        }
    });
}

// método para encontrar un evento con un id
exports.findOne = function (req, res, next) {
    //se usa los query de la url para no tener mas endpoints

    //console.log(typeof( req.query.simple));

    // se evalua si el query string ?simple=true se encuentra en la url 
    if (req.query.simple === undefined || req.query.simple != "true") {
        //para que el pipeline en agregate, reconozca el id, se debe convertir al tipo ObjetId
        let idSearch = mongoose.Types.ObjectId(req.params.id);

        console.log(idSearch);
        var query = Evento.aggregate(
            [
                {
                    $match: {
                        _id: idSearch,
                    }
                },
                {
                    $lookup: {
                        from: 'categoria_eventos',
                        localField: 'id_categoria',
                        foreignField: '_id',
                        as: 'categoria'
                    }
                },
                {
                    $unwind: {
                        path: "$categoria",
                    }
                },
                {
                    $lookup: {

                        from: 'tipo_eventos',
                        localField: 'id_tipo',
                        foreignField: '_id',
                        as: 'tipo'

                    }
                },
                {
                    $unwind: {
                        path: "$tipo",
                    }
                },
                {
                    $lookup: {

                        from: 'sucursales',
                        localField: 'id_sucursal',
                        foreignField: '_id',
                        as: 'sucursal'

                    }
                },
                {
                    $unwind: {
                        path: "$sucursal",
                    }
                },
                {
                    $project: {
                        titulo: '$titulo',
                        detalle: '$descripcion',
                        lugar: '$lugar',
                        url: '$url',
                        categoria: '$categoria.nombre',
                        sucursal: '$sucursal.nombre',
                        fecha_inicio: '$fecha_inicio',
                        fecha_fin: '$fecha_fin',
                        tipo: "$tipo.tipoEvento",
                        path_foto: '$path_foto',
                        cantidad: '$cantidad',
                        valor_puntos: '$valor_puntos',
                        disponible: "$disponible",
                        created: '$created',
                        updated: '$updated'
                    }
                }
            ]
        );
        query.exec((error, eventos) => {
            if (error) {
                console.log(error);
            } else {
                console.log(eventos);
                res.json(eventos)
            }
        });
        console.log(query.created);

    } else {
        Evento.findById(req.params.id, (error, data, next) => {
            if (error) {
                console.log(error);
                return next(error);
            } else {
                res.json(data);
            }
        })
    }
}
// método para actualizar un evento con un id
exports.update = function (req, res) {
    let evento = {
        id_categoria: req.body.id_categoria,
        id_tipo: req.body.id_tipo,
        id_sucursal: req.body.sucursal,
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        fecha_inicio: req.body.fecha_inicio,
        fecha_fin: req.body.fecha_inicio,
        lugar: req.body.lugar,
        url: req.body.url,
        path_foto: req.body.path_foto,
        cupo: req.body.cupo,
        valor_puntos: req.body.valor_puntos,
        disponible: req.body.disponible,
    }
    Evento.findByIdAndUpdate(req.params.id, { $set: evento }, function (err) {
        if (err) {
            console.log = false,
                response.exito = false,
                response.msg = "error al modificar el evento"
            res.json(response)
            return;
        }
        response.exito = true,
            response.msg = "el evento se modificó correctamente"
        res.json(response)
    })
}
// método para eliminar un evento con un id
exports.remove = function (req, res) {
    Evento.findByIdAndRemove({ _id: req.params.id }, function (err) {
        if (err) {
            console.error = false,
                response.exito = false,
                response.msg = "error al eliminar el evento"
            res.json(response)
            return;
        }
        response.exito = true,
            response.msg = "el evento se eliminó correctamente"
        res.json(response)
    })
}

// método para conseguir las categórias de evento
exports.getCategorias = function (req, res) {
    CategoriaEvento.aggregate([{
        $project: {
            _id: "$_id",
            categoria: "$nombre"
        }
    }], (error, data) => {
        if (error) {
            console.log(error);
            return next(error)
        }
        else {
            console.log(data);
            res.json(data);
        }
    });
}

// método para conseguir los tipos de evento
exports.getTipos = function (req, res) {
    TipoEvento.find((error, data) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log(data);
            res.json(data);
        }
    });
}

