const express = require("express");
const router = express.Router();
const inscripcionesController = require("../controllers/inscripcionEventos.controller");
// consultar inscripcion puede recibir 2 querys de tipo y usuario y 
router.get("/", inscripcionesController.consultarInscripcion);
router.post("/", inscripcionesController.nuevaInscripcion, inscripcionesController.actualizarPuntos);
router.put("/update/:idInscripcion", inscripcionesController.actualizarInscripcionUsuario)
router.delete("/:idInscripcion", inscripcionesController.eliminarInscripcionUsuario);
module.exports = router
