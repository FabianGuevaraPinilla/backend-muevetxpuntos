const express =require("express");
const router =express.Router();
const imagenesController = require("../controllers/imagenes.controller");
router.get("/premios/:name", imagenesController.getImagenPremio);
router.get("/eventos/:name", imagenesController.getImagenEvento);
module.exports = router
