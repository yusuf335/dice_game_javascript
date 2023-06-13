'use strict';


// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnReset = document.querySelector('.btn--new');

let score, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
    // Global variable
    score = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEL.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active')
}

init();


// Switch player 
const switchPlayer = () => {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}


// Check winner 
const winner = () => {
    // Check if active score is greater than or equal to 100
    if (score[activePlayer] >= 100){
        playing = false;
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        diceEL.classList.add('hidden');
    } else {
        // Switch to next player
        switchPlayer();
    }
}


// Rolling dice functionality
btnRoll.addEventListener('click', () => {
    // Check if playing
    if (playing){
        // Generting dice value
        const dice = Math.trunc(Math.random() * 6) + 1;

        // Display the dice
        diceEL.classList.remove('hidden');
        diceEL.src = `dice-${dice}.png`;

        // Check for the roll
        if (dice !== 1){
            // Add current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else{
            // Switch to next player
            switchPlayer();
        }
    }
})


btnHold.addEventListener('click', () => {
    // check if playing
    if (playing){
        // Add current score to active player's score
        score[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];

        // Check winner
        winner();
    }
})

btnReset.addEventListener('click', () => {
    init();
})



