<template>
  <div>
    <v-row>
      <v-col cols="12" sm="0" md="1">hola1</v-col>
      <v-col cols="12" sm="12" md="10">
        
        <v-toolbar class="mb-1" height="80" >
           <v-text-field
              :color="color"
              class="mx-4"
              flat
              hide-details
              label="Buscar..."
              prepend-inner-icon="search"
              solo
              clearable
              outlined
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-anuncio @actualizarList="getAnuncios()"></v-anuncio>

        </v-toolbar>
        <v-item-group>
          
          <v-row>
            
            <v-col v-for="item in anuncios" :key="item.anuncio_id"  cols="12" md="4" sm="3">
            
              <v-card class="mx-auto">
                <!-- <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="headline">Andrea</v-list-item-title>
                    <v-list-item-subtitle>
                      
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item> -->
                <!-- <v-img
                  :src="item.ruta"
                  height="auto"
                  width="100%"
                  :aspect-ratio="16/9"
                ></v-img> -->
                <v-carousel
                height="150"
               
                hide-delimiter-background
                delimiter-icon="mdi-minus"
                :hide-delimiters="true"
                >
                <v-carousel-item
                v-for="(image,i) in item.imagenes"
                :key="i"
                :src="backend+image.ruta"
                >

                </v-carousel-item>
                </v-carousel>
                
                <v-card-title class="">{{item.titulo}}</v-card-title>
                <v-card-subtitle 
                id="subtitle" class="caption font-regular"
                >
                {{ item.descripcion | truncate(100)}}
                </v-card-subtitle>

                <v-card-actions>
                  <v-chip :ripple="false" 
                    color="green"
                    text-color="white"
                    small>
                    <v-icon left>mdi-whatsapp</v-icon> {{item.usuario.telefono}}</v-chip>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>mdi-share-variant</v-icon>
                  </v-btn>
                  
                  <!-- <v-spacer></v-spacer>

                  <v-btn icon  @click.native="handleClick(item.anuncio_id)">
                    <v-icon>{{ isSelected == item.anuncio_id ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                  </v-btn> -->
                </v-card-actions>

                <v-expand-transition>
                  <div v-show="isSelected == item.anuncio_id && isSelected != null">
                    <v-divider></v-divider>

                    <v-card-text>{{ item.descripcion}}</v-card-text>
                  </div>
                </v-expand-transition>
              </v-card>
            </v-col>
          </v-row>
        </v-item-group>

      </v-col>
      <v-col md="1">hola3</v-col>
    </v-row>
  </div>
</template>
<script>

/* import axios from 'axios'; */
import anuncio from './Anuncio';
import {backend} from "../config/Backend";
import {estilos} from '../config/Estilos.js';

export default {
  components: {
    'v-anuncio': anuncio,

  },
  data: () => ({
    backend: backend.url,
    color: estilos.color,
    selectedItem: null,
    isSelected: null,
    show: false,

  }),
  mounted() {
    this.$store.dispatch('obtenerAnuncios'); 
     
    },
    updated() {
      this.anuncios;
    },
  methods:  {
    handleClick(item){
      if(this.selectedItem != item){
        
            this.selectedItem = item;
            
          }else{
            this.selectedItem = "";
          }
          this.isSelected = this.selectedItem;
    }
    },
    computed: {
      anuncios(){
        return this.$store.state.anuncio.listaAnuncios;
      }
      
    },
  }
</script>

<style >
#cardsAnuncios {
  top: 15px;
}
#subtitle {
  padding-bottom: 0px !important;
}
</style>