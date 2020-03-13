const getElement = {
    wrapper: document.getElementById('wrapper'),
    slides: [...document.querySelectorAll('#slide')],
    currentSlide: document.querySelector('.slide.current'),
    nextBtn: document.querySelector('.slider__btn--next'),
    prevBtn: document.querySelector('.slider__btn--prev'),
    indicators: [...document.querySelectorAll('.indicators__item')],
};
const prop = {
    id: 0,
    slideTime: 2000,
    autoSlide: true,
};
let autoPlayInterval;

function init(id) {
    addClass(id);
    changeIndicator(id);
    clickIndicator();
    autoPlay();
    stopAutoPlay();
}

function addClass(numOfSlide) {
    reset('slides', 'current');
    getElement.slides[numOfSlide].classList.add('current');
}

function reset(elems, className) {
    getElement[elems].forEach((elem) => {
        elem.classList.remove(className);
    });
}

function changeSlide(num) {
    const lastSlide = getElement.slides.length - 1;
    let currentSlide = prop.id + num;
    if (currentSlide > lastSlide) {
        currentSlide = 0;
    }
    if (currentSlide < 0) {
        currentSlide = lastSlide;
    }
        prop.id = currentSlide;
        addClass(currentSlide);
        changeIndicator(currentSlide);
}

function changeIndicator(id) {
    reset('indicators', 'active');
    getElement.indicators[id].classList.add('active');
}

function autoPlay() {
    if (prop.autoSlide) {
        autoPlayInterval = setInterval(() => {
            changeSlide(1);
        }, prop.slideTime);
    }
}

function stopAutoPlay() {
    document.getElementById('slider').addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });
    document.getElementById('slider').addEventListener('mouseleave', () => {
        autoPlay();
    });
}

function clickIndicator() {
    getElement.indicators.forEach((indicator) => {
        indicator.addEventListener('click', (e) => {
            reset('indicators', 'active');
            e.target.classList.add('active');
            const currIndicator = e.target.dataset.slideTo * 1;
            prop.id = currIndicator;
            addClass(currIndicator);
        });
    });
}

init(prop.id);

getElement.nextBtn.addEventListener('click', () => {
   changeSlide(1);
});
getElement.prevBtn.addEventListener('click', () => {
    changeSlide(-1);
});