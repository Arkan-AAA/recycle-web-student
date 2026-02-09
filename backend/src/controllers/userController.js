const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { validationResult } = require('express-validator');

exports.register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { username, email, password, fullName } = req.body;

        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not configured');
        }

        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                error: 'Пользователь с таким email уже существует'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const user = await User.create({
            username,
            email,
            passwordHash,
            fullName,
            role: 'student'
        });

        let token;
        try {
            token = jwt.sign(
                { userId: user.id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            );
        } catch (jwtError) {
            console.error('JWT signing error:', jwtError);
            return res.status(500).json({ success: false, error: 'Ошибка создания токена' });
        }

        res.status(201).json({
            success: true,
            message: 'Пользователь успешно зарегистрирован',
            data: {
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    fullName: user.fullName,
                    role: user.role
                },
                token
            }
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ success: false, error: 'Пользователь уже существует' });
        }
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ success: false, error: 'Некорректные данные' });
        }
        res.status(500).json({ success: false, error: 'Ошибка при регистрации' });
    }
};

exports.login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { email, password } = req.body;

        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not configured');
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ success: false, error: 'Неверный email или пароль' });
        }

        const isValidPassword = await bcrypt.compare(password, user.passwordHash);

        if (!isValidPassword) {
            return res.status(401).json({ success: false, error: 'Неверный email или пароль' });
        }

        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            message: 'Вход выполнен успешно',
            data: {
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    fullName: user.fullName,
                    role: user.role,
                    avatarUrl: user.avatarUrl
                },
                token
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        if (error.name === 'SequelizeDatabaseError') {
            return res.status(500).json({ success: false, error: 'Ошибка базы данных' });
        }
        res.status(500).json({ success: false, error: 'Ошибка при входе' });
    }
};

exports.getProfile = async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(400).json({ success: false, error: 'ID пользователя не указан' });
        }

        const user = await User.findByPk(req.userId, {
            attributes: { exclude: ['passwordHash'] }
        });

        if (!user) {
            return res.status(404).json({ success: false, error: 'Пользователь не найден' });
        }

        res.json({ success: true, data: user });
    } catch (error) {
        console.error('Get profile error:', error);
        
        if (error.name === 'SequelizeDatabaseError') {
            return res.status(500).json({ success: false, error: 'Ошибка базы данных' });
        }
        
        res.status(500).json({ success: false, error: 'Ошибка при получении профиля' });
    }
};