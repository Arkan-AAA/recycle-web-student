const express = require('express');
const router = express.Router();
const { NewsPost } = require('../models');
const { authenticate, isAdmin } = require('../middleware/auth');

const extractShortcode = (url) => {
    const match = url.match(/\/(p|reel|tv)\/([A-Za-z0-9_-]+)/);
    return match ? match[2] : null;
};

// Получить обложку через публичный oEmbed Instagram
const fetchCover = async (url) => {
    try {
        const oembedUrl = `https://www.instagram.com/oembed/?url=${encodeURIComponent(url)}&omitscript=true`;
        const res = await fetch(oembedUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)',
                'Accept': 'application/json'
            }
        });
        if (!res.ok) throw new Error(`oEmbed status ${res.status}`);
        const data = await res.json();
        return data.thumbnail_url || null;
    } catch (e) {
        console.warn('⚠️ oEmbed ошибка:', e.message);
        return null;
    }
};

// GET /api/news
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
        const { instagram_url, cover_url: manualCover } = req.body;
        if (!instagram_url) return res.status(400).json({ success: false, error: 'instagram_url required' });

        const shortcode = extractShortcode(instagram_url);
        if (!shortcode) return res.status(400).json({ success: false, error: 'Invalid Instagram URL' });

        const existing = await NewsPost.findOne({ where: { shortcode, is_active: true } });
        if (existing) return res.status(409).json({ success: false, error: 'Post already exists' });

        const cover_url = manualCover || await fetchCover(instagram_url);
        console.log(`🖼️ Обложка для ${shortcode}:`, cover_url);

        const post = await NewsPost.create({ instagram_url, shortcode, cover_url, is_active: true });
        res.json({ success: true, data: post });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// PATCH /api/news/:id/refresh — обновить обложку (только админ)
router.patch('/:id/refresh', authenticate, isAdmin, async (req, res) => {
    try {
        const post = await NewsPost.findByPk(req.params.id);
        if (!post) return res.status(404).json({ success: false, error: 'Not found' });

        const cover_url = await fetchCover(post.instagram_url);
        await post.update({ cover_url });
        res.json({ success: true, data: post });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// DELETE /api/news/:id
router.delete('/:id', authenticate, isAdmin, async (req, res) => {
    try {
        const post = await NewsPost.findByPk(req.params.id);
        if (!post) return res.status(404).json({ success: false, error: 'Not found' });

        // Hard delete: удаляем запись из базы, а не soft-delete.
        await post.destroy();
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
