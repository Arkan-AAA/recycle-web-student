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

router.get('/', getArticles);
router.get('/:id', getArticleById);
router.post('/', authenticate, csrfProtection, authorize('student', 'teacher', 'admin'), articleValidation, createArticle);
router.put('/:id', authenticate, csrfProtection, updateArticle);
router.delete('/:id', authenticate, csrfProtection, deleteArticle);

module.exports = router;