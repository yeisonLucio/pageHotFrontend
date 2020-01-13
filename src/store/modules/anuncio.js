import axios from 'axios';
import {backend} from '../../config/Backend';

const state = {
    listaAnuncios: null
};

const mutations = {

    fijarAnuncios(state,data){
        state.listaAnuncios = data;
    }

}

const actions = {

    obtenerAnuncios({commit}){
        axios.get(backend.url+'/api/anunciosHome')
      .then((respuesta) => {
        console.log(respuesta);
         commit('fijarAnuncios',respuesta.data);
        
      })
    }

};

export default {
    state,
    mutations,
    actions
}