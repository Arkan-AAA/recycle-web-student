const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { sequelize } = require("./models");
const { errorHandler, notFound } = require("./middleware/errorHandler");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const journalRoutes = require("./routes/journals");
const aiRoutes = require("./routes/ai");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet({ 
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false 
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

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/journals", journalRoutes);
app.use("/api/ai", aiRoutes);

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