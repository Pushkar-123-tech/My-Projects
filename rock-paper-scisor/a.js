// Remove the following line:
// const { use } = require("react");

let userscore = 0;
let computerscore = 0;

function computerchoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

const choicesElements = document.querySelectorAll('.choice');
choicesElements.forEach(choice => {
    choice.addEventListener('click', () => {
        const userchoice = choice.getAttribute("id");
        playgame(userchoice);
    });
});

const playgame = (userchoice) => {
    console.log("user choice=", userchoice);
    const computer = computerchoice();
    console.log("computer choice=", computer);

    // Update computer choice display
    computerchoicepara.innerHTML = "computer choice: " + computer;

    if (userchoice === computer) {
        drawgame();
    } else {
        let userwin = false;
        if (
            (userchoice === 'rock' && computer === 'scissors') ||
            (userchoice === 'paper' && computer === 'rock') ||
            (userchoice === 'scissors' && computer === 'paper')
        ) {
            userwin = true;
        }
        showwinner(userwin);
    }
};

function drawgame() {
    console.log("It's a draw!");
    msz.innerHTML = "it's a draw";
    console.log("Current Score - User: " + userscore + ", Computer: " + computerscore);
}

const showwinner = (userwin) => {
    if (userwin) {
        userscore++;
        console.log("User wins! Score: " + userscore);
        msz.innerHTML = "you win";
        userscorepara.innerHTML = userscore;
        computerscorepara.innerHTML = computerscore;
    } else {
        computerscore++;
        console.log("Computer wins! Score: " + computerscore);
        msz.innerHTML = "you lose";
        userscorepara.innerHTML = userscore;
        computerscorepara.innerHTML = computerscore;
    }
    console.log("Current Score - User: " + userscore + ", Computer: " + computerscore);
};

const msz = document.querySelector("#msz");
const userscorepara = document.querySelector("#userscore");
const computerscorepara = document.querySelector("#computerscore");
const computerchoicepara= document.querySelector("#computerchoice");
computerchoicepara.innerHTML = "computer choice: " + computerchoice();