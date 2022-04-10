#!/home/pluzonetwo/.nvm/versions/node/v16.14.2/bin/node

const fs = require('fs/promises');
const { lstatSync } = require('fs');
const inquirer = require('inquirer');
const yargs = require('yargs');
const path = require('path');

let currentDirectory = process.cwd();

const options = yargs
    .positional('d', {
        describe: 'Path to directory',
        default: process.cwd(),
    })
    .positional('p', {
        describe: 'Pattern',
        default: '',
    }).argv;
console.log(options);

class ListItem {
    constructor(path, fileName) {
        this.path = path;
        this.fileName = fileName;
    }

    get isDir() {
        return lstatSync(this.path).isDirectory();
    }
}

const run = async () => {
    const list = await fs.readdir(currentDirectory);
    const items = list.map(fileName =>
        new ListItem(path.join(currentDirectory, fileName), fileName));

    const item = await inquirer
        .prompt([
            {
                name: 'fileName',
                type: 'list',
                message: `Choose: ${currentDirectory}`,
                choices: items.map(item => ({name: item.fileName, value: item})),
            }
        ])
        .then(answer => answer.fileName);

    if (item.isDir) {
        currentDirectory = item.path;
        return await run();
    } else {
        const data = await fs.readFile(item.path, 'utf-8');

        if (options.p == null) console.log(data);
        else {
            const regExp = new RegExp(options.p, 'utf');
            console.log(data.match(regExp));
        }
    }
};

run();



// const isFile = (fileName) => fs.lstatSync(fileName).isFile(); // метод возвращает true, если текущий файл - файл

// const fileList = fs.readdirSync(currentDirectory);
    // .filter(isFile); // сюда записываем список нужных файлов и папок

//создаем меню
// inquirer // промис
//     .prompt([
//         {
//             name: 'dirName', // название переменной, по которой будет доступно введенное пользователем значение
//             type: 'input', // тип вопроса (список в методичке)
//             message: 'Enter dir name:', // сообщение для пользователя
//             // choices: fileList, // варианты ответа для пользователя
//         }
//     ])
//     .then(({ dirName }) => {
//         console.log(dirName);
//         // const fullPath = path.join(__dirname, dirName);
//         // const data = fs.readdirSync(fullPath, 'utf-8');
//         //
//         // console.log(data);
//     })
//
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

