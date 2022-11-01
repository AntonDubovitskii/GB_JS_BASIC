'use strict';

let purchases = 0;

const totlaValueEl = document.querySelector('.basketTotalValue');
const cartIconEl = document.querySelector('div .cartIconWrap > span');

console.log(cartIconEl.textContent);

document.body.addEventListener('click', event => {
    const buttonEl = event.target;
    if (!buttonEl.classList.contains('buyButton')) {
        return;
    }
    const a = buttonEl.closest('div .featuredItem').querySelector(
        '.featuredPrice').textContent;
    let matches = parseFloat(a.match(/(\d+).(\d+)/)[0]);
    purchases += matches;

    totlaValueEl.textContent = purchases;
    cartIconEl.textContent = parseInt(cartIconEl.textContent) + 1;
});