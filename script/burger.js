const burger = document.querySelector('.burger');
const block = document.querySelector('.burger-block');

burger.addEventListener('click', () => {
    block.classList.toggle('open');
});

document.addEventListener('click', e => {
    if(!e.target.closest('.burger-block') && !e.target.closest('.burger')) {
        block.classList.remove('open');
    }
});

document.addEventListener('keydown', e => {
    if(e.key === 'Escape') {
        block.classList.remove('open');
    }
});
