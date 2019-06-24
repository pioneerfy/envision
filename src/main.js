import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import ElementUI from 'element-ui';
import echarts from 'echarts'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import VueAreaLinkage from 'vue-area-linkage';
import 'element-ui/lib/theme-chalk/index.css';
import 'vue-area-linkage/dist/index.css';
import SlideVerify from 'vue-monoplasty-slide-verify';
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.css'
import './assets/css/base.css'


import axios from 'axios'
Vue.use(ElementUI);
Vue.use(SlideVerify);
Vue.prototype.$http = axios;
import qs from 'qs';
Vue.prototype.$qs = qs;

// axios.defaults.baseURL = 'http://114.116.39.38:8080'
axios.defaults.baseURL ='/'

axios.interceptors.request.use(config => {
  const token=localStorage.getItem('token')
  token && (config.headers["Authorization"] = "Bearer" + token)
  return config
}, error => {
  return Promise.reject(error);
})

axios.interceptors.response.use(response => {
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response;
  }, error => {
    if (error.response.status === 401) {
      localStorage.removeItem('token');
      console.log(error.response.data.error.message);
      history.replace('/login');
    } else if(error.response.status === 500) {
      return Promise.reject('服务器出错：',error.response.data);
    }
    return Promise.reject(error.response.data);
  });

Vue.prototype.$http = axios;
Vue.prototype.$echarts = echarts

Vue.use(ElementUI);
Vue.use(VueQuillEditor)
Vue.use(VueAreaLinkage);





Vue.config.productionTip = false

new Vue({
  router,
  store,
  VueAreaLinkage,
  render: h => h(App)
}).$mount('#app')
