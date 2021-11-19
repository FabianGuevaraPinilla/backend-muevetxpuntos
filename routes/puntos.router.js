// rutas de los puntos
const express = require("express");
const router = express.Router();
const puntosController = require("../controllers/puntos.controller");

router.get("/consulta/:idUser", puntosController.getPuntosUser);  //consulta de los puntos personales

router.get("/consulta", puntosController.getPuntos);    //consulta de puntos por parte del admin usando querys en la URL
router.post("/redime",  puntosController.verificarPuntosDisponibles, puntosController.redimir);
// por ahora los puntos se acumulan con la sola inscripcion a un evento
//router.post("/acumula", puntosController.acumular); 

module.exports =router