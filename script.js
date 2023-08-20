'use strict';

//Seleting elements
const player0Ele = document.querySelector('.player--0');
const player1Ele = document.querySelector('.player--1');
const Score0Ele = document.querySelector('#score--0');
const Score1Ele = document.getElementById('score--1');
const Cscore0Ele = document.getElementById('current--0');
const Cscore1Ele = document.getElementById('current--1');
const diceEle = document.querySelector('.dice');
const btnNewEle = document.querySelector('.btn--new');
const btnRollEle = document.querySelector('.btn--roll');
const btnHoldEle = document.querySelector('.btn--hold');

//Starting Conditions
Score0Ele.textContent = 0;
Score1Ele.textContent = 0;

// Scores after hold // active player holder// Current score var.
let scores, activePlayer,currentScore,playing;
  


//init function | startting conditions
function init() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    
    Score0Ele.textContent = 0;
    Score1Ele.textContent = 0;
    Cscore0Ele.textContent = 0;
    Cscore1Ele.textContent = 0;
    diceEle.classList.add('hidden');

    player0Ele.classList.add('player--active');
    player0Ele.classList.remove('player--winner');
    player1Ele.classList.remove('player--active');
    player1Ele.classList.remove('player--winner');
}
init();
//switching player funtion
const switchPlayer = () => {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0Ele.classList.toggle('player--active');
    player1Ele.classList.toggle('player--active');
    currentScore = 0;
}
//Rolling dice func.
btnRollEle.addEventListener('click', function () {
    if (playing) {
        // 1. Generating random roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        console.log(dice);

        // 2. Displaying dice
        diceEle.classList.remove('hidden');
        diceEle.src = `./Dice/dice-${dice}.png`;

        // 3. check for rolled 1 ? switch player(else) : ""(if)
        if (dice !== 1) {
            //Add dice to current store
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else {
            //switch player
            switchPlayer();
        }
    }
});

//Hold func.
btnHoldEle.addEventListener('click', function () {

    if (playing) {
        // 1. Add CS to TS
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        // 2. Check if TS >= 100?finish game : switch player
        if (scores[activePlayer] >= 10) {
            //finish 
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            diceEle.classList.add('hidden');
        }
        // 3. Switch to next player
        else
            switchPlayer();
    }
});

//New game | state intial condtions
btnNewEle.addEventListener('click', init);