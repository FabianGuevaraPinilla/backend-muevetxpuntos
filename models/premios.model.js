const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

let PremioSchema = new Schema(
    {
        id_categoria: { type: Number, ref: "CategoriaPremio" },
        nombre: { type: String, },
        marca: { type: String, },
        detalle: { type: String, },
        path_foto: { type: String, },
        cantidad: { type: Number, },
        valor_puntos: { type: Number, },
        visible: { type: Boolean, default: true },
    }, {
    timestamps: {
        createdAt: 'created',
        updatedAt: 'updated',
    },
}

);
module.exports = mongoose.model("premios", PremioSchema);