const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

let InscripcionEventoSchema = new Schema(
    {
        id_documento: { type: Number, ref: "Funcionario", required: true },
        id_evento: { type: ObjectId, ref: "Evento", required: true },
        correo: { type: String, require: false, max: 60, required: true },
        //fecha_inscripcion: { type: Date, default: Date.now }
    }, {
    timestamps: {
        createdAt: 'created',
        updatedAt: 'updated',
    },
}

);
module.exports = mongoose.model("inscripcion_eventos", InscripcionEventoSchema);