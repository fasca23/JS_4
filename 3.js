
// подключаем process
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const r = readline.createInterface({ input, output });


let min=10;
let max=20;
let maxCounter=5;
// Загадываем число в заданном диапазоне
let randomNumber = Math.floor(Math.random() * (max - min + 1) + min);

// Подключаем работу с файлами
const fs = require('fs');

async function writeInLog(text) {
// Ждем записи
  await fs.promises.appendFile("log", text, {
    encoding: 'utf8'
  });

}

console.log(`\nВас приветствует программа угадай число!!\n\nУ вас ${maxCounter} попыток.\nДля выхода наберите "Выход"\n`)

// Запись в файл
async function userInput() {
    let promise = new Promise(function(resolve, reject) {
        r.question(`Введите число от ${min} до ${max}: `, (input) => {
            let number = input;
            r.pause();
            return resolve(number); 
        });  
    });
    return await promise;
}

async function play() {
    // инициируем счетчик
    let counter = 0;
    while(true) {
        let input = await userInput();
        let userNumber = +input;
    // Даем возможность выйти
        if(input === 'Выход') {
            let text = `\nВы прерываете игру.... Пока...\n`;
            writeInLog(text);
            console.log(text);
            break;
        }
    // не даем вносить не числа и не числа в диапазоне заданном
        if(isNaN(userNumber) || userNumber < min || userNumber > max) {
            let text = '\nНеверный ввод\n';
            writeInLog(text);
            console.log(text);
            continue;
        }
    // Добавляем к счетчику 1
        counter++;
    // Ограничиваем количество попыток
        if(counter === maxCounter) {
            let text = `\nПопытка №${counter} Увы... Количество попыток закончилось\n`;
            writeInLog(text);
            console.log(text);
            break;
        }
    // Чего делаем когда угадал
        if(userNumber === randomNumber) {
            let text = `\nТы угадал! \nЗагадано было число: ${randomNumber}. \nС ${+counter} попытки: \n`;
            writeInLog(text);
            console.log(text);
            break;
        }
    
        if(userNumber > randomNumber) {
            let text = `\nМного! Вы ввели: ${userNumber}. Попытка №${counter}\n`;
            writeInLog(text);
            console.log(text);

        } 

        if(userNumber < randomNumber) {
                let text = `\nМало! Вы ввели: ${userNumber}. Попытка №${counter}\n`;
            writeInLog(text);
            console.log(text);
        }
    }
    // Закрываем запись в файл при выходе из функции
    r.close();
}
// Запускаем
play();