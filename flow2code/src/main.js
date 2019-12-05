import Vue from 'vue'
import App from './App.vue'
import 'bootstrap';
import JwPagination from 'jw-vue-pagination';





Vue.component('jw-pagination', JwPagination);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
