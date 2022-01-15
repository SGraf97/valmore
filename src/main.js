import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vuetify from './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css' 


Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.use(vuetify);


new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
