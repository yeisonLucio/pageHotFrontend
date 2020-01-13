<template>
  <div>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-btn :color="color" dark v-on="on">Crear anuncio</v-btn>
      </template>
      <v-card>
        <v-toolbar dark :color="color">
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false">
              <v-icon left>mdi-close</v-icon>Cancelar
            </v-btn>
          </v-toolbar-items>

          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false; guardarDatos(); actualizarList ">
              <v-icon left>mdi-content-save</v-icon>Guardar
            </v-btn>
            
          </v-toolbar-items>
        </v-toolbar>
        <v-form enctype="multipart/form-data" >
          <v-container>
            <v-text-field v-model="titulo" label="Titulo" outlined :color="color"></v-text-field>
            <v-row>
              <v-col md="4">
                <v-text-field v-model="edad" label="Edad" outlined :color="color" disabled></v-text-field>
              </v-col>

              <v-col md="4">
                <v-select
                  :color="color"
                  :items="itemsSexo"
                  v-model="sexo"
                  item-value="id"
                  item-text="opcion"
                  label="Sexo"
                  outlined
                  disabled
                ></v-select>
              </v-col>
              <v-col md="4" cols="12">
                <v-text-field
                  v-model="telefono"
                  label="Telefono / Whatsapp"
                  outlined
                  :color="color"
                  disabled
                ></v-text-field>
              </v-col>
            </v-row>
            <v-select
              :color="color"
              :items="servicios"
              :value="servicios"
              chips
              label="Servicios"
              multiple
              outlined
              disabled
            ></v-select>

            <div id="campoEditor">
              <vue-editor v-model="descripcion" :editor-toolbar="customToolbar" />
            </div>
            <v-file-input
              label="Imagenes"
              filled
              prepend-icon="mdi-camera"
              :color="color"
              multiple
              @change="cargaArchivos"
              ref="fileinput"
            ></v-file-input>
          </v-container>

        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { estilos } from "../config/Estilos.js";
import { backend } from "../config/Backend";
import axios from "axios";

export default {
  props: {
    accion: String,
    actualizarList: Function
  },
  components: {
    VueEditor,
  },
  data: () => ({
    titulo: null,
    sexo: null,
    edad: null,
    telefono: null,
    images: [],
    color: estilos.color,
    dialog: false,
    servicios: [],
    serviciosValue: [],
    descripcion: null,
    form: new FormData,
    customToolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" }
      ],
      [{ color: [] }, { background: [] }],
      ["link"],
      [{ font: [] }],
      [{ header: [false, 1, 2, 3, 4, 5, 6] }],
      ["clean"]
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
    ]
  }),
  mounted() {
    this.cargarDatos();
  },
  methods: {
    cargarDatos() {
      const storage = this.$store.state.usuario.DatosUser;
      this.sexo = +storage.sexo;
      this.telefono = storage.telefono;
      this.edad = storage.edad;

      axios
        .get(
          backend.url +
            `/api/servicios/serviciosPorId/${storage.id}`,
          {
            headers: { Authorization: "Bearer" + storage.tokenUser}
          })
        .then(respuesta => {
          for (const item of respuesta.data) {
            this.servicios.push(item.nombre);
            this.serviciosValue.push(item.nombre);
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    cargaArchivos(e){
  
      let archivoSeleccionado = e;
      for (const item of archivoSeleccionado) {
        this.images.push(item);

      }
     
      
      
    },
    vaciarDatos(){
      this.titulo = null;
      this.descripcion = null;
      this.images = [];
      this.$refs.fileinput.reset();

    },
    guardarDatos() {

      this.form.append('titulo',this.titulo);
      this.form.append('descripcion',this.descripcion);
      for (let i = 0; i < this.images.length; i++) {
        this.form.append('imagenes[]',this.images[i]);
      }
      this.form.append('ruta','');
      this.form.append('anuncio_id','');

      axios.post(backend.url+'/api/anuncios/crearAnuncio',this.form,{
         'headers': { 'content-type': 'multipart/form-data',
                      'Authorization': 'Bearer'+ this.$store.state.usuario.tokenUser}
      })
      .then((respuesta)=>{

        console.log(respuesta);
        this.$store.dispatch('obtenerAnuncios');
        this.vaciarDatos();
        
        
      })
    }
  }
};
</script>

<style>
#campoEditor {
  margin-bottom: 30px;
}
</style>