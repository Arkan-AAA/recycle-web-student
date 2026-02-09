const { Article, User } = require('../models');
const { validationResult } = require('express-validator');

exports.getArticles = async (req, res) => {
    try {
        const { page = 1, limit = 10, category, search } = req.query;
        const offset = (page - 1) * limit;

        const where = { isPublished: true };
        if (category) where.category = category;
        if (search) where.title = { [require('sequelize').Op.iLike]: `%${search}%` };

        const { count, rows } = await Article.findAndCountAll({
            where,
            limit: parseInt(limit),
            offset: parseInt(offset),
            include: [{
                model: User,
                as: 'author',
                attributes: ['id', 'username', 'fullName', 'avatarUrl']
            }],
            order: [['createdAt', 'DESC']]
        });

        res.json({
            success: true,
            data: {
                articles: rows,
                pagination: {
                    total: count,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    pages: Math.ceil(count / limit)
                }
            }
        });
    } catch (error) {
        console.error('Get articles error:', error);
        res.status(500).json({ success: false, error: 'Ошибка при получении статей' });
    }
};

exports.getArticleById = async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id, {
            include: [{
                model: User,
                as: 'author',
                attributes: ['id', 'username', 'fullName', 'avatarUrl']
            }]
        });

        if (!article) {
            return res.status(404).json({ success: false, error: 'Статья не найдена' });
        }

        // Увеличиваем счетчик просмотров
        await article.increment('views');

        res.json({ success: true, data: article });
    } catch (error) {
        console.error('Get article error:', error);
        res.status(500).json({ success: false, error: 'Ошибка при получении статьи' });
    }
};

exports.createArticle = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { title, content, excerpt, coverImageUrl, category, tags } = req.body;

        const article = await Article.create({
            title,
            content,
            excerpt,
            coverImageUrl,
            category,
            tags: tags || [],
            authorId: req.userId
        });

        const fullArticle = await Article.findByPk(article.id, {
            include: [{
                model: User,
                as: 'author',
                attributes: ['id', 'username', 'fullName', 'avatarUrl']
            }]
        });

        res.status(201).json({
            success: true,
            message: 'Статья успешно создана',
            data: fullArticle
        });
    } catch (error) {
        console.error('Create article error:', error);
        res.status(500).json({ success: false, error: 'Ошибка при создании статьи' });
    }
};

exports.updateArticle = async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id);

        if (!article) {
            return res.status(404).json({ success: false, error: 'Статья не найдена' });
        }

        if (article.authorId !== req.userId && req.userRole !== 'admin') {
            return res.status(403).json({ success: false, error: 'Нет прав для редактирования' });
        }

        await article.update(req.body);

        res.json({ success: true, message: 'Статья обновлена', data: article });
    } catch (error) {
        console.error('Update article error:', error);
        res.status(500).json({ success: false, error: 'Ошибка при обновлении статьи' });
    }
};

exports.deleteArticle = async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id);

        if (!article) {
            return res.status(404).json({ success: false, error: 'Статья не найдена' });
        }

        if (article.authorId !== req.userId && req.userRole !== 'admin') {
            return res.status(403).json({ success: false, error: 'Нет прав для удаления' });
        }

        await article.destroy();

        res.json({ success: true, message: 'Статья удалена' });
    } catch (error) {
        console.error('Delete article error:', error);
        res.status(500).json({ success: false, error: 'Ошибка при удалении статьи' });
    }
};
