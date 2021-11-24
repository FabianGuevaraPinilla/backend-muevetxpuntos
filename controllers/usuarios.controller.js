const Usuario = require("../models/usuarios.models");
const crypto = require("crypto")
const jwt = require("jsonwebtoken")
const Joi = require('@hapi/joi');   //verificacion de usuario tipo numero


const schemaLogin = Joi.object({
    usuario: Joi.number().required(),
    pass: Joi.string().min(6).max(1024).required()
})


exports.login = function(req, res, next){

    //validar el usuario y el password
    const { error } = schemaLogin.validate(req.body)
    //si hay error salir de la función y retornar 400
    if (error) return res.status(400).json({token: null,  error: error.details[0].message })


    let hashedpass = crypto.createHash("sha512").update(req.body.pass).digest("hex");

    Usuario.findOne({ usuario: req.body.usuario, pass: hashedpass}, function(err, usuario){
        let response = {
            usuario: null,
        token:null,
        rol: null,
        fecha_acceso: null
        }
        if (!usuario) return res.status(404).json({token: null, error: 'Usuario no encontrado' })
        if(usuario !== null){
            response.token = jwt.sign({
                id: usuario._id,
                usuario: usuario.usuario
            }, "__secret__")
            response.usuario = usuario.usuario,
            response.rol =  usuario.rol;
            response.fecha_acceso = usuario.fecha_acceso;
        }
        res.json(response);
    })
}