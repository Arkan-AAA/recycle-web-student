const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ success: false, error: 'Токен не предоставлен' });
        }

        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET is not configured');
            return res.status(500).json({ success: false, error: 'Ошибка конфигурации сервера' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        req.userRole = decoded.role;

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, error: 'Токен истёк' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, error: 'Неверный токен' });
        }
        return res.status(401).json({ success: false, error: 'Ошибка аутентификации' });
    }
};

exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.userRole)) {
            return res.status(403).json({
                success: false,
                error: 'Недостаточно прав для выполнения операции'
            });
        }
        next();
    };
};

exports.isAdmin = (req, res, next) => {
    if (req.userRole !== 'admin') {
        return res.status(403).json({ success: false, error: 'Требуются права администратора' });
    }
    next();
};

exports.isTeacher = (req, res, next) => {
    if (req.userRole !== 'teacher' && req.userRole !== 'admin') {
        return res.status(403).json({ success: false, error: 'Требуются права преподавателя' });
    }
    next();
};