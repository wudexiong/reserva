import Vue from 'vue';
import Vuex from 'vuex';

import { getItem } from '../utils/storage';

Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        token: getItem('token'),
    },
    mutations: {
        setToken(state, data) {
            state.token = data;
        },
    },
    actions: {},
    getter: {},
});
