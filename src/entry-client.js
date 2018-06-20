// client-entry
import Vue from 'vue'
import App from './main.js'
const { app, router, store } = App()
import './registerServiceWorker'
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}
Vue.mixin({
    beforeRouteUpdate(to, from, next) {
        const { asyncData } = this.$options
        if (asyncData) {
            asyncData({
                store: this.$store,
                route: to
            })
                .then(next)
                .catch(next)
        } else {
            next()
        }
    }
})
Vue.mixin({
    beforeMount() {
        const { asyncData } = this.$options
        if (asyncData) {
            // 将获取数据操作分配给 promise
            // 以便在组件中，我们可以在数据准备就绪后
            // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
            this.dataPromise = asyncData({
                store: this.$store,
                route: this.$route
            })
        }
    }
})
// 这里假定 App.vue 模板中根元素具有 `id="app"`
router.onReady(() => {
    app.$mount('#app')
})
