const products = [
    {id: 1, title: 'Notebook', price: 1000},
    {id: 2, title: 'Mouse', price: 100},
    {id: 3, title: 'Keyboard', price: 250},
    {id: 4, title: 'Gamepad', price: 150},
];

const getProductHTMLString = (title='Notebook', price=100) => {
    return `<div class="product-item">
                <h3>${title}</h3>
                <p>${price}</p>
                <button class="by-btn">Добавить</button>
              </div>`;
};

const renderProducts = (productList) => {
  document.querySelector('.products').innerHTML = productList
      .map((good) => getProductHTMLString(good.title, good.price)).join('');
}

renderProducts(products);
