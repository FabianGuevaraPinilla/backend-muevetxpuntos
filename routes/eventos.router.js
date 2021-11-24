const express = require("express");
const auth_admin = require("../auth/auth_admin");
const router = express.Router();
const eventosController = require("../controllers/eventos.controller");
// se usa una expresión regular para que la ruta que contenga la palabra "categorias" y "tipos"
// entre de una a esta url
// y se coloca al principio para que no entre a GET /:id, ya que estaba tomando a categorias como
// uu parametro y buscando un
router.get(/categorias/, eventosController.getCategorias);
router.get(/tipos/, eventosController.getTipos);

//localhost/api/eventos/categoria/

router.post("/", auth_admin, eventosController.create);
router.get("/", eventosController.find);
router.get("/:id", eventosController.findOne);
router.put("/:id", auth_admin, eventosController.update);
router.delete("/:id", auth_admin, eventosController.remove);



module.exports = router