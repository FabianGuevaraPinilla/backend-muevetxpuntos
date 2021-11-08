const mongoose =require("mongoose");
const Schema = mongoose.Schema;

const FuncionariosSchema = new Schema({
    id_documento: {type: Number, require: true},
    primer_nombre:{type:String, require: true, max:60},
    segundo_nombre: {type:String, max:60},
    primer_apellido:{type:String, require: true, max:60},
    segundo_apellido: {type:String, max:60},
    id_sucursal: {type: Number, require: true},
    id_municipio: {type: Number, require: true},
    n_celular:{type:Number, require: true, max:15},
    id_estado_civil: {type:String, require: false, max:60},
    correo_electronico:{type:String, require: false, max:60},
    //direccion:{type:String, require: false, max:150},
});
module.exports = mongoose.model("funcionarios", FuncionariosSchema);
