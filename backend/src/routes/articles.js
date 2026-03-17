const express = require('express');
const router = express.Router();
const {
    createArticle,
    getArticles,
    getArticleById,
    updateArticle,
    deleteArticle
} = require('../controllers/articleController');
const { authenticate, authorize } = require('../middleware/auth');
const { articleValidation, csrfProtection } = require('../middleware/validation');

router.get('/', authenticate, getArticles);
router.get('/:id', authenticate, getArticleById);
router.post('/', authenticate, csrfProtection, authorize('student', 'teacher', 'admin'), articleValidation, createArticle);
router.put('/:id', authenticate, csrfProtection, authorize('student', 'teacher', 'admin'), updateArticle);
router.delete('/:id', authenticate, csrfProtection, authorize('teacher', 'admin'), deleteArticle);

module.exports = router;