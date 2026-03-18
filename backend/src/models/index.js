const { Sequelize, DataTypes } = require('sequelize');

if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL не настроен в .env файле');
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: process.env.NODE_ENV === 'production'
        ? { ssl: { require: true, rejectUnauthorized: false } }
        : {},
    logging: false,
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 }
});

const User = require('./User')(sequelize, DataTypes);
const Journal = require('./Journal')(sequelize, DataTypes);
const Grade = require('./Grade')(sequelize, DataTypes);
const NewsPost = require('./NewsPost')(sequelize, DataTypes);

Journal.hasMany(Grade, { foreignKey: 'journal_id', as: 'grades' });
Grade.belongsTo(Journal, { foreignKey: 'journal_id', as: 'journal' });
User.hasMany(Grade, { foreignKey: 'user_id', as: 'grades' });
Grade.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = { sequelize, User, Journal, Grade, NewsPost };
