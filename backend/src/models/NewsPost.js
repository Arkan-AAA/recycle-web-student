module.exports = (sequelize, DataTypes) => {
    return sequelize.define('NewsPost', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        instagram_url: { type: DataTypes.STRING(500), allowNull: false },
        cover_url: { type: DataTypes.STRING(1000), allowNull: true },
        shortcode: { type: DataTypes.STRING(50), allowNull: true },
        is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
        deleted_at: { type: DataTypes.DATE, allowNull: true }
    }, {
        tableName: 'news_posts',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
};
