const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

let EventoSchema = new Schema(
    {
        id_categoria: { type: Number, ref: "CategoriaEvento" },
        id_tipo: { type: Number, ref: "TipoEvento" },
        id_sursal: {type: Number,ref: "Sucursal"},
        titulo: {type: String,},
        descripcion: {type: String,},
        fecha_inicio: {type: String,},
        fecha_final: {type: String,},
        lugar: {type: String},
        url: {type: String},
        path_foto: {type: String},
        cupo: {type: Number},
        valor_puntos: {type: Number},
        disponible: {type: Boolean, default: true}
    }, {
    timestamps: {
        createdAt: 'created',
        updatedAt: 'updated',
    },
}

);
module.exports = mongoose.model("eventos", EventoSchema);