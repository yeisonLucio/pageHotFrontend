<template>
  <div>
    <v-container>
      <div id="form" class="mx-auto" max-width="344">
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="12" md="5">
            <v-card  elevation="4" class="mx-auto" outlined>
              <v-card-title class="">REGISTRO</v-card-title>
              <v-tabs v-model="tabs" fixed-tabs :color="estilos.color">
                <v-tab>Paso 1</v-tab>
                <v-tab>Paso 2</v-tab>
              </v-tabs>
              <v-card-text>
                <v-tabs-items v-model="tabs">
                  <v-tab-item>
                    <v-form >
                      <v-row>
                        <v-col cols="12">
                          <v-select
                            :color="estilos.color"
                            v-model="tipo"
                            :items="itemsTipo"
                            item-value="id"
                            item-text="opcion"
                            label="Tipo de usuario"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field 
                          :color="estilos.color" 
                          label="Nombre de usuario" 
                          required
                          v-model="username"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field 
                          :color="estilos.color" 
                          label="Correo electronico" 
                          required
                          v-model="correo"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            label="Contraseña"
                            :append-icon="mostraPasword ? 'mdi-eye' : 'mdi-eye-off'"
                            :color="estilos.color"
                            @click:append="mostraPasword = !mostraPasword"
                            v-model="password"
                            :type="mostraPasword ? 'text' : 'password'"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            label="Confirmar contraseña"
                            v-model="VerificarPassword"
                            :color="estilos.color"
                            :type="mostraPasword ? 'text' : 'password'"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-tab-item>
                  <v-tab-item>
                    <v-form>
                      <v-row>
                        <v-col cols="12" :md="tipo!=2 ? 12 : 6">
                          <v-text-field 
                          :color="estilos.color" 
                          v-model="nombre" 
                          label="Nombre" 
                          required
                          ></v-text-field>
                        </v-col>
                        <v-col v-if="tipo!=2" cols="12" sm="6" md="4">
                          <v-text-field 
                          :color="estilos.color" 
                          label="Edad" 
                          required
                          v-model="edad"
                          ></v-text-field>
                        </v-col>
                        <v-col v-if="tipo!=2" cols="12" sm="6" md="4">
                          <v-select
                            :color="estilos.color"
                            :items="itemsSexo"
                            v-model="sexo"
                            item-value="id"
                            item-text="opcion"
                            label="Sexo"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" :md="tipo!=2 ? 4 : 6">
                          <v-text-field 
                          :color="estilos.color" 
                          label="N° celular / whatasapp" 
                          v-model="telefono"
                          required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-select 
                          :color="estilos.color" 
                          :items="paises" 
                          label="Pais"
                          v-model="pais"
                          @change="getDepartamentosPorPais(pais)"  
                          item-value="id"
                          item-text="nombre"></v-select>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-select 
                          :color="estilos.color" 
                          :items="departamentos" 
                          label="Departamento"
                          v-model="departamento"
                          item-text="nombre"
                          item-value="id"
                          @change="getMunicipiosPorDepartamento(departamento)"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-select 
                          :color="estilos.color" 
                          :items="municipios" 
                          v-model="municipio"
                          label="Ciudad"
                          item-text="nombre"
                          item-value="id"

                          ></v-select>
                        </v-col>
                      </v-row>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <btn-guardar  
                        :color="estilos.color" 
                        :datos="obtenerDatos"
                        path="/api/auth/register"
                        dark large 
                        nombreBtn="guardar"
                        ></btn-guardar>
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-form>
                  </v-tab-item>
                </v-tabs-items>
              </v-card-text>
            </v-card>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </div>
    </v-container>
  </div>
</template>


<script>
import {estilos} from '../config/Estilos';
import {backend} from '../config/Backend';
import axios from 'axios'
import btnGuardar from '../components/Guardar.vue';

export default {
  components: {
    'btn-guardar': btnGuardar,

  },
  data: () => ({
    estilos:{
      color: estilos.color,
      dark: estilos.dark,

    },
    username: null,
    correo: null,
    password: null,
    VerificarPassword: null,
    telefono: null,
    edad: null,
    tipo: null,
    sexo: null,
    mostraPasword: false,
    tabs: null,
    valid: false,
    nombre: null,
    paises: null,
    pais: "",
    departamentos: null,
    departamento: "",
    municipios: null,
    municipio: "",
    nameRules: [
      v => !!v || "Name is required",
      v => v.length <= 10 || "Name must be less than 10 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    itemsSexo: [
      {
        id: 1,
        opcion: "Hombre"
      },
      {
        id: 2,
        opcion: "Mujer"
      },
      {
        id: 3,
        opcion: "Otro"
      }
    ],
    itemsTipo: [
      {
        id: 1,
        opcion: "Independiente"
      },
      {
        id: 2,
        opcion: "Agencia"
      },
      {
        id: 3,
        opcion: "Cliente"
      }
    ]
  }),
  mounted() {
    this.getPais();
    
  },
  methods: {
    getPais() {
      axios.get(backend.url+"/api/paises",{
                'headers': { 'Authorization': 'Bearer'+ this.$store.state.tokenUser}
                })
                .then((respuesta)=>{
                  
                  this.paises = respuesta.data.data;
                })


    },

    getDepartamentosPorPais(pais_id){
      axios.get(backend.url+`/api/departamentos/departamentosPorPais/${pais_id}`)
                .then((respuesta)=>{
                  this.departamentos = respuesta.data;
                })


    },
    getMunicipiosPorDepartamento(departamento_id){
      axios.get(backend.url+`/api/municipios/municipiosPorDepartamento/${departamento_id}`)
                .then((respuesta)=>{
                  this.municipios = respuesta.data;
                })

    }
  }, 
  computed: {
    obtenerDatos: function (){
      
     var datos = {
        nombre: this.nombre,
        userName: this.username,
        email: this.correo,
        password: this.password,
        password_confirmation: this.VerificarPassword,
        telefono: this.telefono,
        edad: this.edad,
        sexo: this.sexo,
        tipo: this.tipo,
        rol: '1',
        pais_id: this.pais,
        departamento_id: this.departamento,
        ciudad_id: this.municipio,
      }

      return datos;

    }
  },
};
</script>