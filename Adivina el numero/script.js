'use strict';

/* console.log(document.querySelector('.message').textContent);
document.querySelector('.message').textContent = '😊Correct Number!';

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

document.querySelector('.guess').value = 5; */

// Math.trunc devuelve la parte entera
let secretNumber = Math.trunc(Math.random() * 20) + 1;

// Puntos iniciales que en cada fallo se irán restando
let score = 20;
// Highscore es la puntuación más alta, la cual debe ir variando durante el juego
let highScore = 0;

// Función para refactorizar el mensaje a mostrar
const displayMessage = message => {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  // console.log(guess, typeof guess);

  if (!guess) {
    // document.querySelector('.message').textContent =
    //   'Debes introducir un número';
    displayMessage('🚫 Debes introducir un número');

    // Cuando el juegador GANA el juego //
  } else if (guess === secretNumber) {
    // document.querySelector('.message').textContent = '😊 ¡Número Correcto';
    displayMessage('😊 ¡Número Correcto');
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }

    // REFACTORIZADO
    // Cuando el número es MAYOR/MENOR que el secreto //
  } else if (guess !== secretNumber) {
    if (score > 1) {
      /* document.querySelector('.message').textContent =
        guess > secretNumber ? '📈 ¡Demasiado Alto!' : '📉 ¡Demasiado Bajo!'; */
      displayMessage(
        guess > secretNumber ? '📈 ¡Demasiado Alto!' : '📉 ¡Demasiado Bajo!'
      );
      // Resta 1 punto por cada error y lo actualiza en el DOM
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      /**
       * Cuando ya lleguen a ser menores que 1 entonces pone el marcardor a 0
       * e indica mensaje de que se ha perdido el juego
       */
      // document.querySelector('.message').textContent = '😱 Perdiste el juego';
      displayMessage('😱 Perdiste el juego');
      document.querySelector('.number').textContent = secretNumber;
      document.querySelector('header').style.borderBottom = '7px solid #DC143C';
      document.querySelector('.score').textContent = 0;
    }
  }

  // CÓDIGO SIN REFACTORIZAR
  // else if (guess > secretNumber) {
  //   // Si los puntos son mayores que 1, sigue mostrando mensaje de TOO HIGH
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = '📈 ¡Demasiado Alto!';
  //     // Resta 1 punto por cada error y lo actualiza en el DOM
  //     score--;
  //     document.querySelector('.score').textContent = score;
  //   } else {
  //     /**
  //      * Cuando ya lleguen a ser menores que 1 entonces pone el marcardor a 0
  //      * e indica mensaje de que se ha perdido el juego
  //      */
  //     document.querySelector('.message').textContent = '😱 Perdiste el juego';
  //     document.querySelector('.score').textContent = 0;
  //   }

  //   // Cuando el número es MENOR que el secreto //
  // } else if (guess < secretNumber) {
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = '📉 ¡Demasiado Bajo!';
  //     // Resta 1 punto por cada error y lo actualiza en el DOM
  //     score--;
  //     document.querySelector('.score').textContent = score;
  //   } else {
  //     document.querySelector('.message').textContent = '😱 Perdiste el juego';
  //     document.querySelector('.score').textContent = 0;
  //   }
  // }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  // document.querySelector('.message').textContent = 'Empieza el juego...';
  displayMessage('Empieza el juego...');
  document.querySelector('.number').textContent = '?';
  document.querySelector('.score').textContent = score;
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
