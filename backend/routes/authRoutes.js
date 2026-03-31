const express = require('express');
//const fs = require('fs');
const path = require('path');
const authController = require("../controllers/authController");

// Creo un enrutador
const router = express.Router();

// Ruta al archivo JSON que funciona como BBDD
const dataPath = path.join(__dirname, '../data/users.json');

// RUTAS

//POST /users/register: Registra usuarios con contraseñas hasheadas.
router.post('/users/register', authController.registerUser);

//POST /users/login: Devuelve un token de autenticación al iniciar sesión correctamente.
router.post('/users/login', authController.logUser);

module.exports = router;