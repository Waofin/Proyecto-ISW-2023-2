"use strict";
const express = require("express");
const formularioController = require("../controllers/formulario.controller.js");
const router = express.Router();

router.get("/", formularioController.getFormularios);
router.post("/", formularioController.create);
module.exports = router;
