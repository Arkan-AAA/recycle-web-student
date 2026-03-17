module.exports = (sequelize, DataTypes) => {
    const Journal = sequelize.define('Journal', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        type: { type: DataTypes.STRING, defaultValue: 'Производственное обучение' },
        journalType: { type: DataTypes.STRING, defaultValue: 'Обычный', field: 'journal_type' },
        program: { type: DataTypes.STRING, defaultValue: 'Линейное обучение' },
        module: { type: DataTypes.STRING },
        group: { type: DataTypes.STRING, allowNull: false },
        discipline: { type: DataTypes.STRING, allowNull: false },
        teacher: { type: DataTypes.STRING, allowNull: false },
        hours: { type: DataTypes.INTEGER, defaultValue: 72 },
        gradeType: { type: DataTypes.STRING, defaultValue: 'Процентная система (0-100)', field: 'grade_type' },
        isOpen: { type: DataTypes.BOOLEAN, defaultValue: true, field: 'is_open' }
    }, {
        tableName: 'journals',
        timestamps: true,
        underscored: true
    });

    return Journal;
};
