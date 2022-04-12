'use strict';

//* Función de reproducir el sonido al pulsar la tecla
const playSound = (e) => {
	// Constante para el archivo de audio relacionado con la keycode pulsada
	const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
	// Constante para el div que corresponde con la keycode pulsada
	const key = this.document.querySelector(`div[data-key="${e.keyCode}"]`);

	// console.log(audio);
	// console.log(key);
	audio.currentTime = 0; // Rebobina a cero el audio cuando se ejecuta el evento repetidamente
	if (!audio) return; // Parar si no hay ningún audio
	audio.play(); // Reproducir sonido al ejecutar evento de tecla
	key.classList.add('playing'); // Se añade la clase para ver efecto sobre la tecla
};

//* Función para hacer que los efectos de las teclas pulsadas no se superpongan
function removeTransition (e) {
	if (e.propertyName !== 'transform') return; // Ignorar si no es un transform
	// console.log(this);
	this.classList.remove('playing');
};

// Seleccionar todas las teclas en una lista de nodos (NodeList) de tecla
const keys = document.querySelectorAll('.key');
// Para que la transición desaparezca mediante la función removeTransition y usando transitionend
// Se ejecuta una vez la transición se ha acabado, no es necesario usar setTimeOut
keys.forEach((key) => key.addEventListener('transitionend', removeTransition));

window.addEventListener('keydown', playSound);
