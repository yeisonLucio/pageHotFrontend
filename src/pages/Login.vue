<template>

    <div>

        <v-container>
            <div id="form-login" 
            class="mx-auto"
            max-width="344"
            >
                <v-row>
                    <v-col></v-col>
                    <v-col cols="12" md="5">
                        <v-card elevation="4" class="mx-auto"  outlined>
                            <v-card-title>LOGIN</v-card-title>
                            <v-card-text>
                                <v-form>
                                    <v-text-field 
                                        :color="estilos.color" 
                                        label="Usuario"
                                        v-model="username"
                                        prepend-icon="mdi-account">
                                    </v-text-field>
                                    <v-text-field 
                                        :append-icon="mostraPasword ? 'mdi-eye' : 'mdi-eye-off'"
                                        :color="estilos.color" 
                                        label="Contraseña"
                                        v-model="contrasena"
                                        @click:append="mostraPasword = !mostraPasword"
                                        :type="mostraPasword ? 'text' : 'password'"
                                        prepend-icon="mdi-key">
                                    </v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn @click="login" :color="estilos.color"  dark>Entrar</v-btn>
                                 <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                    <v-col></v-col>
                   
                </v-row>
            </div>
        </v-container>
    </div>
</template>
<script>
import {estilos} from '../config/Estilos';
/* import {mapState} from 'vuex'; */
export default {
    data() {
        return {
            estilos: {
                color: estilos.color,
                dark: estilos.dark
            },
            mostraPasword: false,
            username: null,
            contrasena: null,
        }
    },
    methods: {
      
        login(){
            this.$store.dispatch('login',{
                
                username: this.username,
                contrasena: this.contrasena
            })
            .then((respuesta)=>{
                
                
                if(respuesta.status == 200 && respuesta.token != null ){
                    
                    this.$router.push('/'); 
                   
                }else if(respuesta.status == 401){
                    
                    this.alert = "Nombre de usuario o contraseña incorrectos";
                    

                }
                
            })
                        
        },

      


    }
}
</script>
<style >
#form-login{
    position: relative;
    top: 100px;
}
    
</style>