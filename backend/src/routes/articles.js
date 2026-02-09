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
const { articleValidation } = require('../middleware/validation');

router.get('/', getArticles);
router.get('/:id', getArticleById);
router.post('/', authenticate, authorize('student', 'teacher', 'admin'), articleValidation, createArticle);
router.put('/:id', authenticate, updateArticle);
router.delete('/:id', authenticate, deleteArticle);

module.exports = router;