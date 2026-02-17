const bcrypt = require('bcryptjs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Введите пароль: ', async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    
    console.log('\nPassword:', password);
    console.log('Hash:', hash);
    console.log('\nВставьте этот хеш в БД');
    
    rl.close();
});
