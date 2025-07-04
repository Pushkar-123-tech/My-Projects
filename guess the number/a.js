let a = Math.floor(Math.random() * 100);

const inputnumber = document.querySelector('.game input')
const help = document.querySelector('.help')
const totalattempt = document.querySelector('.totalattempt')
let attempt = 0;



function showConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti';
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.background = `hsl(${Math.random() * 360}, 80%, 60%)`;
        confetti.style.animationDelay = (Math.random() * 0.5) + 's';
        confettiContainer.appendChild(confetti);
    }
    document.body.appendChild(confettiContainer);
    setTimeout(() => {
        confettiContainer.remove();
    }, 1800);
}

function game() {
    const userGuess = Number(inputnumber.value);
    attempt++;
    if (userGuess < a) {
        help.innerHTML = "Your input is smaller than the number";
    } else if (userGuess > a) {
        help.innerHTML = "Your input is greater than the number";
    } else if (userGuess === a) {
        help.innerHTML = "You guessed the correct number!";
        showConfetti();
    } else {
        help.innerHTML = "Please enter a valid number.";
        attempt--; // Don't count invalid attempts
    }
    totalattempt.innerHTML = "Total Atempt : " + `${attempt}`;
}
const button = document.createElement('button');
button.style.width = '60px';
button.style.height = '30px';
button.innerText = "Guess";

// Insert the button right after the input field
if (inputnumber && inputnumber.parentNode) {
    inputnumber.parentNode.insertBefore(button, inputnumber.nextSibling);
}
button.addEventListener('click', () => {
    game()
})
