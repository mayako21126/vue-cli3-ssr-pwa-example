// client-entry
import App from './main.js'
const { app, router } = App()
import './registerServiceWorker'

// 这里假定 App.vue 模板中根元素具有 `id="app"`
router.onReady(() => {
    app.$mount('#app')
})
