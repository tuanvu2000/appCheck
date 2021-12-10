const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const iconMenu = $('.header__menu');
const iconClose = $('.nav__close');
const overlay = $('.overlay');
const navMenu = $('.header__nav');
const navItems = $$('.nav__item');

iconMenu.addEventListener('click', function() {
    navMenu.classList.add('show');
    overlay.classList.add('show');
})

iconClose.addEventListener('click', function() {
    navMenu.classList.remove('show');
    overlay.classList.remove('show');
})

overlay.addEventListener('click', function() {
    // console.log(this);
})

navItems.forEach(item => {
    
})

