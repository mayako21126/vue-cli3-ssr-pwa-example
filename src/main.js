import Vue from 'vue'
import App from './App.vue'
import creartRouter from './router'
import creartStore from './store'
// import './registerServiceWorker'

Vue.config.productionTip = false

export default function() {
    const router = creartRouter()
    const store = creartStore()
    const app = new Vue({
        router,
        store,
        render: h => h(App)
    })
    return { app, router, store }
}
