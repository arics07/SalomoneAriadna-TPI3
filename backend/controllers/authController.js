const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email y contraseña requeridos' });

    if (userModel.findUserByEmail(email)) {
        return res.status(400).json({ message: 'Usuario ya existe' });
    }

    const newUser = await userModel.createUser({ email, password });
    res.status(201).json({ id: newUser.id, email: newUser.email });
};

exports.logUser = async (req, res) => {
    const { email, password } = req.body;
    const user = userModel.findUserByEmail(email);
    if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1h' });
    res.json({ token });
};