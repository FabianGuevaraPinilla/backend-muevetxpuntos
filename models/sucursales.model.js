const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let SucursalSchema = new Schema(
    {
        _id:{
            type: Number,
            required: true
        },
        id_municipio: {
            type: Number,
        },
        nombre: {
            type: String,
        },
    },
    {
        collection: "sucursales",
    }
);
module.exports = mongoose.model("Sucursal", SucursalSchema);