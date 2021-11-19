const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
// documento con los registros de redenciones realizadas
let PuntosUsuarioSchema = new Schema(
    {
        _id: {type: Number, required: true},
        acumulado: {type: Number, required: true},
        redimido: {type: Number, required: true}
    },
    {
        timestamps: {
            createdAt: 'created',
            updatedAt: 'updated',
        },
    },
    {
        collection: "puntos_usuarios"
    }
);

module.exports = mongoose.model("PuntosUsuarios", PuntosUsuarioSchema);