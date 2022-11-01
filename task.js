'use strict';

const shoppingCart = {};

const totalValueEl = document.querySelector('.basketTotalValue');

//Сохраняю значение хранящееся в span, у которого есть предок с классом .cartIconWrap
const cartIconEl = document.querySelector('div .cartIconWrap > span');

const cartTotalEl = document.querySelector('.basketTotal');
const cartEl = document.querySelector('.basket');

document.querySelector('.cartIconWrap').addEventListener(
    'click', () => {
        cartEl.classList.toggle('hidden');
    });

document.body.addEventListener('click', event => {
    const buttonEl = event.target;
    if (!buttonEl.parentElement.closest('.buyButton')) {
        return;
    }
    const dataItemEl = buttonEl.closest('div .featuredItem');
    const priсeEl = dataItemEl.querySelector('.featuredPrice');

    const id = +dataItemEl.dataset.id;

    //Получение и сохранение названия товара из HTML
    const name = dataItemEl.querySelector('.featuredName').textContent;

    /*С помощью регулярного выражения достаю только значение цены, 
    без лишних символов*/
    const price = parseFloat(
        priсeEl.textContent.match(/(\d+).(\d+)/)[0]).toFixed(2);

    addToCart(id, name, price);
});

/**
 * Функция добавляет товар в корзину.
 * @param {number} id - id товара.
 * @param {string} name - Название товара.
 * @param {number} price - Цена товара.
 */
function addToCart(id, name, price) {
    if (!(id in shoppingCart)) {
        shoppingCart[id] = { id: id, name: name, price: price, count: 0 };
    }

    shoppingCart[id].count++;

    // Обновляем значение у иконки количества товаров
    cartIconEl.textContent = getTotalGoodsCount().toString();

    // Обновляем общую сумму всех товаров
    totalValueEl.textContent = getTotalCartPrice().toFixed(2);

    renderProductInBasket(id);
}

/**
 * Производит подсчет товаров в корзине.
 * @return {number} - Количество товаров в корзине.
 */
function getTotalGoodsCount() {
    return Object.values(shoppingCart).reduce((
        acc, product) => acc + product.count, 0);
}

/**
 * Производит подсчет итоговой цены всех добавленных товаров.
 * @return {number} - Возвращает общую цену всех товаров.
 */
function getTotalCartPrice() {
    return Object
        .values(shoppingCart)
        .reduce((acc, product) => acc + product.price * product.count, 0);
}

/**
 * Отрисовывает в корзину информацию о продукте.
 * @param {number} productId - Id продукта.
 */
function renderProductInBasket(productId) {
    const cartRowEl = cartEl
        .querySelector(`.basketRow[data-id="${productId}"]`);
    if (!cartRowEl) {
        const productRow = `
        <div class="basketRow" data-id="${productId}">
        <div>${shoppingCart[productId].name}</div>
        <div>
            <span class="productCount">${shoppingCart[productId].count}</span> шт.
        </div>
        <div>$${shoppingCart[productId].price}</div>
        <div>
            $<span class="productTotalRow">${(shoppingCart[productId].price *
                shoppingCart[productId].count).toFixed(2)}</span>
        </div>
        </div>
        `;
        cartTotalEl.insertAdjacentHTML("beforebegin", productRow);
        return;
    }

    // Получение данных по нужному товару из объекта shoppingCart
    const product = shoppingCart[productId];

    // Обновление количество одинаковых товаров в корзине
    cartRowEl.querySelector('.productCount').textContent = product.count;

    // Обновление суммы цен одинаковых товаров в корзине
    cartRowEl
        .querySelector('.productTotalRow')
        .textContent = (product.price * product.count).toFixed(2);
}