const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const inputGuess = $('#guess');
const submitButton = $('#check');
const resultList = $('#list');
const messageDisplay = $('#message');
const randomNumberElement = $('.random-number div');

let randomNumber = Math.floor(Math.random() * 8999) + 1000;
inputGuess.maxLength = 4;
console.log(randomNumber)
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

function matchesIndex(arr1, arr2) {   
    let matches = 0;   
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] === arr2[i]) {
            matches++;
        }
    }
    return matches;
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
        const commonIndexValue =  matchesIndex(randomArray, guessArray);
        displayResult(guess, matchingCount, commonIndexValue);
        if (matchingCount  === 4 && commonIndexValue === 4) {
            showConfetti()
            const style = document.createElement('style');
            style.textContent = `
                .random-number::after {
                    display: none;
                }
                .random-number {
                    background: #b12088;
                    color: #fff; 
                    display: grid;
                    place-items: center;
                    border-radius: 0.25rem;
                }
                .random-number div {
                    line-height: 80px;
                }
            `;
            randomNumberElement.textContent = randomNumber;
            document.head.appendChild(style);
        }    
    }
}

function commonIndex(array1, array2) {
    let commonIndices = [];
    array1.forEach((num, index) => {
        const indexInArr2 = array2.indexOf(num);
        if (indexInArr2 !== -1) {
            commonIndices.push({ number: num, indexInArr1: index, indexInArr2: indexInArr2 });        
        }
    })
    const length = commonIndices.length;
    return length;
}

function displayResult(guess, matchingCount, commonIndexValue ) {
    const listItem = document.createElement('li');
    const paragraph = document.createElement('p');

    const resultMessage = matchingCount === 1 
        ? `${guess} - <span>${matchingCount}</span> Digit correct - <span>${commonIndexValue}</span> Correct positions`
        : `${guess} - <span>${matchingCount}</span> Digits correct - <span>${commonIndexValue}</span> Correct positions`;

    paragraph.innerHTML = resultMessage;
    listItem.appendChild(paragraph);
    const firstChild = resultList.firstChild;
    resultList.insertBefore(listItem, firstChild);
}


function showConfetti() {
    confetti({
        particleCount: 300,
        spread: 100,
        origin: { y: 0.6 }
    });
    confetti();
}