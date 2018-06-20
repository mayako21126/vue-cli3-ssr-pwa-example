import Vue from 'vue'
import Vuex from 'vuex'
import hw from './modules/hw'
Vue.use(Vuex)

export default function() {
    return new Vuex.Store({
        state: {},
        mutations: {},
        actions: {},
        modules: {
            hw: hw
        }
    })
}
