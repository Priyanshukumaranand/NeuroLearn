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

const tabBtn = document.querySelectorAll(".tab");
const tab = document.querySelectorAll(".tabShow");

function tabs(panelIndex) {
    tab.forEach(function(node) {
        node.style.display = "none";
    });
    tab[panelIndex].style.display = "block";
}
tabs(0);

$(".tab").click(function(){
    $(this).addClass("active").siblings().removeClass("active");
})

const profilePictureInput = document.getElementById('profilePicture');
    const profileImage = document.getElementById('profileImage');
    const uploadContainer = document.getElementById('uploadContainer');
    const browseButton = document.getElementById('browseButton');

    browseButton.addEventListener('click', function() {
        profilePictureInput.click();
    });

    profilePictureInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profileImage.src = e.target.result;
                saveImageButton.hidden = false;
            };
            reader.readAsDataURL(file);
        }
    });

    uploadContainer.addEventListener('dragover', function(event) {
        event.preventDefault();
    });

    uploadContainer.addEventListener('drop', function(event) {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profileImage.src = e.target.result;
                saveImageButton.hidden = false;
            };
            reader.readAsDataURL(file);
        }
    });