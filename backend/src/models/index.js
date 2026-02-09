const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

// Подключение к Neon
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: console.log
});

// Импорт моделей
const User = require('./User')(sequelize, DataTypes);
const Article = require('./Article')(sequelize, DataTypes);
const Comment = require('./Comment')(sequelize, DataTypes);
const Like = require('./Like')(sequelize, DataTypes);

// Настройка связей
User.hasMany(Article, { foreignKey: 'authorId', as: 'articles' });
Article.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Article.hasMany(Comment, { foreignKey: 'articleId' });
Comment.belongsTo(Article, { foreignKey: 'articleId' });

User.hasMany(Like, { foreignKey: 'userId' });
Article.hasMany(Like, { foreignKey: 'articleId' });
Like.belongsTo(User, { foreignKey: 'userId' });
Like.belongsTo(Article, { foreignKey: 'articleId' });

// Синхронизация с БД (в development)
if (process.env.NODE_ENV === 'development') {
    sequelize.sync({ alter: true })
        .then(() => console.log('✅ Database synced'))
        .catch(err => console.error('❌ Sync error:', err));
}

module.exports = {
    sequelize,
    User,
    Article,
    Comment,
    Like
};