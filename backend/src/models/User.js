module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            validate: {
                len: [3, 50]
            }
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        passwordHash: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'password_hash'
        },
        fullName: {
            type: DataTypes.STRING(100),
            field: 'full_name'
        },
        phone: {
            type: DataTypes.STRING(20),
            field: 'phone'
        },
        additionalPhone: {
            type: DataTypes.STRING(20),
            field: 'additional_phone'
        },
        address: {
            type: DataTypes.STRING(200),
            field: 'address'
        },
        birthDate: {
            type: DataTypes.DATEONLY,
            field: 'birth_date'
        },
        avatarUrl: {
            type: DataTypes.TEXT,
            field: 'avatar_url'
        },
        studentCardUrl: {
            type: DataTypes.TEXT,
            field: 'student_card_url'
        },
        role: {
            type: DataTypes.STRING(20),
            defaultValue: 'student'
        },
        studentGroup: {
            type: DataTypes.STRING(50),
            field: 'student_group'
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            field: 'is_active'
        }
    }, {
        tableName: 'users',
        timestamps: true,
        underscored: true
    });

    return User;
};