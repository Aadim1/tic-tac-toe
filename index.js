const allTheButtons = document.querySelectorAll('.btn');
const player1ChoiceDOM = document.querySelector('.player-1');
const player2ChoiceDOM = document.querySelector('.player-2');
const startGameButton = document.querySelector('.start-game');
const actives = document.querySelectorAll('.active');

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


const initializePlayers = (player1Choice, player2Choice) => {
    let player1;
    let player2;

    const validateChoice = () => player1Choice === player2Choice ? false : true;
    const initializeChoice = () => {
        player1 = player1Choice;
        player2 = player2Choice;
    };
    const hideButton = () => {
        startGameButton.style.display = 'none';
        startGameButton.parentElement.style.display = 'none';
    }
    if (validateChoice()) {
        initializeChoice();
        hideButton();
        return { player1, player2 };
    } else {
        return 'Both player have the same choice!! No can do dumbo';
    }
};

const getPlayerChoices = () => {
    initializePlayers(actives[0].innerHTML, actives[1].innerHTML)
}

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
};


startGameButton.addEventListener('click', getPlayerChoices)
allTheButtons.forEach((btns) => {
    btns.addEventListener('click', () => console.log('works'))
});
player1ChoiceDOM.addEventListener('click', playerChoices);
player2ChoiceDOM.addEventListener('click', playerChoices);