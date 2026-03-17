const express = require('express');
const router = express.Router();
const { Journal, Grade, User } = require('../models');
const { authenticate } = require('../middleware/auth');
const { csrfProtection } = require('../middleware/validation');

// GET /api/journals?isOpen=true
router.get('/', authenticate, async (req, res) => {
    try {
        const { isOpen } = req.query;
        const where = {};
        if (isOpen !== undefined) where.is_open = isOpen === 'true';

        const user = req.user;
        if (user?.studentGroup) where.group = user.studentGroup;

        const journals = await Journal.findAll({ where, order: [['id', 'ASC']] });
        res.json({ success: true, data: journals });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// GET /api/journals/:id
router.get('/:id', authenticate, csrfProtection, async (req, res) => {
    try {
        const journalId = parseInt(req.params.id, 10);
        if (isNaN(journalId)) return res.status(400).json({ success: false, message: 'Некорректный ID журнала' });

        const journal = await Journal.findByPk(journalId);
        if (!journal) return res.status(404).json({ success: false, message: 'Не найдено' });
        res.json({ success: true, data: journal });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// GET /api/journals/:id/grades?semester=1
router.get('/:id/grades', authenticate, csrfProtection, async (req, res) => {
    try {
        const journalId = parseInt(req.params.id, 10);
        const semester = req.query.semester ? parseInt(req.query.semester, 10) : null;

        if (isNaN(journalId)) return res.status(400).json({ success: false, message: 'Некорректный ID журнала' });
        if (req.query.semester !== undefined && isNaN(semester)) return res.status(400).json({ success: false, message: 'Некорректный семестр' });

        const journal = await Journal.findByPk(journalId);
        if (!journal) return res.status(404).json({ success: false, message: 'Журнал не найден' });
        if (req.userRole !== 'admin' && req.userRole !== 'teacher' && journal.group !== req.user?.studentGroup) {
            return res.status(403).json({ success: false, message: 'Нет доступа к этому журналу' });
        }

        const where = { journal_id: journalId, user_id: req.userId };
        if (semester) where.semester = semester;

        const grades = await Grade.findAll({ where, order: [['date', 'ASC']] });
        res.json({ success: true, data: grades });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// POST /api/journals/:id/grades
router.post('/:id/grades', authenticate, csrfProtection, async (req, res) => {
    try {
        const journalId = parseInt(req.params.id, 10);
        if (isNaN(journalId)) return res.status(400).json({ success: false, message: 'Некорректный ID журнала' });

        const { date, value, semester } = req.body;

        if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            return res.status(400).json({ success: false, message: 'Некорректная дата' });
        }
        const gradeValue = parseInt(value, 10);
        if (isNaN(gradeValue) || gradeValue < 1 || gradeValue > 5) {
            return res.status(400).json({ success: false, message: 'Оценка должна быть от 1 до 5' });
        }
        const semesterValue = parseInt(semester || 1, 10);
        if (isNaN(semesterValue) || semesterValue < 1 || semesterValue > 2) {
            return res.status(400).json({ success: false, message: 'Семестр должен быть 1 или 2' });
        }

        const grade = await Grade.upsert({
            journal_id: journalId,
            user_id: req.userId,
            date,
            value: gradeValue,
            semester: semesterValue
        }, { conflictFields: ['journal_id', 'user_id', 'date'] });
        res.json({ success: true, data: grade });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
