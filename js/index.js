window.addEventListener('DOMContentLoaded', () => {
    const calculator = require('./modules/calculator'),
          cards = require('./modules/cards'),
          forms = require('./modules/form'),
          modalWindow = require('./modules/modal-window'),
          slider = require('./modules/slider'),
          tabs = require('./modules/tabs'),
          timer = require('./modules/timer');

          tabs();
          cards();
          forms();
          modalWindow();
          slider();
          timer();
          calculator();

});