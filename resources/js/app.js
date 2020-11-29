require('./bootstrap');
window.Vue = require('vue');
Vue.component('example', require('./components/Example.vue'));
Vue.component('mobiles', require('./components/Mobile.vue'));
const app = new Vue({
    el: '#app'
});