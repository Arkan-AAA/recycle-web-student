module.exports = (sequelize, DataTypes) => {
    const Grade = sequelize.define('Grade', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        journalId: { type: DataTypes.INTEGER, allowNull: false, field: 'journal_id' },
        userId: { type: DataTypes.INTEGER, allowNull: false, field: 'user_id' },
        date: { type: DataTypes.DATEONLY, allowNull: false },
        value: { type: DataTypes.INTEGER },
        semester: { type: DataTypes.INTEGER, defaultValue: 1 }
    }, {
        tableName: 'grades',
        timestamps: true,
        underscored: true
    });

    return Grade;
};
