window.addEventListener('DOMContentLoaded', () => {


    // tabs

    const tabContent = document.querySelectorAll('.tabcontent');
    const tabItems = document.querySelectorAll('.tabheader__item');

    function showTab(content, index) {
        content.forEach((tab) => {
            tab.style.display = 'none';
        });
        content[index].style.display = 'block';
    }

    

    tabItems.forEach((item, index) => {
        if (item.classList.contains('tabheader__item_active')) {
            showTab(tabContent, index);
        }
        
        item.addEventListener('click', () => {
            if (item.classList.contains('tabheader__item_active')) {
                showTab(tabContent, index);
            } else {
                tabItems.forEach((i) => {
                     i.classList.remove('tabheader__item_active');
                });
               
               item.classList.add('tabheader__item_active');

               showTab(tabContent, index);
           }
        });
    });

    // timer

    const deadLine = '2020-05-20';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date());
        const days = Math.floor(t / (1000 * 60 * 60 * 24));
        const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((t / 1000 / 60) % 60);
        const seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }


    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');
        const timeInterval = setInterval(updateClock, 1000);


        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.textContent = getZero(t.days);
            hours.textContent = getZero(t.hours);
            minutes.textContent = getZero(t.minutes);
            seconds.textContent = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                days.textContent = '00';
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    }

    setClock('.timer', deadLine);

    // modal window

    const openBtns = document.querySelectorAll('[data-modal]');
    const closeBtn = document.querySelector('[data-close]');
    const modalWindow = document.querySelector('.modal');

    openBtns.forEach((button) => {
        button.addEventListener('click', () => {
           openModal(); 
        });
    });

    closeBtn.addEventListener('click', () => {
        closeModal();  
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape') {
            closeModal();
        }
    });

    function openModal() {
        modalWindow.style.display = 'block';
        document.body.style.overflow = 'hidden';

        clearInterval(modalTimerid);
    }

    function closeModal() {
        modalWindow.style.display = 'none';  
        document.body.style.overflow = '';
    }

    const modalTimerid = setTimeout(openModal, 5000);
    clearInterval(modalTimerid);

    function showModalByScrool() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.
            documentElement.scrollHeight) {
                openModal();
                window.removeEventListener('scroll', showModalByScrool);
            }
    }

    window.addEventListener('scroll', showModalByScrool);

    class Menu {
        constructor(img, altimg, title, descr, price, parentSelector) {
            this.img = img;
            this.altimg = altimg;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            element.innerHTML = `
            <div class="menu__item">
                <img src=${this.img} alt=${this.altimg}>
                <h3 class="menu__item-subtitle">Меню ${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            </div>
            `;
            this.parent.append(element);
        }
    }

    const getResource = async (url) => {
        const result = await fetch(url);

        if (!result.ok) {
            throw new Error(`Could not fetch ${url}, status: ${result.status}`);
        }

        return await result.json();
    };

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new Menu(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    const forms = document.querySelectorAll('form');
    const message = {
        loading: './original.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так'
    };

    forms.forEach((item) => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const result = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await result.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;

            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });
        }); 
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.style.display = 'none';
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.style.display = 'block';
            closeModal();
        }, 4000);
    }

    fetch('db.json')
        .then(data => data.json())
        .then(res => console.log(res));

    //slider

    const slides = document.querySelectorAll('.offer__slide');
    const prevBtn = document.querySelector('.offer__slider-prev');
    const nextBtn = document.querySelector('.offer__slider-next');
    const currentSlide = document.querySelector('#current');
    const totalSlide = document.querySelector('#total');
    const sliderWrapper = document.querySelector('.offer__slider-wrapper');
    const slidesField = document.querySelector('.offer__slider-inner');
    const width = window.getComputedStyle(sliderWrapper).width;
    let slideIndex = 0;
    let offset = 0;

    function slidesCounter() {
        currentSlide.textContent = (slideIndex + 1) < 10 ? '0' + (slideIndex + 1) : slideIndex + 1;
        totalSlide.textContent = slides.length < 10 ? '0' + slides.length : slides.length;
    }

    slidesCounter();

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    sliderWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    
    nextBtn.addEventListener('click', () => {
        slideIndex++;

        if (offset === parseInt(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += parseInt(width);
        } 

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex === slides.length) {
            slideIndex = 0;
        }

        slidesCounter();
    });

    prevBtn.addEventListener('click', () => {
        slideIndex--;

        if (offset === 0) {
            offset = parseInt(width) * (slides.length - 1);
        } else {
            offset -= parseInt(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex < 0) {
            slideIndex = slides.length - 1;
        }

        slidesCounter();
    });

    // showSlides();

    // function showSlides() {
    //     slides.forEach((slide, index) => {
    //         if (index === slideIndex) {
    //             slide.style.display = 'block';
    //         } else {
    //             slide.style.display = 'none';
    //         }
    //     });

    //     currentSlide.textContent = (slideIndex + 1) < 10 ? '0' + (slideIndex + 1) : slideIndex + 1;
        
    //     totalSlide.textContent = slides.length < 10 ? '0' + slides.length : slides.length;
    // }

    // prevBtn.addEventListener('click', () => {
    //     slideIndex--;
        
    //     if (slideIndex < 0) {
    //         slideIndex = slides.length - 1;
    //     }

    //     showSlides();
    // });

    // nextBtn.addEventListener('click', () => {
    //     slideIndex++;

    //     if (slideIndex === slides.length) {
    //         slideIndex = 0;
    //     }

    //     showSlides();
    // });

    const dotsWrapper = document.createElement('div');
    let dotsArray = [];

    for (let i = 0; i <= slides.length - 1; i++) {
        let dots = document.createElement('div');
        dots.setAttribute('data-slide-to', i + 1);
        dotsArray.push(dots);
    }

    dotsWrapper.classList.add('carousel-indicators');
    sliderWrapper.append(dotsWrapper);

    sliderWrapper.style.position = 'relative';

    dotsArray.forEach((dot) => {
        dot.classList.add('dot');
        dotsWrapper.append(dot);  
        
        toogleClass();   
    });

    nextBtn.addEventListener('click', () => {
        toogleClass();
    });

    prevBtn.addEventListener('click', () => {
        toogleClass();
    });

    function toogleClass() {
        dotsArray.forEach((dot, index) => {
            if (index === slideIndex) {
                dot.classList.add('dot-active');
            } else {
                dot.classList.remove('dot-active');
            }
        });   
    }

    dotsArray.forEach((dot) => {
        dot.addEventListener('click', (event) => {
            const slideTo = event.target.getAttribute('data-slide-to');

            slideIndex = slideTo - 1;

            offset = parseInt(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            slidesCounter();
            toogleClass();
        });
    });

    // calculator

    const result = document.querySelector('.calculating__result span');

    let sex;
    let height;
    let weight;
    let age;
    let ratio = 1.375;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);

            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '_____';
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }

    }

    calcTotal();

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (event) => {
                if (event.target.getAttribute('data-ratio')) {
                    ratio = +event.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +event.target.getAttribute('data-ratio'));
                } else {
                    sex = event.target.getAttribute('id');
                    localStorage.setItem('sex', event.target.getAttribute('id'));
                }
    
                console.log(sex, ratio);
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
    
                event.target.classList.add(activeClass);
    
                calcTotal();
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
 
    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }


            switch(input.getAttribute('id')) {
                case 'height': 
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }

            calcTotal();
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');

    calcTotal();

});