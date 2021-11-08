const express =require("express");
const router =express.Router();
const funcionariosController = require("../controllers/funcionarios.controller");
router.post("/", funcionariosController.create)
router.get("/",funcionariosController.find)
router.get("/:id",funcionariosController.findOne)
router.put("/:id",funcionariosController.update)
router.delete("/:id",funcionariosController.remove)
module.exports =router

