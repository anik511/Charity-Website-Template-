'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var getElement = {
    wrapper: document.getElementById('wrapper'),
    slides: [].concat(_toConsumableArray(document.querySelectorAll('#slide'))),
    currentSlide: document.querySelector('.slide.current'),
    nextBtn: document.querySelector('.slider__btn--next'),
    prevBtn: document.querySelector('.slider__btn--prev'),
    indicators: [].concat(_toConsumableArray(document.querySelectorAll('.indicators__item')))
};
var prop = {
    id: 0,
    slideTime: 2000,
    autoSlide: true
};
var autoPlayInterval = void 0;

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
    getElement[elems].forEach(function (elem) {
        elem.classList.remove(className);
    });
}

function changeSlide(num) {
    var lastSlide = getElement.slides.length - 1;
    var currentSlide = prop.id + num;
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
        autoPlayInterval = setInterval(function () {
            changeSlide(1);
        }, prop.slideTime);
    }
}

function stopAutoPlay() {
    document.getElementById('slider').addEventListener('mouseenter', function () {
        clearInterval(autoPlayInterval);
    });
    document.getElementById('slider').addEventListener('mouseleave', function () {
        autoPlay();
    });
}

function clickIndicator() {
    getElement.indicators.forEach(function (indicator) {
        indicator.addEventListener('click', function (e) {
            reset('indicators', 'active');
            e.target.classList.add('active');
            var currIndicator = e.target.dataset.slideTo * 1;
            prop.id = currIndicator;
            addClass(currIndicator);
        });
    });
}

init(prop.id);

getElement.nextBtn.addEventListener('click', function () {
    changeSlide(1);
});
getElement.prevBtn.addEventListener('click', function () {
    changeSlide(-1);
});
