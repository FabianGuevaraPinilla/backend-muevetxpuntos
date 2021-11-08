const express =require("express");
const router =express.Router();
const sucursalesController = require("../controllers/sucursales.controller");
//router.post("/", empleadosController.create)
router.get("/",sucursalesController.find)
router.get("/:id",sucursalesController.findOne)
//router.put("/:id",empleadosController.update)
//router.delete("/:id",empleadosController.remove)
module.exports =router
