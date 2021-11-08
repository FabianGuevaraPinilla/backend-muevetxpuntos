const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
    usuario:{type: Number, required: true, unique: true},
    pass:{type: String, required: true, max:128},
    rol: {type: String, default: "USER", enum: ["ADMIN","USER"]},
    fecha_acceso: {type: Date, default: Date.Now}
});

module.exports = mongoose.model("usuarios", UsuarioSchema);