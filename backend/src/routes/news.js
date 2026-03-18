const express = require('express');
const router = express.Router();
const { NewsPost } = require('../models');
const { authenticate, isAdmin } = require('../middleware/auth');

// Извлечь shortcode из URL Instagram
const extractShortcode = (url) => {
    const match = url.match(/\/(p|reel|tv)\/([A-Za-z0-9_-]+)/);
    return match ? match[2] : null;
};

// Получить обложку через oEmbed Instagram
const fetchCover = async (url) => {
    try {
        const oembedUrl = `https://graph.facebook.com/v18.0/instagram_oembed?url=${encodeURIComponent(url)}&fields=thumbnail_url&access_token=${process.env.INSTAGRAM_TOKEN || ''}`;
        // Fallback: используем picuki или ddinstagram как прокси для обложки
        const shortcode = extractShortcode(url);
        if (shortcode) {
            // Используем публичный API для получения превью
            return `https://www.instagram.com/p/${shortcode}/media/?size=l`;
        }
        return null;
    } catch {
        return null;
    }
};

// GET /api/news — все активные посты
router.get('/', async (req, res) => {
    try {
        const posts = await NewsPost.findAll({
            where: { is_active: true },
            order: [['created_at', 'DESC']]
        });
        res.json({ success: true, data: posts });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// POST /api/news — добавить пост (только админ)
router.post('/', authenticate, isAdmin, async (req, res) => {
    try {
        const { instagram_url } = req.body;
        if (!instagram_url) return res.status(400).json({ success: false, error: 'instagram_url required' });

        const shortcode = extractShortcode(instagram_url);
        if (!shortcode) return res.status(400).json({ success: false, error: 'Invalid Instagram URL' });

        // Проверить дубликат
        const existing = await NewsPost.findOne({ where: { shortcode, is_active: true } });
        if (existing) return res.status(409).json({ success: false, error: 'Post already exists' });

        const cover_url = await fetchCover(instagram_url);

        const post = await NewsPost.create({
            instagram_url,
            shortcode,
            cover_url,
            is_active: true
        });

        res.json({ success: true, data: post });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// DELETE /api/news/:id — мягкое удаление (только админ)
router.delete('/:id', authenticate, isAdmin, async (req, res) => {
    try {
        const post = await NewsPost.findByPk(req.params.id);
        if (!post) return res.status(404).json({ success: false, error: 'Not found' });

        await post.update({ is_active: false, deleted_at: new Date() });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
