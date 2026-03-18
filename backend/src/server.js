require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const { sequelize } = require("./models");
const { errorHandler, notFound } = require("./middleware/errorHandler");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const journalRoutes = require("./routes/journals");
const aiRoutes = require("./routes/ai");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'"]
        }
    }
}));
const allowedOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',')
    : ['http://localhost:5173', 'http://localhost:3000'];
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.get("/api/health", async (req, res) => {
    try {
        await sequelize.authenticate();
        res.json({
            success: true,
            status: "ok",
            message: "Server is running",
            database: { connected: true }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            status: "error",
            message: "Database connection failed",
            error: error.message
        });
    }
});

// Health check для Railway
app.get("/health", async (req, res) => {
    try {
        await sequelize.authenticate();
        res.status(200).send("OK");
    } catch (error) {
        res.status(500).send("ERROR");
    }
});

app.get("/api/proxy-image", async (req, res) => {
    const { url } = req.query;
    if (!url || !url.startsWith('https://instagram.') && !url.includes('fbcdn.net')) {
        return res.status(400).json({ error: 'Invalid URL' });
    }
    try {
        const response = await fetch(url, {
            headers: { 'User-Agent': 'Mozilla/5.0', 'Referer': 'https://www.instagram.com/' }
        });
        if (!response.ok) {
            return res.status(response.status).json({ error: 'Image fetch failed' });
        }
        res.set('Content-Type', response.headers.get('content-type') || 'image/jpeg');
        res.set('Cache-Control', 'public, max-age=3600');
        res.set('Cross-Origin-Resource-Policy', 'cross-origin');
        response.body.pipe(res);
    } catch {
        res.status(500).json({ error: 'Failed to fetch image' });
    }
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/journals", journalRoutes);
app.use("/api/ai", aiRoutes);

if (process.env.NODE_ENV === 'production') {
    const frontendPath = path.join(__dirname, '../public');
    app.use(express.static(frontendPath));

    app.get(/^(?!\/api).*/, (req, res) => {
        res.sendFile(path.join(frontendPath, 'index.html'));
    });
}

app.use(notFound);
app.use(errorHandler);

sequelize.authenticate()
    .then(() => sequelize.sync({ alter: true }))
    .then(() => {
        console.log("✅ Подключение к PostgreSQL установлено!");
        app.listen(PORT, () => {
            console.log(`🚀 Backend запущен на порту: ${PORT}`);
            console.log(`🔗 API: http://localhost:${PORT}/api`);
            console.log(`🔑 Auth: http://localhost:${PORT}/api/auth/login`);
        });
    })
    .catch(err => {
        console.error("❌ Ошибка подключения к БД:", err.message);
        process.exit(1);
    });