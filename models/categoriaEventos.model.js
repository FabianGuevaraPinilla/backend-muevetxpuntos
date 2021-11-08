const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let CategoriaEventoSchema = new Schema(
    {
        _id: {
            type: Number,
        },
        nombre: {
            type: String,
        },
    },
    {
        collection: "categoria_eventos"
    }
);
module.exports = mongoose.model("CategoriaEvento", CategoriaEventoSchema);