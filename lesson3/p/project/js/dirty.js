const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


class List {
  constructor(container, url) {
    this.container = document.querySelector(container);
    this.url = url;
    this.goods = [];
    this.productObjects = [];
    this.allProducts = [];
    this._init();
  }

  getJson(url) {
    return fetch(url ? url : `${API + this.url}`)
      .then(result => result.json())
      .catch(error => {
        console.log(error);
      })
  }

  handleData(data){
    this.goods = data;
    this.render();
  }

  render() {
    for (const good of this.goods) {
      let productObject = null;
      if (this.constructor.name === 'ProductsList') productObject = new ProductItem(good);
      if (this.constructor.name === 'Cart') productObject = new CartItem(good);
      if (!productObject) return;
      console.log(productObject);
      this.productObjects.push(productObject);

      this.container.insertAdjacentHTML('beforeend', productObject.getHTMLString());
    }
  }
}

class Item {
  constructor(product, img='https://via.placeholder.com/200x150') {
    this.id_product = product.id_product;
    this.product_name = product.product_name;
    this.price = product.price;
    this.img = img;
  }

  getHTMLString() {
    return '';
  }
}


class ProductsList extends List {
  _init() {
    this.getJson()
      .then(data => this.handleData(data));

    /*this.container.addEventListener('click', e => {
      if (e.target.classList.contains('buy-btn')) {
        Cart.addProduct(e.target);
      }
    });*/
  }
}

class ProductItem extends Item {
  getHTMLString() {
    return `<div class="product-item" data-id="${this.id_product}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.product_name}</h3>
                    <p>${this.price} ₽</p>
                    <button class="buy-btn"
                    data-id="${this.id_product}"
                    data-name="${this.product_name}"
                    data-price="${this.price}">Купить</button>
                </div>
            </div>`;
  }
}


class Cart extends List {
  _init() {
    this.getJson()
      .then(data => {
        this.handleData(data.contents);
      });
    document.querySelector('.btn-cart').addEventListener('click', () => {
      this.container.classList.toggle('hidden');
    });
    document.querySelector('.products').addEventListener('click', e => {
      if (e.target.classList.contains('buy-btn')) {
        this.addProduct(e.target);
      }
    });
    this.container.addEventListener('click', e => {
      if(e.target.classList.contains('del-btn')){
        this.removeProduct(e.target);
      }
    })
  }

  addProduct(element){
    this.getJson(`${API}/addToBasket.json`)
      .then(data => {
        if(data.result === 1){
          console.log(element)
          let productId = +element.dataset['id'];
          let find = this.productObjects.find(product => product.id_product === productId);
          if(find){
            find.quantity++;
            this._updateCart(find);
          } else {
            let product = {
              id_product: productId,
              price: +element.dataset['price'],
              product_name: element.dataset['name'],
              quantity: 1
            };
            this.goods = [product];
            this.render();
          }
        } else {
          alert('Error');
        }
      })
  }

  removeProduct(element){
    this.getJson(`${API}/deleteFromBasket.json`)
      .then(data => {
        if(data.result === 1){
          let productId = +element.dataset['id'];
          let find = this.allProducts.find(product => product.id_product === productId);
          if(find.quantity > 1){ // если товара > 1, то уменьшаем количество на 1
            find.quantity--;
            this._updateCart(find);
          } else { // удаляем
            this.allProducts.splice(this.allProducts.indexOf(find), 1);
            document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
          }
        } else {
          alert('Error');
        }
      })
  }

  /**
   * обновляем данные корзины
   * @param product
   * @private
   */
  _updateCart(product){
    let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
    console.log(block)
    console.log(product)
    block.querySelector('.product-quantity').textContent = `Количество: ${product.quantity}`;
    block.querySelector('.product-price').textContent = `${product.quantity * product.price} ₽`;
  }
}

class CartItem extends Item{
  constructor(el, img = 'https://via.placeholder.com/50x100'){
    super(el, img);
    this.quantity = el.quantity;
  }
  render(){
    return `<div class="cart-item" data-id="${this.id_product}">
            <div class="product-bio">
            <img src="${this.img}" alt="Some image">
            <div class="product-desc">
            <p class="product-title">${this.product_name}</p>
            <p class="product-quantity">Количество: ${this.quantity}</p>
        <p class="product-single-price">${this.price} за ед.</p>
        </div>
        </div>
        <div class="right-block">
            <p class="product-price">${this.quantity*this.price} ₽</p>
            <button class="del-btn" data-id="${this.id_product}">&times;</button>
        </div>
        </div>`
  }
}


new ProductsList ('.products', '/catalogData.json');
new Cart('.basket', '/getBasket.json');