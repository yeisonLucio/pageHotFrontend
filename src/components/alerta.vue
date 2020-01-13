<template>
    <div>
        
        <v-snackbar
        v-model="mostrarAlerta"
        :right="right"
        :buttom="buttom"
        :left="left"
        :top="top"
        :color="type=='success' ? 'green' : 'red'"
        :timeout="timeout">
            <v-icon :dark="darkIcon">
                <template v-if="type == 'success'">
                    mdi-check-circle
                </template>
                <template v-else>
                    mdi-alert-circle
                </template>
            </v-icon>
            {{texto}}
            <v-btn
                text
                icon
                @click="mostrarAlerta = false">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            
        </v-snackbar>
    </div>
</template>
<script>
export default {
    props:{
        timeout: Number,
        color: String,
        texto: String,
        icon: String,
        darkIcon: Boolean,
        mostrarAlerta: Boolean,
        right: {
            type: Boolean,
            default: false
        },
        top: {
            type: Boolean,
            default: false
        },
        buttom: {
            type: Boolean,
            default: false
        },
        left: {
            type: Boolean,
            default: false
        },
        type: {
            validator: function (value) {
            // El valor debe coincidir con una de estas cadenas de texto
            return ['success', 'warning', 'danger','error'].indexOf(value) !== -1
            }     
        }
    },
    data: () => ({
        snackbar: false,

    })
    
}
</script>