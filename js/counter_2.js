//===  Слушаем любой клик по окну ===
window.addEventListener('click', function (event) {
   // Выбираем элемент клика ( только с нужным селектором)
   if (event.target.dataset.action === 'plus') {
      // Выбираем родителя с нужным селектором
      const wrap = event.target.closest('.counter-wrapper');
      const counter = wrap.querySelector('[data-counter]');
      counter.innerText = ++counter.innerText;
      calc();
   }
   if (event.target.dataset.action === 'minus') {
      const wrap = event.target.closest('.counter-wrapper');
      const counter = wrap.querySelector('[data-counter]');
      if (parseInt(counter.innerText) > 1) {
         counter.innerText = --counter.innerText;
         calc();
      }
        // == Удаление заказа из корзины ==
      else if(event.target.closest('.items--small') && parseInt(counter.innerText) === 1){
         counter.innerText = --counter.innerText;
         calc();
         event.target.closest('.cart-item').remove();
      }
   }
});