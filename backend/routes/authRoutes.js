const express = require('express');
const authController = require("../controllers/userController");

// Creo un enrutador
const router = express.Router();

// RUTAS
//POST /users/register: Registra usuarios con contraseñas hasheadas.
router.post('/register', authController.registerUser);

//POST /users/login: Devuelve un token de autenticación al iniciar sesión correctamente.
router.post('/login', authController.loginUser);

module.exports = router;