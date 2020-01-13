import axios from 'axios';
import {backend} from '../../config/Backend';

const state = {
    DatosUser: [],
    tokenUser: null,
    
};

const mutations = {
    fijarUser(state,data){
        if(data == null){
            state.DatosUser = [];
        }else{
            state.DatosUser = data;
        }
        
        
    },
    fijarToken(state,data){
        if(data == null){
            state.tokenUser = null;
        }else{
            state.tokenUser = data.token;
        }
    }

};

const actions = {
    login({commit}, data) {
           
            
        var params= {};
        if(data.username.match(/@/)){
            params = {email: data.username, password: data.contrasena};
        }else{
            params = {userName: data.username, password: data.contrasena};
        }
        return new Promise((resolve, reject) => {
            
            axios.post(backend.url+'/api/auth/login',params)
            .then((res) =>{
                /* console.log('res'+res); */

                // Se fija el token en la mutacion
                commit('fijarToken',res.data);
                var datos = res.data;

                
                //obtener el usuario
                axios.get(backend.url+'/api/auth/user',{
                    'headers': { 'Authorization': 'Bearer'+ res.data.token }
                })
                .then((respuesta) =>{
                
                    commit('fijarUser',respuesta.data.data);
                    datos.user = respuesta.data.data;
                    resolve(datos);

                }).catch((error) => {
                    reject(error);
                })

                
            }).catch((error) => {
                reject(error.response.data); 

            })
            

        })
    },

    logout({commit}, data){
        return new Promise((resolve, reject) => {
            axios.post(backend.url+'/api/auth/logout',{

                'headers': { 'Authorization': 'Bearer'+data.token }
            })
            .then((response) => {
                commit('fijarToken',null);
                commit('fijarUser',null);
                resolve(response);
            })
            .catch((error)=>{
                reject(error)
            })
        })

    }

};

export default {
    state,
    mutations,
    actions

};

