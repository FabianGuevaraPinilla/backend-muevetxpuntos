const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let CategoriaPremioSchema = new Schema(
    {
        _id: {
            type: Number,
        },
        nombre: {
            type: String,
        },
    },
    {
        collection: "categoria_premios"
    }
);
module.exports = mongoose.model("categoria_premios", CategoriaPremioSchema);