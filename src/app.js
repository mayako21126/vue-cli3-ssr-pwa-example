import Vue from 'vue'
import { createRouter } from './router'
import App from './Page/App.vue'

export default function() {
    const router = createRouter()
    // console.log(router)
    const app = new Vue({
        render: h => h(App),
        router: router
    })
    return {
        app,
        router
    }
}
