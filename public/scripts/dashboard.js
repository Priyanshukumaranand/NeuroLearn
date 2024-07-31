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


const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        spans.forEach((span, index) => {
            const percentage = percentages[index];
            if (entry.isIntersecting) {
                span.classList.add('animate');
                percentage.classList.add('animate');
            } else {
                span.classList.remove('animate');
                percentage.classList.remove('animate');
            }
        });
    });
});

const skillContainer = document.querySelector('.skills-container');
const spans = document.querySelectorAll('.bar span');
const percentages = document.querySelectorAll('.percentage');
observer.observe(skillContainer);

function updatePercentagePositions() {
    const barWidth = document.querySelector('.bar').clientWidth;
    percentages.forEach(percentage => {
        const widthPercentage = parseFloat(percentage.textContent) / 100;
        percentage.style.left = `${barWidth * widthPercentage - 12.5}px`;
    });
}

updatePercentagePositions(); 