const { body } = require('express-validator');

exports.csrfProtection = (req, res, next) => {
    const allowedOrigins = process.env.CORS_ORIGIN
        ? process.env.CORS_ORIGIN.split(',')
        : ['http://localhost:5173', 'http://localhost:3000'];

    const origin = req.headers['origin'] || req.headers['referer'];
    if (!origin || !allowedOrigins.some(o => origin.startsWith(o.trim().replace(/\/$/, '')))) {
        return res.status(403).json({ success: false, error: 'Недопустимый источник запроса' });
    }
    next();
};

exports.registerValidation = [
    body('username')
        .trim()
        .isLength({ min: 3, max: 50 })
        .withMessage('Имя пользователя должно быть от 3 до 50 символов'),
    body('email')
        .trim()
        .isEmail()
        .withMessage('Некорректный email')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Пароль должен быть минимум 6 символов'),
    body('fullName')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Полное имя не должно превышать 100 символов')
];

exports.loginValidation = [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Некорректный email')
        .normalizeEmail(),
    body('password')
        .notEmpty()
        .withMessage('Пароль обязателен')
];

exports.articleValidation = [
    body('title')
        .trim()
        .isLength({ min: 5, max: 200 })
        .withMessage('Заголовок должен быть от 5 до 200 символов'),
    body('content')
        .trim()
        .isLength({ min: 50 })
        .withMessage('Содержание должно быть минимум 50 символов'),
    body('excerpt')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Краткое описание не должно превышать 500 символов'),
    body('category')
        .optional()
        .isIn(['article', 'news', 'event', 'announcement'])
        .withMessage('Некорректная категория'),
    body('tags')
        .optional()
        .isArray()
        .withMessage('Теги должны быть массивом')
];
