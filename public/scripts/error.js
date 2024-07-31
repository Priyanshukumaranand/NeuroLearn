const resultsBox = document.querySelector(".result-box");
const inputBox = document.getElementById("input-box");

const links = [
    {
        href: "www.example.com/faqs",
        text: "Frequently asked questions",
    },
    {
        href: "www.example.com/blog/article",
        text: "Article Title",
    },
    {
        href: "www.example.com/contact",
        text: "Contact",
    },
];

inputBox.onkeyup = function () {
    let result = [];
    let input = inputBox.value;
    if (input.length) {
        result = links.filter((link) => {
            return link.text.toLowerCase().includes(input.toLowerCase());
        });
    }
    display(result);
}

function display(result) {
    if (result.length) {
        const content = result.map((list, index) => {
            const href = list.href;
            return `<li><a href="${href}">${list.text}</a></li>`;
        });
        resultsBox.innerHTML = `<ul>${content.join('')}</ul>`;
    } else {
        resultsBox.innerHTML = '';
    }
}