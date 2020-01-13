<template>
    <div>
        <v-btn :color="color" :dark="dark" v-on:click="guardar()" :large="large">{{nombreBtn}}</v-btn>
        <v-alerta 
        right 
        darkIcon 
        :mostrarAlerta="mostrarAlerta" 
        :texto="texto" 
        :type="type"
        :timeout="2000"
        ></v-alerta>
    </div>
</template>
<script>
import alerta from './alerta';
import axios from 'axios'; 
import {backend} from '../config/Backend';
export default {
    components: {
        'v-alerta': alerta,
    },
     props: {
        datos: null,
        path: String,
        color: String,
        dark: Boolean,
        large: Boolean,
        nombreBtn: String,

    },
    data: () => ({
        texto: "",
        mostrarAlerta: false,
        type: null
        

    }),
    mounted() {
        
    },
    methods: {
         guardar(){

        axios.post(backend.url+this.path,this.datos)
        .then((res)=>{
            if(res.status ==200){
                this.texto = "Usuario registrado";
                this.mostrarAlerta = true;
                this.type = 'success';
            }
            
        })
        .catch((e)=>{
                this.texto = "Error al crear usuario verifique los datos";
                this.mostrarAlerta = true;
                this.type = 'error'
                console.log("erro"+e);
                

        })
          
            
        } 
    },
}
</script>