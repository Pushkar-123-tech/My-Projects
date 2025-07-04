
const display = document.querySelector('.display p');
const numberButtons = document.querySelectorAll('.numbers');
const operationButtons = document.querySelectorAll('.operations .operation');
const backButton = document.getElementById('back');
const clearButton = document.getElementById('clear');
const finalanswer=document.getElementById('answer');

let currentInput = '';
let resultShown = false;

// Function to update display
function updateDisplay() {
    display.textContent = currentInput || '0';
}

// Handle number and decimal button clicks
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (resultShown && !isNaN(value)) {

            // If result is shown and number is pressed, start new input
            currentInput = value;
            resultShown = false;
            console.log(currentInput);
        } else 
        {
        
            currentInput += value;
            
            console.log(value)
        }

        updateDisplay();
    });
});



operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        const op = button.textContent.trim();

    
        if(op=== backButton.textContent.trim()) {
            // Handle backspace
            if (currentInput.length > 0) {
                currentInput = currentInput.slice(0, -1);
                if (currentInput === '') {
                    currentInput = '';
                }
            }
        } else if (op === 'C') {
            // Handle clear
            currentInput = '';
            resultShown = false;
        }
        if (op === 'C') {
            currentInput = '';
            resultShown = false;
        } 
         else {
            if (currentInput && !resultShown) {
                currentInput += ` ${op} `;
            } else if (resultShown) {
                resultShown = false;
                currentInput += ` ${op} `;
            }
        }
        updateDisplay();
    });
});

finalanswer.addEventListener('click', () => {
    try {
        // Replace any custom operators if needed (e.g., × with *, ÷ with /)
        const sanitizedInput = currentInput.replace(/×/g, '*').replace(/÷/g, '/');
        const result = eval(sanitizedInput);
        currentInput = result.toString();
        resultShown = true;
        
    } catch (e) {
        currentInput = 'ERROR!..';
         display.style.color = 'red';
       
        
        resultShown = true;
    }
    updateDisplay();
});
function updateDisplay() {
    if (currentInput === 'ERROR!..') {
        display.style.color = 'red';
    } else {
        display.style.color = ''; // Default color
    }
    display.textContent = currentInput || '0';

    
}

