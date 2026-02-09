const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const { errorHandler, notFound } = require("./middleware/errorHandler");
require("dotenv").config();

// Импорт роутов
const authRoutes = require("./routes/auth");
const articleRoutes = require("./routes/articles");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Роуты
app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);

// Health check
app.get("/api/health", async (req, res) => {
    try {
        await sequelize.authenticate();

        const [dbInfo] = await sequelize.query(
            "SELECT current_database(), version() as pg_version"
        );

        res.json({
            success: true,
            status: "ok",
            message: "Student Journal API is running",
            database: {
                connected: true,
                name: dbInfo[0].current_database,
                postgres_version: dbInfo[0].pg_version,
                provider: "Neon.tech"
            },
            endpoints: {
                auth: "/api/auth",
                articles: "/api/articles",
                health: "/api/health"
            },
            timestamp: new Date().toISOString()
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

// Обработка ошибок
app.use(notFound);
app.use(errorHandler);

// Запуск сервера
sequelize.authenticate()
    .then(() => {
        console.log("✅ Подключение к PostgreSQL (Neon) установлено!");

        app.listen(PORT, () => {
            console.log(`🚀 Student Journal Backend запущен!`);
            console.log(`📡 Порт: ${PORT}`);
            console.log(`🗄️  База данных: Neon PostgreSQL`);
            console.log(`🔗 API: http://localhost:${PORT}/api`);
            console.log(`📊 Health: http://localhost:${PORT}/api/health`);
            console.log(`👤 Auth: http://localhost:${PORT}/api/auth`);
            console.log(`📰 Articles: http://localhost:${PORT}/api/articles`);
        });
    })
    .catch(err => {
        console.error("❌ Ошибка подключения к БД:", err.message);
        process.exit(1);
    });