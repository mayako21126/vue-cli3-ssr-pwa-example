import Vue from 'vue'
import App from './App.vue'
import creartRouter from './router'
import creartStore from './store/store'
import _ from 'lodash'
Vue._ = _
// import './registerServiceWorker'
import { sync } from 'vuex-router-sync'

Vue.config.productionTip = false

export default function() {
    const router = creartRouter()
    const store = creartStore()
    sync(store, router)
    const app = new Vue({
        router,
        store,
        render: h => h(App)
    })
    return { app, router, store }
}
