function openModal(modalSelector, modalTimerid) {
    const modalWindow = document.querySelector(modalSelector);

    modalWindow.style.display = 'block';
    document.body.style.overflow = 'hidden';

    console.log(modalTimerid);

    if (modalTimerid) {
        clearInterval(modalTimerid);
    }
}

function closeModal(modalSelector) {
    const modalWindow = document.querySelector(modalSelector);

    modalWindow.style.display = 'none';  
    document.body.style.overflow = '';
}

function modalWindow(openSelector, modalSelector, modalTimerid) {
    const openBtns = document.querySelectorAll(openSelector);
    // const closeBtn = document.querySelector('[data-close]');
    const modalWindow = document.querySelector(modalSelector);

    openBtns.forEach((button) => {
        button.addEventListener('click', () => {
           openModal(modalSelector, modalTimerid); 
        });
    });

    // closeBtn.addEventListener('click', () => {
    //     closeModal();  
    // });

    modalWindow.addEventListener('click', (event) => {
        if (event.target === modalWindow || event.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape') {
            closeModal(modalSelector);
        }
    });


    function showModalByScrool() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.
            documentElement.scrollHeight) {
                openModal(modalSelector, modalTimerid);
                window.removeEventListener('scroll', showModalByScrool);
            }
    }

    window.addEventListener('scroll', showModalByScrool);
}

export default modalWindow;
export {closeModal};
export {openModal};