import Vue from 'vue'
import router from './router'
import App from './App.vue'
import firebase from 'firebase/app';
import "firebase/analytics";

// your firebaseConfig
// const firebaseConfig = require("./firebaseConfig.json");
const firebaseConfig = 
{
  "apiKey": process.env.VUE_APP_FIREBASE_apiKey,
  "authDomain": process.env.VUE_APP_FIREBASE_authDomain,
  "databaseURL": process.env.VUE_APP_FIREBASE_databaseURL,
  "projectId": process.env.VUE_APP_FIREBASE_projectId,
  "storageBucket": process.env.VUE_APP_FIREBASE_storageBucket,
  "messagingSenderId": process.env.VUE_APP_FIREBASE_messagingSenderId,
  "appId": process.env.VUE_APP_FIREBASE_appId,
  "measurementId": process.env.VUE_APP_FIREBASE_measurementId
}
firebase.initializeApp(firebaseConfig);
if (!(process.env.NODE_ENV === "development")) {
  firebase.analytics();
}

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
