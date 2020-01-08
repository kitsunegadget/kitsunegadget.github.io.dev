import Vue from 'vue'
import router from './router'
import App from './App.vue'
import firebase from 'firebase/app';
import "firebase/analytics";

// your firebaseConfig
const firebaseConfig = require("./firebaseConfig.json");
firebase.initializeApp(firebaseConfig);
firebase.analytics();

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

// new Vue({
//   el: '#app',
//   template: '<App/>',
//   components: { App }
// })
