/*class Hamburger {
constructor(size, stuffing) { ... }
addTopping(topping) { // Добавить добавку }
removeTopping(topping) { // Убрать добавку }
getToppings(topping) { // Получить список добавок }
getSize() { // Узнать размер гамбургера }
getStuffing() { // Узнать начинку гамбургера }
calculatePrice() { // Узнать цену }
calculateCalories() { // Узнать калорийность }
}*/
'use strict'

class Hamburger{
    constructor(size, filling, ...toppings) {
        this.size = size;
        this.filling = filling;
        this.toppings = toppings;
        this.listOfPrices = []
        this.listOfCalories = []
    }

    calculatePrice(listOfPrices) {
        this.listOfPrices = listOfPrices.reduce(function(sum, elem) {return Number(sum) + Number(elem);})
    }

    calculateCalories(listOfCalories) {
        this.listOfCalories = listOfCalories.reduce(function(sum, elem) {return Number(sum) + Number(elem);})
    }

    getHTMLString() {
        return `<div class="total">
            <p class="final-text">Ваш ${this.size} бургер готовится. Выбранные добавки: ${this.filling}, ${this.toppings}</p>
            <p class="final-text">Итоговая стоимость: ${this.listOfPrices} рублей</p>
            <p class="final-text">Итоговая калорийность: ${this.listOfCalories} кКал</p>
        </div>`
    }

    render() {
        const formEl = document.querySelector('form');
        formEl.insertAdjacentHTML('afterend', this.getHTMLString());
    }
}

document.querySelector('.submit-btn').addEventListener('click', (event) => {
    event.preventDefault();
    const checkedItems = document.querySelectorAll(':checked');
    const checkedItemsValues = [];
    const listOfPrices = [];
    const listOfCalories = [];
    for (const item of checkedItems) {
        checkedItemsValues.push(item.value);
        listOfPrices.push(item.dataset.price);
        listOfCalories.push(item.dataset.calories);
    }
    const new_burger = new Hamburger(...checkedItemsValues);
    new_burger.calculatePrice(listOfPrices);
    new_burger.calculateCalories(listOfCalories);
    new_burger.render();
});
