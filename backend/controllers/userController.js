const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    
    try {
        const { email, password } = req.body;

        //Validación
        if (!email || !password) {
            return res.status(400).json({ message: 'Email y contraseña requeridos' });
        };

        const normalizedEmail = email.toLowerCase();

        if (!normalizedEmail.includes('@')) {
            return res.status(400).json({ message: 'Email inválido' });
        };

        if (userModel.findUserByEmail(normalizedEmail)) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        };

        // Hash de contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.createUser({ email: normalizedEmail, password: hashedPassword });

        res.status(201).json({ id: newUser.id, email: newUser.email });

    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    };
};


exports.loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;

        //Validación
        if (!email || !password) {
            return res.status(400).json({ message: 'Email y contraseña requeridos' });
        };

        const normalizedEmail = email.toLowerCase();

        const user = userModel.findUserByEmail(normalizedEmail);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        };

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        };

        //Genera el token
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });

    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    };

};