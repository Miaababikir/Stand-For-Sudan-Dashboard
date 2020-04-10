import Vue from 'vue';
import App from './App.vue';
import VueAnalytics from 'vue-analytics';


import "@fortawesome/fontawesome-free/css/all.min.css";

Vue.config.productionTip = false;

Vue.use(VueAnalytics, {
  id: 'UA-161702225-2'
});

new Vue({
  render: h => h(App),
}).$mount('#app');
