var allTheButtons = document.querySelectorAll('.btn');
const player1ChoiceDOM = document.querySelector('.player-1');
const player2ChoiceDOM = document.querySelector('.player-2');
const startGameButton = document.querySelector('.start-game');
const activePlayer = document.querySelector('.whose-turn');
const restartGameButton = document.querySelector('.restart-game');
const winner = document.querySelector('.winner');
const choseButton = document.querySelectorAll('.chose-btn');
var count = 0;
var checker_bool = false;
var player1Choice = 'X';
var player2Choice = 'O';

const winningConditions = {
    a: [0, 1, 2],
    b: [3, 4, 5],
    c: [6, 7, 8],

    d: [0, 3, 6],
    e: [1, 4, 7],
    f: [2, 5, 8],

    g: [0, 4, 8],
    h: [2, 4, 6]
};


var player1Win = [];

var player2Win = [];

// to see if the winning condition is in the array
const checkWhoWon = (playerWinCondition, whoWon) => {
    if ((player1Win.length + player2Win.length) === 9) {
        document.getElementById('modal-bg').classList.add('bg-active');
        winner.innerHTML = `Its a Tie`;
        restartGame();
    }
    for (const property in winningConditions) {
        let result = winningConditions[property].every(j => playerWinCondition.includes(j));
        if (result) {
            document.getElementById('modal-bg').classList.add('bg-active');
            winner.innerHTML = `${whoWon} Won!!!`;
            restartGame();
            break;
        }
    }
    return false;
};

// sleep time expects milliseconds
const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
}

// if true Player 1, if false player 2
const checkWhoseTurnIsIt = () => {
    if (checker_bool) {
        activePlayer.innerHTML = "Player 1 turn...";
        checker_bool = !checker_bool;
    } else {
        activePlayer.innerHTML = "Player 2 turn...";
        checker_bool = !checker_bool;
    };
    return checker_bool;
};

const initializePlayers = (player1Choice, player2Choice) => {
    const validateChoice = () => player1Choice === player2Choice ? false : true;
    const initializeChoice = () => {
        return { player1Choice, player2Choice };
    };
    if (validateChoice()) {
        return initializeChoice()
    } else {
        alert('Both player have the same choice!! No can do dumbo');
    }
};


//Starts the game
const startGame = (btns) => {
    btns.parentElement.style.display = 'none';
    document.querySelector('.how').style.display = 'none';
    allTheButtons[0].parentElement.parentElement.style.display = 'flex';
    activePlayer.innerHTML = "Player 1 turn...";
    player1ChoiceDOM.removeEventListener('click', playerChoices);
    player2ChoiceDOM.removeEventListener('click', playerChoices);
    restartGameButton.parentElement.style.display = 'flex';
    if (((btns.innerHTML).split(' vs ')[1]).replace(/\s/g, "") === 'Player') {
        allTheButtons.forEach((btns) => {
            btns.addEventListener('click', () => playerVsPlayer(btns));
        });
    } else if (((btns.innerHTML).split(' vs ')[1]).replace(/\s/g, "") === 'Human') {
        allTheButtons.forEach((btns) => {
            btns.addEventListener('click', () => AI(btns));
        });
    }
    // console.log(((btns.innerHTML).split(' vs ')[1]).replace(/\s/g, "") === 'Human')
};


//Player vs Player
const playerVsPlayer = (btns) => {
    allTheButtons = document.querySelectorAll('.btn');
    count++;
    if (checkWhoseTurnIsIt()) {
        btns.innerHTML = player1Choice;
        player1Win.push(parseInt(btns.value));
        if (count >= 5) {
            checkWhoWon(player1Win, 'Player 1');
        };
    } else {
        btns.innerHTML = player2Choice;
        player2Win.push(parseInt(btns.value));
        if (count >= 5) {
            checkWhoWon(player2Win, 'Player 2');
        };
    };
    btns.replaceWith(btns.cloneNode(true));
};


// AI Logic
async function AI(btns) {
    allTheButtons = document.querySelectorAll('.btn');
    count += 2;
    btns.innerHTML = player1Choice;
    player1Win.push(parseInt(btns.value));
    if (count >= 5) {
        checkWhoWon(player1Win, 'Player 1');
        return;
    };
    btns.replaceWith(btns.cloneNode(true));



    activePlayer.innerHTML = 'Computers turn.....';
    await sleep(2000);
    while (true) {
        const random = Math.floor(Math.random() * (8 - 0 + 1) + 0);
        if (player2Win.includes(random) || player1Win.includes(random)) {
            continue;
        } else {
            let inner_count = 0
            player2Win.push(parseInt(random));
            await sleep(500);
            allTheButtons.forEach((btns) => {
                if (inner_count === random) {
                    btns.innerHTML = player2Choice;
                    btns.replaceWith(btns.cloneNode(true));
                };
                inner_count++;
            });
            checkWhoWon(player2Win, 'Computer');
            break;
        };
    };
    activePlayer.innerHTML = 'Player 1 turn....'
};



// Lets the user choose to either play with X or O.
const playerChoices = () => {
    let value = (player1ChoiceDOM.childNodes).forEach((child) => {
        try {
            child.classList.toggle('active')
        } catch (error) {
            // to combat #text childNodes
        }

    });
    let value_ = (player2ChoiceDOM.childNodes).forEach((child) => {
        try {
            child.classList.toggle('active')
        } catch (error) {
            // to combat #text childNodes
        }

    });
    const actives = document.querySelectorAll('.active');
    const playerChoices = initializePlayers(actives[0].innerHTML, actives[1].innerHTML);
    player1Choice = playerChoices.player1Choice;
    player2Choice = playerChoices.player2Choice;
};





// restarts the game to its inital state
const restartGame = () => {
    const actives = document.querySelectorAll('.active');
    choseButton[0].parentElement.style.display = 'flex';
    restartGameButton.parentElement.style.display = 'none';
    allTheButtons[0].parentElement.parentElement.style.display = 'none';
    document.querySelector('.how').style.display = 'inherit';
    activePlayer.innerHTML = '';
    allTheButtons.forEach((btns) => {
        btns.replaceWith(btns.cloneNode(true));
    });
    allTheButtons = document.querySelectorAll('.btn');
    allTheButtons.forEach((btns) => {
        btns.innerHTML = '';
    });
    player1Choice = actives[0].innerHTML;
    player2Choice = actives[1].innerHTML;
    checker_bool = false;
    player1ChoiceDOM.addEventListener('click', playerChoices);
    player2ChoiceDOM.addEventListener('click', playerChoices);
    count = 0;
    player1Win = [];
    player2Win = [];
};



// event listeneres
choseButton.forEach((btns) => {
    btns.addEventListener('click', () => startGame(btns));
});
player1ChoiceDOM.addEventListener('click', playerChoices);
player2ChoiceDOM.addEventListener('click', playerChoices);
restartGameButton.addEventListener('click', restartGame)