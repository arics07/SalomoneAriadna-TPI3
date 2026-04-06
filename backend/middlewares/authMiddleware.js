const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;

    // Verifica formato "Bearer TOKEN"
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Acceso denegado: token faltante o mal formado' });
    };

    const token = authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Token requerido' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
        req.user = decoded; //información del usuario disponible en controllers
        next();

    } catch (error) {
        return res.status(403).json({ message: 'Token inválido o expirado' });
    }
}

module.exports = authenticateToken;