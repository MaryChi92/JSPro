const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        isVisibleCart: false,
        catalogUrl: '/catalogData.json',
        basketUrl: '/getBasket.json',
        products: [],
        productsInBasket: [],
        imgCatalog: 'https://via.placeholder.com/200x150',
        imgForCart: 'https://via.placeholder.com/50x100',
        searchLine: '',
        filtered: []
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(element) {
            console.log(element.id_product);
            this.getJson(`${API}/addToBasket.json`)
              .then(data => {
                if(data.result === 1){
                  let find = this.productsInBasket.find(basketProduct => basketProduct.id_product === element.id_product);
                  if(find){
                    find.quantity++;
                  } else {
                    let product = {
                      id_product: element.id_product,
                      price: element.price,
                      product_name: element.product_name,
                      quantity: 1
                    };
                    this.productsInBasket.push(product);
                  }
                } else {
                  alert('Error');
                }
              })
        },
        removeProduct(element) {
            this.getJson(`${API}/deleteFromBasket.json`)
              .then(data => {
                if(data.result === 1){
                  let productId = element.id_product;
                  let find = this.products.find(basketProduct => basketProduct.id_product === productId);
                  if(find.quantity > 1){
                    find.quantity--;
                  } else {
                    this.productsInBasket.splice(this.productsInBasket.indexOf(find), 1);
                  }
                } else {
                  alert('Error');
                }
              })
        },
        filterGoods() {
            const regexp = new RegExp(this.searchLine, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
        },
    },
    /*computed: {
        computedSum(basketProduct) {
            return basketProduct.quantity * basketProduct.price;
        }
    },*/
    beforeCreate() {
        console.log('beforeCreate');
    },
    created() {
        console.log('created');
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });
    },
    beforeMount() {
        console.log('beforeMount');
    },
    mounted() {
        console.log('mounted');
    },
    beforeUpdate() {
        console.log('beforeUpdate');
    },
    updated() {
        console.log('updated');
    },
    beforeDestroy() {
        console.log('beforeDestroy');
    },
    destroyed() {
        console.log('destroyed');
    },
});
