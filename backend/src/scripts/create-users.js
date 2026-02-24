const bcrypt = require('bcryptjs');
const { sequelize, User } = require('../models');

async function createUsers() {
    try {
        await sequelize.sync();

        const users = [
            {
                username: 'admin',
                email: 'admin@college.kz',
                password: 'admin123',
                fullName: 'Администратор Системы',
                role: 'admin'
            },
            {
                username: 'teacher1',
                email: 'teacher@college.kz',
                password: 'teacher123',
                fullName: 'Иванов Иван Иванович',
                role: 'teacher'
            },
            {
                username: 'student1',
                email: 'student@college.kz',
                password: 'student123',
                fullName: 'Петров Петр Петрович',
                role: 'student',
                studentGroup: 'ИС-21'
            }
        ];

        for (const userData of users) {
            const existingUser = await User.findOne({ where: { email: userData.email } });
            
            if (!existingUser) {
                const passwordHash = await bcrypt.hash(userData.password, 12);
                await User.create({
                    username: userData.username,
                    email: userData.email,
                    passwordHash,
                    fullName: userData.fullName,
                    role: userData.role,
                    studentGroup: userData.studentGroup
                });
                console.log(`✓ Создан пользователь: ${userData.email} (${userData.role})`);
            } else {
                console.log(`- Пользователь уже существует: ${userData.email}`);
            }
        }

        console.log('\n=== Тестовые пользователи ===');
        console.log('Админ: admin@college.kz / admin123');
        console.log('Преподаватель: teacher@college.kz / teacher123');
        console.log('Студент: student@college.kz / student123');

        process.exit(0);
    } catch (error) {
        console.error('Ошибка:', error);
        process.exit(1);
    }
}

createUsers();
