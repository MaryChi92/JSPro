Vue.component('error', {
    data(){
      return {
        imgError: './img/600c3d87edb2b3.46521511.jpg'
      }
    },
    methods: {
      raiseError(){
          pass;
      }
    },
    template: `
        <div class="error">
            <img :src="imgError" alt="Some img">
            <p>ERROR</p>
        </div>`
});