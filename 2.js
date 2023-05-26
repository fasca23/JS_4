
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const r = readline.createInterface({ input, output });


let min=1;
let max=10; 
let randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
let maxCounter=5;


// Подключаем работу с файлами
const fs = require('fs');

function log(file) {
    if(file) {
        // Дозаписываем файл в синхронном варианте
        fs.writeFileSync(file, ""); 
    }
    return function add(line) {
        if(file) {
            // асинхронно добавляем в конец файла
            fs.appendFile(file, line, 'utf8', (err) => {
                if(err) {
                    console.log(`${err}`);
                } 
            });
        }
        console.log(line);
    };
}

console.log(`\nВас приветствует программа угадай число!!\n\nУ вас ${maxCounter} попыток.\nДля выхода наберите "Выход"\n`)

// Инициируем счетчик попыток
let counter = 1;

function play(response) {
    r.question(`Введите число от ${min} до ${max}: `, (input) => {
        let userNumber = +input;
        // Флаг ставим для того, чтоб не учитывать неправильный ввод при подсчете попыток и выводе строк "мало....", "много...."
        let flag = 0;
        if(isNaN(userNumber) || userNumber < min || userNumber > max) {
            response(`\nВвод не верен.\n`);
            flag = 1;
            play(response);
        }

        if(input === 'Выход') {
            response(`\nВы прерываете игру.... Пока...\n`);
            r.close();
            return;
        }
        // Ограничиваем количество попыток
        if(counter === maxCounter) {
            response(`\nПопытка №${counter} Увы... Количество попыток закончилось\n`);
            r.close();
            return;
        }
    
        if(userNumber === randomNumber) {
            response(`\nВы угадали число. Действительно оно равно: ${randomNumber}. Использовали попыток: ${counter}\n`);
            counter++;
            r.close();
            return;
        }
    
        if(userNumber > randomNumber && flag === 0 ) {
            response(`\nМного. Ваш ввод: ${userNumber}. Попытка №${counter}\n`);
            counter++;
        } 
        
        if(userNumber < randomNumber && flag === 0 ) {
            response(`\nМало. Ваш ввод: ${userNumber}. Попытка №${counter}\n`);
            counter++;
        }
        
        r.pause();
    // начинаем новую попытку
    play(response);
    });
}

// Запихиваем функцию в переменную
let response = log("log");
// Запускаем
play(response);