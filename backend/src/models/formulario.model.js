"use strict";

const mongoose = require("mongoose");
const validate = require("mongoose-validator"); 


// Validador para el RUT
const rutValidator = [
  validate({
    validator: "isLength",
    arguments: [7, 10],
    message: "El RUT debe tener entre 7 y 10 caracteres",
  }),
];

// Validador para el correo electrónico
const emailValidator = [
  validate({
    validator: "isEmail",
    message: "El correo electrónico no es válido",
  }),
];

// Validador para el número de teléfono
const phoneValidator = [
  validate({
    validator: "isNumeric",
    message: "El número de teléfono solo debe contener números",
  }),
  validate({
    validator: "isLength",
    arguments: [9, 11],
    message: "El número de teléfono debe tener entre 9 y 11 dígitos",
  }),
];

const formularioSchema = new mongoose.Schema({
    nombre_solicitante: { type: String, required: true },
    rut: { type: String, required: true, validate: rutValidator },
    telefono_contacto: { type: String, required: true, validate: phoneValidator },
    direccion_personal: { type: String, required: true },
    correo_electronico: { type: String, required: true, validate: emailValidator },
    direccion_comercial: { type: String, required: true },
    comuna: { type: String, required: true },  
    nombre_empresa: { type: String },
    rut_empresa: { type: String, validate: rutValidator },
});

const Formulario = mongoose.model("Formulario", formularioSchema);
module.exports = Formulario;
