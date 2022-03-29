#!/home/pluzonetwo/.nvm/versions/node/v16.14.2/bin/node

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const currentDirectory = process.cwd();

const isFile = fileName => { // вернет true, если входящий аргумент - файл, false, если папка
    return fs.lstatSync(fileName).isFile(); // сюда передается имя, которое нужно проверить на соответствие файлу или папке
}

const list = fs.readdirSync(currentDirectory).filter(isFile); // сюда записываем список нужных файлов и папок

//создаем меню
inquirer // промис
    .prompt([{
        name: 'fileName', // название переменной, по которой будет доступно введенное пользователем значение
        type: 'list', // тип вопроса (список в методичке)
        message: 'Choose file:', // сообщение для пользователя
        choices: list, // варианты ответа для пользователя
    }])
    .then((answer) => {
        console.log(answer.fileName);
        const filePath = path.join(currentDirectory, answer.fileName);

        fs.readFile(filePath, 'utf-8', (err, data) => {
            console.log(data);
        });
    });

// const rl = readLine.createInterface({ // создаем интерфейс ридлайна
//     input: process.stdin, // потоки консоли, входящие/исходящие
//     output: process.stdout,
// });
//
// rl.question('Please enter the path to the file: ', (inputedPath) => {
//     const filePath = path.join(__dirname, inputedPath); // при помощи модуля path формируем путь к файлу
//
//     fs.readFile('./access.log/', 'utf-8', (err, data) => {
//         console.log(data);
//
//         rl.close();
//     });
//
// });
//
// rl.on('close', () => { // создаем обработчик, который будет завершать работу приложения
//     process.exit(0);
// });

// const options = yargs
//     .usage('Usage: -p <path>') // подсказка для пользователя как запустить приложение
//     .option('p', { // название ключа
//         alias: 'path', // псевдоним-синоним для ключа p
//         describe: 'Path to file', // описание текущего ключа
//         type: 'string', // здесь можно указать тип, который мы хотим использовать
//         demandOption: true, // указывает на обязательность переменной (по умолч. false)
//     })
//     .argv;

