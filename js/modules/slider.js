function slider({slide, nextButton, prevButton, totalCounter, currentCounter, wrapper, field}) {
    const slides = document.querySelectorAll(slide);
    const prevBtn = document.querySelector(prevButton);
    const nextBtn = document.querySelector(nextButton);
    const currentSlide = document.querySelector(currentCounter);
    const totalSlide = document.querySelector(totalCounter);
    const sliderWrapper = document.querySelector(wrapper);
    const slidesField = document.querySelector(field);
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
}

export default slider;