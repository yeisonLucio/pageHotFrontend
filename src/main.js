import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import vueRouter from 'vue-router';
import {routes} from './routes';
import {store} from './store/store';


Vue.config.productionTip = false
Vue.use(vueRouter);

Vue.filter('truncate', function (text, stop, clamp) {
  return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '')
})

const router = new vueRouter ({
  history: true,
  mode: 'history',
  routes
});

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
