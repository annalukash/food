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

    function showModalByScrool() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.
            documentElement.scrollHeight) {
                openModal();
                window.removeEventListener('scroll', showModalByScrool);
            }
    }

    window.addEventListener('scroll', showModalByScrool);

});