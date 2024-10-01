const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const inputGuess = $('#guess');
const submitButton = $('#check');
const resultList = $('#list');
const messageDisplay = $('#message');

let randomNumber = Math.floor(Math.random() * 8999) + 1000;
inputGuess.maxLength = 4;

submitButton.addEventListener('click', validateGuess);
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') validateGuess();
});

function convertNumberToArray(num) {
    return Array.from(String(num), Number);
}

function setMessage(message) { 
    messageDisplay.textContent = message;
}

function countMatchingNumbers(arr1, arr2) {
    const countMap1 = createCountMap(arr1);
    const countMap2 = createCountMap(arr2);

    let totalCount = 0;

    countMap1.forEach((count, number) => {
        if (countMap2.has(number)) {
            totalCount += Math.min(count, countMap2.get(number));
        }
    });

    return totalCount;
}

function createCountMap(arr) {
    const countMap = new Map();
    arr.forEach(num => {
        countMap.set(num, (countMap.get(num) || 0) + 1);
    });
    return countMap;
}

function validateGuess() {
    const guess = inputGuess.value;

    if (/[^0-9]/.test(guess))  {
        setMessage('Por favor, ingrese solo números');
    } else if (guess.length !== 4) {
        setMessage('Por favor, ingrese un número de 4 dígitos');
    } else {
        setMessage(''); 

        const randomArray = convertNumberToArray(randomNumber);
        const guessArray = convertNumberToArray(guess);
        const matchingCount = countMatchingNumbers(randomArray, guessArray);
        const commonIndexValue =  commonIndex(randomArray, guessArray);
        displayResult(guess, matchingCount, commonIndexValue);
        
    }
}

function commonIndex(arr1, arr2) {
    const commonIndices = [];
    let commonIndex = 0;
    arr1.forEach((num, index) => {
        const indexInArr2 = arr2.indexOf(num);
        if (indexInArr2 !== -1) {
            commonIndices.push({ number: num, indexInArr1: index, indexInArr2: indexInArr2 });        
        }
        if (index === indexInArr2) {
            commonIndex++
        }
    })
    return commonIndex;
}


function displayResult(guess, matchingCount, commonIndexValue ) {
    const listItem = document.createElement('li');
    const paragraph = document.createElement('p');

    const resultMessage = matchingCount === 1 
        ? `${guess} - <span>${matchingCount}</span> Número coincide - <span>${commonIndexValue}</span> posiciones`
        : `${guess} - <span>${matchingCount}</span> Números coinciden - <span>${commonIndexValue}</span> posiciones`;

    paragraph.innerHTML = resultMessage;
    listItem.appendChild(paragraph);
    resultList.appendChild(listItem);
}

// const randomElement = $('#random');
// randomElement.textContent = randomNumber;