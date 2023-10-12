

//navbar toggler 
let navToggler = document.getElementById('navbar-toggler');
let navCollapse = document.querySelector('.navbar-collapse');

navToggler.addEventListener('click', () => {
    navCollapse.classList.toggle('showNav');
});

// category filter 
let filterBtns = document.querySelectorAll('.btns-group button');
let filterImgs = document.querySelectorAll('.imgs-group div');

