const Funcionario = require("../models/funcionarios.model");

let response ={
    msg:"",
    exito:false
}
exports.create = function(req, res){
    let funcionario = new Funcionario({
        nombre:req.body.nombre,
        apellido_p:req.body.apellido_p,
        apellido_m:req.body.apellido_m,
        telefono:req.body.telefono,
        email:req.body.email,
        direccion:req.body.direccion
        
    })
    funcionario.save(function(err){
        if(err){
        console.log =false,
        response.exito =false,
        response.msg ="error al guardar el empleado"
        res.json(response)
        return;
    }
    response.exito =true,
    response.msg ="el funcionario se guardó correctamente"
    res.json(response)
})
}

exports.find =function(req, res){
    Funcionario.find(function(err,funcionarios){
        res.json(funcionarios)
    })
}

exports.findOne =function(req, res){
    Funcionario.findOne({id_documento: req.params.id}, function(err,funcionario){
        res.json(funcionario)
    })
}
exports.update =function(req, res){
    let funcionario = {

        nombre:req.body.nombre,
        apellido_p:req.body.apellido_p,
        apellido_m:req.body.apellido_m,
        telefono:req.body.telefono,
        email:req.body.email,
        direccion:req.body.direccion
    }
    Funcionario.findByIdAndUpdate(req.params.id,{$set: funcionario},function(err){
        if(err){
            console.log =false,
            response.exito =false,
            response.msg ="error al modificar el funcionario"
            res.json(response)
            return;
        }
        response.exito =true,
        response.msg ="el funcionario se modificó correctamente"
        res.json(response)
    })
    
}
exports.remove =function(req,res){
Funcionario.findByIdAndRemove({_id: req.params.id},function(err){
    if(err){
        console.error =false,
        response.exito =false,
        response.msg ="error al eliminar el funcionario"
        res.json(response)
        return;
    }
    response.exito =true,
    response.msg ="el funcionario se eliminó correctamente"
    res.json(response)
})
}