// вынести разметку блока (формы с поиском).данные-search string
// логику поиска не перетаскивать в сам компонент
// через parent, root, refs достучаться до компонента каталога и вызвать метод filter (передать поисковую строку)

Vue.component('search-comp', {
    data(){
      return {
        userSearch: '',
      }
    },
    template: `
        <form action="#" class="search-form" @submit.prevent="$parent.$refs.products.filter(userSearch)">
            <input type="text" class="search-field" v-model="userSearch">
            <button class="btn-search" type="submit">
                <i class="fas fa-search"></i>
            </button>
        </form>`
});
