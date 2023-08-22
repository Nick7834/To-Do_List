const burger = document.querySelector('.burger');
const block = document.querySelector('.burger-block');

burger.addEventListener('click', () => {
    block.classList.toggle('open');

});


// modal 

const clicks = document.querySelector('.burger-block__button');
const modal = document.querySelector('.burger-block__modal');

clicks.addEventListener('click', () => {
   modal.classList.toggle('open');
});
