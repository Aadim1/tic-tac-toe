var allTheButtons = document.querySelectorAll('.btn');
const player1ChoiceDOM = document.querySelector('.player-1');
const player2ChoiceDOM = document.querySelector('.player-2');
const startGameButton = document.querySelector('.start-game');
const activePlayer = document.querySelector('.whose-turn');
const restartGameButton = document.querySelector('.restart-game');
var count = 0;
var checker_bool = false;
var player1Choice = 'X';
var player2Choice = 'O';

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8]
    [2, 4, 6]
];


const player1Win = [
    [
        []
    ],
    [
        []
    ],
    [
        []
    ],
    [
        []
    ],
    [
        []
    ],
    [
        []
    ],
    [
        []
    ],
    [
        []
    ],
    [
        []
    ]
]

const player2Win = [
    [
        [],
        []
    ],
    [
        [],
        []
    ],
    [
        [],
        []
    ],
    [
        [],
        []
    ],
    [
        [],
        []
    ],
    [
        [],
        []
    ],
    [
        [],
        []
    ],
    [
        [],
        []
    ],
    [
        [],
        []
    ]
]

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

const hideButton = () => {
    startGameButton.parentElement.style.display = 'none';
    allTheButtons.forEach((btns) => {
        btns.addEventListener('click', () => playTicTacToe(btns));
    });
    activePlayer.innerHTML = "Player 1 turn...";
    player1ChoiceDOM.removeEventListener('click', playerChoices);
    player2ChoiceDOM.removeEventListener('click', playerChoices);
    restartGameButton.parentElement.style.display = 'flex';
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
}



// main function
const playTicTacToe = (btns) => {
    allTheButtons = document.querySelectorAll('.btn');
    count++;
    if (checkWhoseTurnIsIt()) {
        btns.innerHTML = player1Choice;
    } else {
        btns.innerHTML = player2Choice;
    };
    btns.replaceWith(btns.cloneNode(true));

};

const restartGame = () => {
    const actives = document.querySelectorAll('.active');
    startGameButton.parentElement.style.display = 'flex';
    restartGameButton.parentElement.style.display = 'none';
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
};


startGameButton.addEventListener('click', hideButton)
player1ChoiceDOM.addEventListener('click', playerChoices);
player2ChoiceDOM.addEventListener('click', playerChoices);
restartGameButton.addEventListener('click', restartGame)