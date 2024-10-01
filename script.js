const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

const inputGuess = $('#guess');
const submit = $('#check');
const list = $('#list');
const message = $('#message');
// const randomNumber = Math.floor(Math.random() * 8999) + 1000;
let randomNumber = 3456;
inputGuess.maxLength = 4;

check.addEventListener('click', validateNumber);
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') validateNumber()
});

function arrayRandomNumber(num) {
    return Array.from(String(num), Number);
}

function setValidity(x) { 
    message.textContent = x;
};

function compareNumbers(num1, num2){
    console.log(num1, num2);
}

function validateNumber() {
    let guess = inputGuess.value;
    if (/[^0-9]/.test(guess))  {
        setValidity('Please, enter only numbers')
    } else if (guess.length !== 4) {
        setValidity('Please, enter a 4-digit number')
    } else {
        setValidity('');
        const li = document.createElement('li');
        li.textContent = guess + " -";
        list.appendChild(li);
        let arrayRandom = arrayRandomNumber(randomNumber);
        let arrayGuess = arrayRandomNumber(guess);
        compareNumbers(arrayRandom, arrayGuess)
    }   
}    








