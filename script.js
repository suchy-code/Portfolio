const navbarLinks = document.querySelector("nav > ul");

const links = document.querySelectorAll("nav > ul li a");

const input = document.querySelector("input[type='checkbox']");

navbarLinks.addEventListener("click", e => {
    for(let link of links) {
        if(e.target == link) {
            input.checked = true;
        }
    }
})