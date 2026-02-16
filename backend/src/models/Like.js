module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define('Like', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'user_id',
            references: {
                model: 'users',
                key: 'id'
            }
        },
        articleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'article_id',
            references: {
                model: 'articles',
                key: 'id'
            }
        }
    }, {
        tableName: 'likes',
        timestamps: true,
        underscored: true,
        indexes: [
            {
                unique: true,
                fields: ['user_id', 'article_id'],
                name: 'unique_user_article_like'
            },
            { fields: ['article_id'] },
            { fields: ['user_id'] }
        ]
    });

    return Like;
};
