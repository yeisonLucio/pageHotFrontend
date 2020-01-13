<template>
    <v-app>

        <navegacion></navegacion>
        <v-content>
            <v-container>
                 <router-view></router-view>

            </v-container>
            
        </v-content>
         <v-footer app>
                <!-- -->
        </v-footer>
        
    </v-app>
</template>
<script>
import Navegacion from './components/Navegacion.vue'

export default {
    components: {Navegacion},
    data() {
        return {

            
        }
    },
    
    
}
</script>
