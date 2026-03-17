const express = require('express');
const router = express.Router();
const { Journal, Grade, User } = require('../models');
const { authenticate } = require('../middleware/auth');

// GET /api/journals?isOpen=true
router.get('/', authenticate, async (req, res) => {
    try {
        const { isOpen } = req.query;
        const where = {};
        if (isOpen !== undefined) where.is_open = isOpen === 'true';

        const user = req.user;
        if (user.studentGroup) where.group = user.studentGroup;

        const journals = await Journal.findAll({ where, order: [['id', 'ASC']] });
        res.json({ success: true, data: journals });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// GET /api/journals/:id
router.get('/:id', authenticate, async (req, res) => {
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
router.get('/:id/grades', authenticate, async (req, res) => {
    try {
        const journalId = parseInt(req.params.id, 10);
        const semester = req.query.semester ? parseInt(req.query.semester, 10) : null;

        if (isNaN(journalId)) return res.status(400).json({ success: false, message: 'Некорректный ID журнала' });
        if (req.query.semester !== undefined && isNaN(semester)) return res.status(400).json({ success: false, message: 'Некорректный семестр' });

        const where = { journal_id: journalId, user_id: req.user.id };
        if (semester) where.semester = semester;

        const grades = await Grade.findAll({ where, order: [['date', 'ASC']] });
        res.json({ success: true, data: grades });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// POST /api/journals/:id/grades
router.post('/:id/grades', authenticate, async (req, res) => {
    try {
        const journalId = parseInt(req.params.id, 10);
        if (isNaN(journalId)) return res.status(400).json({ success: false, message: 'Некорректный ID журнала' });

        const { date, value, semester } = req.body;
        const grade = await Grade.upsert({
            journal_id: journalId,
            user_id: req.user.id,
            date,
            value,
            semester: semester || 1
        }, { conflictFields: ['journal_id', 'user_id', 'date'] });
        res.json({ success: true, data: grade });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
