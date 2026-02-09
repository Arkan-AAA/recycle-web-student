module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'user_id'
        },
        articleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'article_id'
        }
    }, {
        tableName: 'comments',
        timestamps: true,
        underscored: true
    });

    return Comment;
};
