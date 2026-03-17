module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1, 5000],
                notEmpty: true
            }
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
        tableName: 'comments',
        timestamps: true,
        underscored: true,
        indexes: [
            { fields: ['article_id'] },
            { fields: ['user_id'] },
            { fields: ['created_at'] }
        ]
    });

    return Comment;
};
