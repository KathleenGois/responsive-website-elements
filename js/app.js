// -------------------------------------
// -------------------------------------
// Menu on mobile

const TOGGLE_MENU = document.getElementById('toggle-menu');
const NAV_MENU = document.getElementById('nav__menu');

document.onclick = function(e){
    if(e.target.id !== 'nav__menu' && e.target.id !== 'toggle-menu') {
        NAV_MENU.classList.remove('active');
    }
}

TOGGLE_MENU.onclick = function(){
    NAV_MENU.classList.toggle('active');
}

// -------------------------------------
// -------------------------------------
// Back to top

const BACK_TO_TOP = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if(window.pageYOffset > 200) {
        BACK_TO_TOP.classList.add('active');
    } else {
        BACK_TO_TOP.classList.remove('active');
    }
});

// -------------------------------------
// -------------------------------------
// Lightbox for grid images

const IMAGES_ON_GRID = document.querySelectorAll('.grid-gallery__image');
const LIGHTBOX = document.querySelector('.lightbox');
const LIGHTBOX_CLOSE = document.querySelector('.lightbox__close');
const LIGHTBOX_IMAGE = document.querySelector('.lightbox__image');
const LB_ARROW_PREVIOUS = document.querySelector('.lightbox__arrow--previous');
const LB_ARROW_NEXT = document.querySelector('.lightbox__arrow--next');

let currentImageIndex;

const showPreviousImage = () => {
    if (currentImageIndex === 0) {
        currentImageIndex = IMAGES_ON_GRID.length -1;
    } else {
        currentImageIndex--;
    }
    LIGHTBOX_IMAGE.src = IMAGES_ON_GRID[currentImageIndex].src;
};

const showNextImage = () => {
    if (currentImageIndex === IMAGES_ON_GRID.length -1) {
        currentImageIndex = 0;
    } else {
        currentImageIndex++;
    }
    LIGHTBOX_IMAGE.src = IMAGES_ON_GRID[currentImageIndex].src;
};

const closeLightbox = () => {
    LIGHTBOX.classList.add('fadeout');
    setTimeout(() => {
        LIGHTBOX.classList.add('hidden');
        LIGHTBOX.classList.remove('fadeout');
    }, 300);
};


IMAGES_ON_GRID.forEach((image, index) => {
    image.addEventListener('click', (e) => {
        LIGHTBOX.classList.remove('hidden');
        LIGHTBOX_IMAGE.src = e.target.src;
        currentImageIndex = index;
    });
});

LIGHTBOX_CLOSE.addEventListener('click', closeLightbox);

LB_ARROW_PREVIOUS.addEventListener('click', showPreviousImage);

LB_ARROW_NEXT.addEventListener('click', showNextImage);

document.addEventListener('keydown', (e) => {
    if (!LIGHTBOX.classList.contains('hidden')) {
        if (e.code === 'ArrowLeft' || e.keyCode === 37) {
            showPreviousImage();
        }
        
        if (e.code === 'ArrowRight' || e.keyCode === 39) {
            showNextImage();
        }
    
        if (e.code === 'Escape' || e.keyCode === 27) {
            closeLightbox();
        }
    }
});

LIGHTBOX.addEventListener('click', (e) => {
    if (e.target === LIGHTBOX) {
        closeLightbox();
    }
});

// -------------------------------------
// -------------------------------------
// Image gallery slider

const SLIDER_ARROW_PREVIOUS = document.querySelector('.slider__arrow--previous');
const SLIDER_ARROW_NEXT = document.querySelector('.slider__arrow--next');

let activeSlideNumber = 1;
let activeDotNumber = activeSlideNumber;

let hideActiveSlide = ()=> {
    let activeElement = document.querySelector('.slide-active');
    activeElement.classList.remove('slide-active');
}

let showSlide = (slideNumber) => {
    hideActiveSlide();
    document.querySelector('#slide' + slideNumber).classList.add('slide-active');
}

let deactivateDot = () => {
    let activeDot = document.querySelector('.dot-active');
    activeDot.classList.remove('dot-active');
}

let activateDot = (dotNumber) => {
    deactivateDot();
    document.querySelector('#dot' + dotNumber).classList.add('dot-active');
}

let showNextSlide = () => {
    if (activeSlideNumber === 5) {
        activeSlideNumber = 1;
        activeDotNumber = activeSlideNumber;
    } else {
        activeSlideNumber += 1;
        activeDotNumber = activeSlideNumber;
    }
    showSlide(activeSlideNumber);
    activateDot(activeDotNumber);
};

let showPreviousSlide = () => {
    if (activeSlideNumber === 1) {
        activeSlideNumber = 5;
        activeDotNumber = activeSlideNumber;
    } else {
        activeSlideNumber -= 1;
        activeDotNumber = activeSlideNumber;
    }
    showSlide(activeSlideNumber);
    activateDot(activeDotNumber);
};

for(let i = 1; i <= 5; i++) {
    let showSlideI = () => {
        activeSlideNumber = i;
        showSlide(i);
        activateDot(i);
    };
    document.querySelector('#dot' + i).addEventListener('click', showSlideI);
}

SLIDER_ARROW_PREVIOUS.addEventListener('click', showPreviousSlide);
SLIDER_ARROW_NEXT.addEventListener('click', showNextSlide);

// -------------------------------------
// -------------------------------------
// Horizontal tabs

const TABS = document.querySelectorAll('[data-tab-target]');
const TAB_CONTENTS = document.querySelectorAll('[data-tab-content]');

console.log(TABS);

TABS.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.tabTarget);
        TAB_CONTENTS.forEach(tabContent => {
            tabContent.classList.remove('tab-active');
        });
        TABS.forEach(tab => {
            tab.classList.remove('tab-active');
        });
        tab.classList.add('tab-active');
        target.classList.add('tab-active');
    })
});

// -------------------------------------
// -------------------------------------
// Accordion tabs

const ACCORDION_BUTTONS = document.querySelectorAll('.accordion__button');

ACCORDION_BUTTONS.forEach(button => {
    button.addEventListener('click', () => {
        const accordionContent = button.nextElementSibling;
        button.classList.toggle('accordion__button--active');

        if (button.classList.contains('accordion__button--active')) {
            accordionContent.classList.add('accordion__content--active');
        } else {
            accordionContent.classList.remove('accordion__content--active');
        }
    });
});