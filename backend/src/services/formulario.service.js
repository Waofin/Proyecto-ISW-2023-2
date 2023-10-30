"use strict";

const formulario = require("../models/formulario.model.js");
const {handleError} = require("../utils/errorHandler.js");

async function getFormularios() {
    try {
        const formularios = await formulario.find().exec();
        if(!formularios) return [null, "No se encontró el formulario"];
        return [formularios, null];
        
    }catch (error) {
        handleError(error, "formulario.service.js", "getFormularios()");
    }
}
async function createFormulario(formulario) {
    try {
        const {nombre_solicitante, rut, telefono_contacto, direccion_personal, correo_electronico, direccion_comercial, comuna, nombre_empresa, rut_empresa} = formulario;
        const formularioFound = await formulario.findOne({nombre_solicitante: formulario.nombre_solicitante});
        if (formularioFound) return [null, "Ya existe un formulario con ese nombre"];

        const newFormulario = new formulario({nombre_solicitante, rut, telefono_contacto, direccion_personal, correo_electronico, direccion_comercial, comuna, nombre_empresa, rut_empresa});
        const myFormulario = await newFormulario.save();
        return [myFormulario, null];
    } catch (error) {
        handleError(error, "formulario.service.js", "createFormulario()");
    }
}
module.exports = {getFormularios, createFormulario};