import calculating from './modules/calculator';
import cards from './modules/cards';
import forms from './modules/form';
import modalWindow from './modules/modal-window';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import {openModal} from './modules/modal-window';

window.addEventListener('DOMContentLoaded', () => {

    const modalTimerid = setTimeout(() => {
        openModal('.modal', modalTimerid);
    }, 5000);

    clearInterval(modalTimerid);

    tabs('.tabheader__item', '.tabcontent', 'tabheader__item_active');
    cards();
    forms('form', modalTimerid);
    modalWindow('[data-modal]', '.modal', modalTimerid);
    slider({
        slide: '.offer__slide',
        nextButton: '.offer__slider-next',
        prevButton: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    timer('.timer', '2020-06-11');
    calculating();
});