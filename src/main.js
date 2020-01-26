import vuetify from './plugins/vuetify';
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'
import axios from 'axios' 
import VueAxios from 'vue-axios' 

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

var firebaseConfig = {
  apiKey: "AIzaSyB5Dn_5QqrMmhN6hqfL625dOpD_j6sFnf4",
  authDomain: "vf-chat-project.firebaseapp.com",
  databaseURL: "https://vf-chat-project.firebaseio.com",
  projectId: "vf-chat-project",
  storageBucket: "vf-chat-project.appspot.com",
  messagingSenderId: "28293369015",
  appId: "1:28293369015:web:dfd69ea3ce26e5176f9132",
  measurementId: "G-DTFGCH6XRL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
require('@/assets/sass/main.scss');

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
