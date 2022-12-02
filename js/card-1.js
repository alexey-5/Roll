
const divKorz = document.querySelector('.cart-wrapper');///Обёртка корзины

window.addEventListener('click', function (event) {

   // Прроверяем что клик по нашей кнопке "в корзину"
   if (event.target.hasAttribute('data-cart')) { // если есть такой атрибут( кнопка добавить в корзину)
      const card = event.target.closest('.card');// фикс родит элемент, содержащий карточку 
      // == Собираем данные в вмде объекта ===
      const productInfo = {
         id: card.dataset.id,
         imgSrc: card.querySelector('.product-img').getAttribute('src'),
         title: card.querySelector('.item-title').innerText,
         itemsInBox: card.querySelector('[data-items-in-box]').innerText,
         weight: card.querySelector('.price__weight').innerText,
         price: card.querySelector('.price__currency').innerText,
         counter: card.querySelector('[data-counter]').innerText
      }
      // == Ищем карточку с добавляемым id ==
      const cardSovpadenie = divKorz.querySelector(`[data-id="${productInfo.id}"]`);
      // == Если в корзине это уже есть ==
      if (cardSovpadenie) {
         let counterK = cardSovpadenie.querySelector(`[data-counter]`).innerText;
         counterK = parseInt(counterK) + parseInt(productInfo.counter);
         cardSovpadenie.querySelector(`[data-counter]`).innerText = counterK;
      }
      else {
         // == Делаем шаблон малой карточки для корзины ==
         const shablonHTML = `<div class="cart-item" data-id="${productInfo.id}">
         <div class="cart-item__top">
            <div class="cart-item__img">
               <img src="${productInfo.imgSrc}" alt="${productInfo.title}">
            </div>
            <div class="cart-item__desc">
               <div class="cart-item__title">${productInfo.title}</div>
               <div class="cart-item__weight">${productInfo.itemsInBox} / ${productInfo.weight}</div>
   
               <!-- cart-item__details -->
               <div class="cart-item__details">
   
                  <div class="items items--small counter-wrapper">
                     <div class="items__control" data-action="minus">-</div>
                     <div class="items__current" data-counter="">${productInfo.counter}</div>
                     <div class="items__control" data-action="plus">+</div>
                  </div>
   
                  <div class="price">
                     <div class="price__currency">${productInfo.price}</div>
                  </div>
   
               </div>
               <!-- // cart-item__details -->
   
            </div>
         </div>
      </div>`;
         divKorz.insertAdjacentHTML('beforeend', shablonHTML); // Примкнуть перед концом
      }
      card.querySelector('[data-counter]').innerText = '1';
      calc();
   }

   // -- Удаляем надпись "корзина пуста"
   if (divKorz.querySelector('.cart-item')) {
      document.querySelector('[data-cart-empty]').innerText = "";
      document.querySelector('.delivery-cost').classList.remove('none');
      document.querySelector('#order-form').classList.remove('none');

   }
   else { document.querySelector('[data-cart-empty]').innerText = "Корзина пуста";
   document.querySelector('.delivery-cost').classList.add('none');
   document.querySelector('#order-form').classList.add('none');
   }
   // == Считаем сумму ===
   
});

function calc(){
   let sum = 0;
   divKorz.querySelectorAll('.cart-item__details').forEach(function (item) {
      const count = item.querySelector('[data-counter]').innerText;
      const cost = item.querySelector('.price__currency').innerText;
      sum = sum + parseInt(count) * parseInt(cost);
   });
   document.querySelector('.total-price').innerText = sum;
   // == Бесплатная доставка == 
   if (sum > 2000) {
      document.querySelector('.delivery-cost').innerText = 'доставка бесплатно';
   }
   else {
      document.querySelector('.delivery-cost').innerText = '100 ₽';
   }
};
