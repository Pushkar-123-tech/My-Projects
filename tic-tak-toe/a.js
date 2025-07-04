const boxes = document.querySelectorAll('.box');
const box1 = document.querySelector('.box1');
const box2 = document.querySelector('.box2');
const box3 = document.querySelector('.box3');
const box4 = document.querySelector('.box4');
const box5 = document.querySelector('.box5');
const box6 = document.querySelector('.box6');
const box7 = document.querySelector('.box7');
const box8 = document.querySelector('.box8');
const box9 = document.querySelector('.box9');

const win = document.querySelector('.win');


// Play song.mp3 in the background
const audio = document.createElement('audio');
audio.src = 'song.mp3';
audio.loop = true;
audio.autoplay = true;
audio.style.display = 'none';
document.body.appendChild(audio);
// Create volume control slider
let volumeContainer = document.createElement('div');
volumeContainer.style.margin = '10px 0';
volumeContainer.style.display = 'flex';
volumeContainer.style.alignItems = 'center';

let volumeLabel = document.createElement('span');
volumeLabel.textContent = 'Volume:';
volumeLabel.style.marginRight = '8px';

let volumeSlider = document.createElement('input');
volumeSlider.type = 'range';
volumeSlider.min = '0';
volumeSlider.max = '1';
volumeSlider.step = '0.01';
volumeSlider.value = audio.volume;
volumeSlider.style.width = '120px';

volumeSlider.addEventListener('input', function () {
    audio.volume = parseFloat(this.value);
});

volumeContainer.appendChild(volumeLabel);
volumeContainer.appendChild(volumeSlider);
// Insert the volume control above the restart button
win.parentNode.insertBefore(volumeContainer, win.nextSibling);


// Create and add restart button
let restartBtn = document.createElement('button');
restartBtn.textContent = 'Restart';
restartBtn.style.margin = '10px';
restartBtn.style.padding = '8px 16px';
restartBtn.style.fontSize = '16px';
restartBtn.style.cursor = 'pointer';
win.parentNode.insertBefore(restartBtn, win.nextSibling);

restartBtn.addEventListener('click', () => {
    boxes.forEach(box => box.innerHTML = '');
    boxes.forEach(box => box.classList.remove('win-line'));
    win.innerHTML = '';
    count = 1;
});

let count = 1;

function checkWin() {
    const winPatterns = [
        [box1, box2, box3],
        [box4, box5, box6],
        [box7, box8, box9],
        [box1, box4, box7],
        [box2, box5, box8],
        [box3, box6, box9],
        [box1, box5, box9],
        [box3, box5, box7],
    ];
    for (const pattern of winPatterns) {
        if (
            pattern[0].innerHTML === '<i class="fas fa-times"></i>' &&
            pattern[1].innerHTML === '<i class="fas fa-times"></i>' &&
            pattern[2].innerHTML === '<i class="fas fa-times"></i>'
        ) {
            win.innerHTML = "Cross Wins";
            console.log(win.innerHTML);

            // After detecting a win
            pattern[0].classList.add('win-line');
            pattern[1].classList.add('win-line');
            pattern[2].classList.add('win-line');
            showConfetti()

        }
        if (
            pattern[0].innerHTML === '<i class="far fa-circle"></i>' &&
            pattern[1].innerHTML === '<i class="far fa-circle"></i>' &&
            pattern[2].innerHTML === '<i class="far fa-circle"></i>'
        ) {
            win.innerHTML = "Circle Wins";
            console.log(win.innerHTML);
            // After detecting a win
            pattern[0].classList.add('win-line');
            pattern[1].classList.add('win-line');
            pattern[2].classList.add('win-line');
            return true;
            showConfetti()
        }
    }
    // Draw condition: all boxes filled and no winner
    if ([...boxes].every(box => box.innerHTML !== '')) {
        win.innerHTML = "Draw!";
        console.log(win.innerHTML);
        return true;
    }
    return false;
}

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (box.innerHTML !== '' || win.innerHTML !== '') return; // prevent re-clicking or playing after win

        if (count % 2 === 0) {
            box.innerHTML = '<i class="fas fa-times"></i>'; // X
        } else {
            box.innerHTML = '<i class="far fa-circle"></i>';
        }
        if (checkWin()) {
            // Game won, do nothing more
            return;
        }
        count++;
    });
});

document.body.addEventListener('click', function playAudioOnce() {
    audio.play();
    document.body.removeEventListener('click', playAudioOnce);
});

// Note: CSS should be placed in a separate .css file, not in this JS file.

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
