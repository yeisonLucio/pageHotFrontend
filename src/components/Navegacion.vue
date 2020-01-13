<template>
  <div>
  
    <v-app-bar  :color="estilos.color" :dark="estilos.dark">

      <v-app-bar-nav-icon 
      @click.stop="mostrar = !mostrar" 
      class="hidden-md-and-up">
      </v-app-bar-nav-icon>

      

     
      <v-toolbar-title>PageHot</v-toolbar-title>
       <v-spacer></v-spacer>

     <v-toolbar-items class="hidden-sm-and-down">
        <v-btn 
        v-for="(item,i) in items"
        :key=i
        :to="item.path" 
        text>{{item.text}}</v-btn>
      </v-toolbar-items>

    </v-app-bar>
     <v-navigation-drawer
      v-model="mostrar"
      temporary
      absolute
      id = "mostrar"
    >
      <v-list-item>
        <!-- <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar> -->

        <v-list-item-content>
          <v-list-item-title>PAGEHOT</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
     

      <v-divider :color="estilos.color"></v-divider>
      
      <v-list dense>
        <v-list-item-group >
          <v-list-item :to="item.path"
          v-for="(item,i) in items"
          :key=i>
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>

            </v-list-item-icon>
            <v-list-item-content >
              <v-list-item-title   v-text="item.text"></v-list-item-title>

            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>

      </v-list>

    </v-navigation-drawer>


  </div>
  
  
</template>

<script>
import {estilos} from '../config/Estilos'
export default {
  data (){
    return{
      mostrar: null,
      estilos: {
          color: estilos.color,
          dark: estilos.dark
            },
      items: [
        { text: 'INICIO', icon: 'mdi-home', path:"/" },
        { text: 'REGISTRARSE', icon: 'mdi-account', path:"/register" },
        { text: 'ENTRAR', icon: 'mdi-account-plus', path:"/login" },
      ],
    }
  }
  
}
</script>
<style>


  
</style>
