const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let MunicipioSchema = new Schema(
    {
        _id:{
            type: Number,
        },
        nombre: {
            type: String,
            required: true
        },
        id_departamento:{
            type: Number,
            required: true
        },
    },
    {
        collection: "municipios",
    }
);
module.exports = mongoose.model("Municipio", MunicipioSchema);