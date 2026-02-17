const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL не настроен в .env файле');
    process.exit(1);
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const User = require('./User')(sequelize, DataTypes);

module.exports = {
    sequelize,
    User
};