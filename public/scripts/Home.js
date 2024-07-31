document.addEventListener('DOMContentLoaded', () => {
    const menubtn = document.querySelector('.menubtn');
    const menu = document.querySelector('.menu');
    const dropdownIcon = document.querySelector('.icon');
    const dropdownContent = document.querySelector('.dropdown-content');

    menubtn.addEventListener('click', () => {
        menu.classList.toggle('show');
    });

    dropdownIcon.addEventListener('click', (event) => {
        event.stopPropagation();
        dropdownContent.classList.toggle('show');
    });

    window.onclick = (event) => {
        if (!event.target.matches('.icon') && !event.target.matches('.icon i')) {
            const dropdowns = document.getElementsByClassName('dropdown-content');
            for (let i = 0; i < dropdowns.length; i++) {
                const openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    };
});

// COUNTDOWN
let allValues = document.querySelectorAll(".value");

allValues.forEach((singleValue) => {
    let startValue = 0;
    let endValue = parseInt(singleValue.getAttribute("data-value"));
    let duration = Math.floor(2000 / endValue);

    let counter = setInterval(function () {
        startValue += 1;
        singleValue.textContent = startValue;

        if (startValue == endValue) {
            clearInterval(counter);
        }
    }, duration);
});

// FEATURES

const modalViews = document.querySelectorAll('.services__modal'),
    modalBtns = document.querySelectorAll('.services__button'),
    modalClose = document.querySelectorAll('.services__modal-close')

let modal = function (modalClick) {
    modalViews[modalClick].classList.add('active-modal')
}

modalBtns.forEach((mb, i) => {
    mb.addEventListener('click', () => {
        modal(i)
    })
})

modalClose.forEach((mc) => {
    mc.addEventListener('click', () => {
        modalViews.forEach((mv) => {
            mv.classList.remove('active-modal')
        })
    })
})

// TESTIMONIALS
$('.testimonials-container').owlCarousel({
    loop: true,
    autoplay: true,
    autoplayTimeout: 6000,
    margin: 10,
    nav: true,
    navText: ["<i class='fa-solid fa-arrow-left'></i>",
        "<i class='fa-solid fa-arrow-right'></i>"],
    responsive: {
        0: {
            items: 1,
            nav: false
        },
        600: {
            items: 1,
            nav: true
        },
        768: {
            items: 2
        },
    }
})