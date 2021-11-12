const express = require("express");
const router = express.Router();
const inscripcionesController = require("../controllers/inscripcionEventos.controller");
// consultar inscripcion puede recibir 2 querys de tipo y usuario y 
router.get("/", inscripcionesController.consultarInscripcion);
router.post("/", inscripcionesController.nuevaInscripcion);
router.delete("/:idUser", inscripcionesController.eliminarInscripcionUsuario);
module.exports = router
