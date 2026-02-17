exports.errorHandler = (err, req, res, next) => {
    console.error('Error:', err.message);

    if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({
            success: false,
            error: 'Ошибка валидации',
            details: err.errors.map(e => e.message)
        });
    }

    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({
            success: false,
            error: 'Запись уже существует'
        });
    }

    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false,
            error: 'Неверный токен'
        });
    }

    const statusCode = err.status || 500;
    res.status(statusCode).json({
        success: false,
        error: process.env.NODE_ENV === 'production' ? 'Внутренняя ошибка сервера' : err.message
    });
};

exports.notFound = (req, res) => {
    res.status(404).json({
        success: false,
        error: 'Маршрут не найден'
    });
};
