const jwt = require('jsonwebtoken');

//Middleware para proteger rutas
function authenticateToken(req, res, next) {
    // El token se envía en el header "Authorization" con formato "Bearer TOKEN"
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // toma el token después de "Bearer"

    if (!token) return res.status(401).json({ message: 'Acceso denegado: no hay token' });

    jwt.verify(token, process.env.JWT_SECRET || 'secretkey', (err, user) => {
        if (err) return res.status(403).json({ message: 'Token inválido' });

        req.user = user; //agregamos info del usuario a la request
        next(); //pasa al siguiente middleware o ruta
    });
}

module.exports = authenticateToken;