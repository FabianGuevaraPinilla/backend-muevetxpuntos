const mongoose = require("mongoose");
// Importando los modelos de la base de datos
const Premio = require("../models/premios.model");
const CategoriaPremio = require("../models/categoriaPremios.model");
//modelo de respuesta
let response = {
    msg: "",
    exito: false
}
// método para crear un premio
exports.create = function (req, res) {
    let premio = new Premio({
        id_categoria: req.body.id_categoria,
        nombre: req.body.nombre,
        marca: req.body.marca,
        detalle: req.body.marca,
        path_foto: req.body.path_foto,
        cantidad: req.body.cantidad,
        valor_puntos: req.body.valor_puntos,
        visible: req.body.visible,
    })

    premio.save(function (err) {
        if (err) {
            console.log = false,
                response.exito = false,
                response.msg = "error al guardar el premio"
            res.json(response)
            return;
        }
        response.exito = true,
            response.msg = "el premio se guardó correctamente"
        res.json(response)
    })
}
// método para retornar todos los premios
exports.find = function (req, res) {
    var query = Premio.aggregate(
        [
            {
                $lookup: {
                    from: 'categoria_premios',
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
                $project: {
                    nombre: '$nombre',
                    categoria: '$categoria.nombre',
                    path_foto: '$path_foto',
                    cantidad: '$cantidad',
                    valor_puntos: '$valor_puntos',
                    visible: '$visible'
                }
            }
        ]
    );
    query.exec((error, premios) => {
        if (error) {
            console.log(error);
            response.exito = false,
                response.msg = "Error consultando premios"
        } else {
            res.json(premios)
        }
    });
}
// método para encontrar un premio con un id
exports.findOne = function (req, res, next) {
    //se usa los query de la url para no tener mas endpoints

    //console.log(typeof( req.query.simple));

    // se evalua si el query string ?simple=true se encuentra en la url 
    if (req.query.simple === undefined || req.query.simple != "true") {
        // En caso que no, se ejecuta una consulta que trae la relacion entre las tablas de premios y categoria premios

        //para que el pipeline en agregate, reconozca el id, se debe convertir al tipo ObjetId
        let idSearch = mongoose.Types.ObjectId(req.params.id);

        console.log(idSearch);
        res.status(200)
        var query = Premio.aggregate(
            [
                {
                    $match: {
                        _id: idSearch,
                    }
                },
                {
                    $lookup: {
                        from: 'categoria_premios',
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
                    $project: {
                        nombre: '$nombre',
                        categoria: '$categoria.nombre',
                        marca: '$marca',
                        detalle: '$detalle',
                        path_foto: '$path_foto',
                        cantidad: '$cantidad',
                        valor_puntos: '$valor_puntos',
                        visible: '$visible',
                        creado: '$created',
                        actualizado: '$updated'
                    }
                }
            ]
        );
        query.exec((error, premios) => {
            if (error) {
                console.log(error);
                response.exito = false,
                    response.msg = "Error consultando premios"
                res.json(response)
            } else {
                res.json(premios)
            }
        });


        // en caso positivo se pasa a la función para buscar el premio y devolver los 

    }
    else {
        // en caso que si, se ejecuta una consulta con las llaves foraneas sin relacionar
        Premio.findById(req.params.id, (error, data, next) => {
            if (error) {
                console.log(error);
                // return next(error);
            } else {
                res.json(data);
            }
        })

    }
}
// método para actualizar un premio con un id
exports.update = function (req, res) {
    let premio = {
        id_categoria: req.body.id_categoria,
        nombre: req.body.nombre,
        marca: req.body.marca,
        detalle: req.body.marca,
        path_foto: req.body.path_foto,
        cantidad: req.body.cantidad,
        valor_puntos: req.body.valor_puntos,
        visible: req.body.visible,
    }
    Premio.findByIdAndUpdate(req.params.id, { $set: premio }, function (err) {
        if (err) {
            console.log = false,
                response.exito = false,
                response.msg = "error al modificar el premio"
            res.json(response)
            return;
        }
        response.exito = true,
            response.msg = "el premio se modificó correctamente"
        res.json(response)
    })

}
// método para eliminar un premio con un id
exports.remove = function (req, res) {
    Premio.findByIdAndRemove({ _id: req.params.id }, function (err) {
        if (err) {
            console.error = false,
                response.exito = false,
                response.msg = "error al eliminar el premio"
            res.json(response)
            return;
        }
        response.exito = true,
            response.msg = "el premio se eliminó correctamente"
        res.json(response)
    })
}
// Para pedir las catégorias de los premios
exports.getCategorias = function (req, res) {
    CategoriaPremio.aggregate([{
        $project: {
            _id: "$_id",
            categoria: "$nombre"
        }
    }], (error, data) => {
        if (error) {
            console.error = false,
                response.exito = false,
                response.msg = "error al eliminar el premio"
            res.json(response)
        }
        else {
            console.log(data);
            res.json(data);
        }
    });
}