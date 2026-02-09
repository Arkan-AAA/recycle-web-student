module.exports = (sequelize, DataTypes) => {
    const Article = sequelize.define('Article', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        excerpt: {
            type: DataTypes.STRING(500)
        },
        coverImageUrl: {
            type: DataTypes.STRING,
            field: 'cover_image_url'
        },
        category: {
            type: DataTypes.STRING(50),
            defaultValue: 'article'
        },
        tags: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: []
        },
        views: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        isPublished: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            field: 'is_published'
        },
        authorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'author_id'
        }
    }, {
        tableName: 'articles',
        timestamps: true,
        underscored: true
    });

    return Article;
};