const Sucursal = require("../models/sucursales.model");


exports.find = (req, res)=>{
    Sucursal.find((error, data, next) => {
        if (error) {
            return next(error);
        } else {
            console.log(error);
            res.json(data);
        }
    });
}
exports.findOne = (req, res) =>{
    Sucursal.findById(req.params.id, (error, data, next) => {
        if (error) {
            console.log(error);
            return next(error);
        } else {
            res.json(data);
        }
    })
}
