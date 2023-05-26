function getPasswordChecker(password) {
    return function(options) {
        if (password === options) {
            return true
        }
        return false
    }
}

const checkPassword = getPasswordChecker('суперпароль');

console.log(checkPassword('суперпароль22'));
console.log(checkPassword('супер'));
console.log(checkPassword('роль'));
console.log(checkPassword('суперпароль'));