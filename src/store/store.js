import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import usuario from './modules/usuario';
import anuncio from './modules/anuncio';
/* import axios from 'axios';
import {backend} from '../../config/Backend'; */




Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
    },
    
    plugins: [
        createPersistedState({
            paths: ['usuario'],
            
        
        })
    ],
    mutations: {

    },
    actions: {

    },
    modules: {
        usuario,
        anuncio
    }


}); 