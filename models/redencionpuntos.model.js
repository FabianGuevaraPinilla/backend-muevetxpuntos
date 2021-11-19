const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
// documento con los registros de redenciones realizadas
let RedencionPuntosSchema = new Schema(
    {
        id_documento: {type: Number, required: true, ref: "Funcionario"},
        id_premio: {type: ObjectId, required: true},
        fecha_redencion: {type: Date, default: Date.now}
    },
    {
        collection: "redencion_puntos"
    }
);

module.exports = mongoose.model("RedencionPuntos", RedencionPuntosSchema);