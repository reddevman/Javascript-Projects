'use strict';

/**
 * *****************************
 * SELECCIONANDO ELEMENTOS
 * DECLARANDO VARIABLES GLOBALES
 * *****************************
 */

// Player 0
const player0Block = document.querySelector('.player--0');
const player0Score = document.querySelector('#score--0');
const player0Current = document.querySelector('#current--0');
// Player 1
const player1Block = document.querySelector('.player--1');
const player1Score = document.querySelector('#score--1');
const player1Current = document.querySelector('#current--1');

const diceElement = document.querySelector('.dice');
const btn_New = document.querySelector('.btn--new');
const btn_Roll = document.querySelector('.btn--roll');
const btn_Hold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, finishedGame;

const init = function () {
  // Reseteamos las variables - IMPORTANTE -
  // Puntos del jugador que se irán actualizando y sumando
  // Array con 2 posiciones, una por jugador, que irá almacenando los puntos para cada uno
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  finishedGame = false;
  
  // Con el array agrupamos los elementos a los que se le va a hacer un textContent común
  // Setear los contadores a 0 por defecto
  [player0Current, player0Score, player1Current, player1Score].forEach(function (element) {
    element.textContent = 0;
  });
  // Se añade y quita las listas para resetear el resaltado de los bloques de color
  document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
  player0Block.classList.add('player--active');
  player1Block.classList.remove('player--active');
  
  // Eliminamos el dado cuando se inicia la página o pulsamos en nuevo juego
  diceElement.classList.add('hidden');
  
};

// Inicializar la función de reseteo con la carga del script
init();

// Función para cambiar de jugador, refactorizada
const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Block.classList.toggle('player--active');
  player1Block.classList.toggle('player--active');
};

/**
 * **********************
 * TIRAR EL DADO CON ROLL
 * **********************
 */
btn_Roll.addEventListener('click', function () {
  // Si el juego no ha terminado (un jugador no ha ganado aún)
  if (!finishedGame) {
    // 1. Generar el número aleatorio
    const randomDice = Math.trunc(Math.random() * 6 + 1);

    // 2. Mostrar el dado y cambiar la imagen según la tirada
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${randomDice}.png`;

    // 3. Comprobar la tirada en 1: si da true cambiar de jugador
    /**
     * Si entra en el else, cambia el jugador activo, resetea contador y de nuevo al hacer
     * una tirada y salga distinto a 1 entonces empieza a sumar para ese jugador actual, es
     * decir, entra de nuevo en la condición
     */
    if (randomDice != 1) {
      // Añadir puntos al jugador actual
      currentScore += randomDice;
      document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
    } else {
      // Ver función refactorizada arriba ⏫
      // Cambia al siguiente jugador y setea current a 0
      document.querySelector(`#current--${activePlayer}`).textContent = 0;
      // Mediante ternario alterna entre el 1 y el 0 según quién esté activo
      currentScore = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      player0Block.classList.toggle('player--active');
      player1Block.classList.toggle('player--active');
    }
  }
});

/**
 * ***********************
 * PASAR EL TURNO CON HOLD
 * ***********************
 */
btn_Hold.addEventListener('click', function () {
  // Si el juego no ha terminado (un jugador no ha ganado aún)
  if (!finishedGame) {
    // 1. Añade los puntos actuales a los totales del jugador
    // Se añaden los puntos al array cuya posición es el jugador actual
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore
    document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];

    // 2. Comprueba si el jugador tiene al menos >=100 puntos
    if (scores[activePlayer] >= 20) {
      // Si se alcanza el límite, se da el juego por terminado
      finishedGame = true;
      // y el dado debe desaparecer
      diceElement.classList.add('hidden');

      // Se acaba el juego
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
      // Cambia al siguiente jugador
      // Al tenerlo en el else si un jugador gana no se va a mostrar como activo el otro jugador
      switchPlayer();
    }
  }
});

/**
 * ******************************
 * RESETEAR EL JUEGO CON NEW GAME
 * ******************************
 */
btn_New.addEventListener('click', init);
