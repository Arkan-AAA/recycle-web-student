module.exports = (sequelize, DataTypes) => {
    const Article = sequelize.define('Article', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(200),
            allowNull: false,
            validate: {
                len: [5, 200],
                notEmpty: true
            }
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [50, 100000],
                notEmpty: true
            }
        },
        excerpt: {
            type: DataTypes.STRING(500),
            validate: {
                len: [0, 500]
            }
        },
        coverImageUrl: {
            type: DataTypes.STRING,
            field: 'cover_image_url',
            validate: {
                isUrl: true
            }
        },
        category: {
            type: DataTypes.STRING(50),
            defaultValue: 'article',
            validate: {
                isIn: [['article', 'news', 'event', 'announcement']]
            }
        },
        tags: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: []
        },
        views: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            validate: {
                min: 0
            }
        },
        isPublished: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            field: 'is_published'
        },
        authorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'author_id',
            references: {
                model: 'users',
                key: 'id'
            }
        }
    }, {
        tableName: 'articles',
        timestamps: true,
        underscored: true,
        indexes: [
            { fields: ['author_id'] },
            { fields: ['category'] },
            { fields: ['is_published'] },
            { fields: ['created_at'] }
        ]
    });

    return Article;
};