'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnShowModal = document.querySelectorAll('.show-modal');

// Expresión de Función para remover la clase hidden
const openModal = function () {
  console.log('Modal Window abierta');
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};


// Expresión de  Función para añadir la clase hidden
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};


// Se recorre el array que recoge btnShowModal para hacer un evento por elemento
for (let i = 0; i < btnShowModal.length; i++) {
  btnShowModal[i].addEventListener('click', openModal);
}

// SIN REFACTORIZAR
// btnCloseModal.addEventListener('click', function () {
//   hideModal(modal, overlay);
// });

// overlay
//   .addEventListener('click', function () {
//     hideModal(modal, overlay);
//   })

/**
 * REFACTORIZADO
 * Los elementos que van a tener el mismo evento se meten en [] como
 * si fuera un array de elementos.
 * Se recorre dicho array con un foreach y eso hace que para cada elemento,
 * se le asocie el mismo evento 'click' con la misma función
 */
[btnCloseModal, overlay].forEach(element => {
  element.addEventListener('click', closeModal);
});

// Evento de teclado keydown (el más común) al pulsar la tecla ESC
/**
 * Cuando se crea un addEventListener Javascript genera un objeto del evento creado
 * (keydown), el cual nosotros podemos pasar como parámetro a la función
 * de dicho evento (event o e) la cual está esperando a que se cumpla el evento.
 * En este caso es necesario añadir el evento en la función como parámetro ya que se debe saber
 * qué tecla en concreto se ha pulsado.
 */
document.addEventListener('keydown', function (event) {
  console.log('Una tecla fue pulsada');
  console.log(event);

  // key es una propiedad del objeto del evento
  if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
    console.log('Tecla ESC pulsada');

    closeModal();
  }
});
