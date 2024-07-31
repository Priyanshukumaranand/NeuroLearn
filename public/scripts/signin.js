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
