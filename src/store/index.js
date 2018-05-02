import 'es6-promise/auto'
import Vue from 'vue'
import Vuex from 'vuex'
import Message from './modules/message.js'

Vue.use(Vuex)


export default new Vuex.Store({
    modules: {
        Message
    }

})