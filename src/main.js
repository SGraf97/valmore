import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vuetify from './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css' 
import Toast from 'vue2-toast';

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.use(vuetify);

Vue.use(Toast, {
  type: 'top',
  duration: 3000,
  wordWrap: true,
  width: '150px'
});
new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
