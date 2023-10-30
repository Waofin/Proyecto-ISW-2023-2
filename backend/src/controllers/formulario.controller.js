"use strict";

const {respondSuccess, respondError} = require("../utils/resHandler");
const FormularioService = require("../services/formulario.service");
const {handleError} = require("../utils/errorHandler");
const Formulario = require("../models/formulario.model");


async function getFormularios(req, res) {
    try {
        const [formulario, errorFormulario] = await FormularioService.getFormularios();
        if (errorFormulario) return respondError(req, res, 404, errorFormulario);

        formulario.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, formulario);
    }  catch (error) {
        handleError(error, "formulario.controller -> getFormulario");
        respondError(req, res, 400, error.message);

    }
}
async function create(req, res) {
    const nuevoFormulario = new Formulario(req.body);
    try {
      const formularioGuardado = await nuevoFormulario.save();
      res.status(201).send(formularioGuardado);
    } catch (err) {
      res.status(500).send(err);
    }
}

module.exports = {getFormularios, create}; 

