const express =require("express");
const router =express.Router();
const premiosController = require("../controllers/premios.controller");
// se usa una expresión regular para que la ruta que contenga la palabra "categorias"
// entre de una a esta url
// y se coloca al principio para que no entre a GET /:id, ya que estaba tomando a categorias como
// uu parametro y buscando un
router.get(/categorias/, premiosController.getCategorias)

router.post("/", premiosController.create)
router.get("/",premiosController.find)
router.get("/:id",premiosController.findOne)
router.put("/:id",premiosController.update)
router.delete("/:id",premiosController.remove)



module.exports =router