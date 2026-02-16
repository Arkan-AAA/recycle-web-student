const express = require('express');
const { User } = require('../models');
const { authenticate } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const router = express.Router();

router.get('/profile', authenticate, async (req, res) => {
    try {
        const user = await User.findByPk(req.userId, {
            attributes: { exclude: ['passwordHash'] }
        });
        
        if (!user) {
            return res.status(404).json({ success: false, error: 'Пользователь не найден' });
        }
        
        res.json({ success: true, data: user });
    } catch (error) {
        console.error('Profile error:', error.message);
        res.status(500).json({ success: false, error: 'Ошибка сервера' });
    }
});

router.put('/profile', [
    authenticate,
    body('fullName').optional().trim().isLength({ min: 2, max: 100 }),
    body('phone').optional().trim().matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/),
    body('address').optional().trim().isLength({ max: 200 }),
    body('birthDate').optional().isISO8601().toDate()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false, 
                error: 'Ошибка валидации', 
                details: errors.array() 
            });
        }
        
        const { fullName, phone, address, birthDate } = req.body;
        
        const user = await User.findByPk(req.userId);
        if (!user) {
            return res.status(404).json({ success: false, error: 'Пользователь не найден' });
        }
        
        const updateData = {};
        if (fullName !== undefined) updateData.fullName = fullName;
        if (phone !== undefined) updateData.phone = phone;
        if (address !== undefined) updateData.address = address;
        if (birthDate !== undefined) updateData.birthDate = birthDate;
        
        await user.update(updateData);
        
        const updatedUser = await User.findByPk(req.userId, {
            attributes: { exclude: ['passwordHash'] }
        });
        
        res.json({ success: true, data: updatedUser });
    } catch (error) {
        console.error('Update profile error:', error.message);
        res.status(500).json({ success: false, error: 'Ошибка сервера' });
    }
});

router.post('/avatar', authenticate, async (req, res) => {
    try {
        const { avatar } = req.body;
        
        if (!avatar) {
            return res.status(400).json({ success: false, error: 'Данные аватара отсутствуют' });
        }
        
        const user = await User.findByPk(req.userId);
        if (!user) {
            return res.status(404).json({ success: false, error: 'Пользователь не найден' });
        }
        
        await user.update({ avatarUrl: avatar });
        
        const updatedUser = user.toJSON();
        delete updatedUser.passwordHash;
        
        res.json({ 
            success: true, 
            data: { avatarUrl: avatar },
            user: updatedUser
        });
    } catch (error) {
        console.error('Avatar upload error:', error);
        res.status(500).json({ success: false, error: 'Ошибка сервера: ' + error.message });
    }
});

module.exports = router;