const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let TipoEventoSchema = new Schema(
    {
        _id: {
            type: Number,
        },
        nombre: {
            type: String,
        },
    },
    {
        collection: "tipo_eventos"
    }
);
module.exports = mongoose.model("tipoEventos", TipoEventoSchema);