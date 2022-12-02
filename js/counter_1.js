// == Находим кнопки и цифру
const btnPlus = document.querySelector('[data-action="plus"]');
const btnMinus = document.querySelector('[data-action="minus"]');
const count = document.querySelector('[data-counter]');

// == Считаем  btnPlus ==
btnPlus.addEventListener('click',function(){
   count.innerText = ++count.innerText;
});
// == Считаем  btnMinus ==
btnMinus.addEventListener('click',function(){
   if(parseInt(count.innerText)>1){
      count.innerText = --count.innerText;
   }
});
