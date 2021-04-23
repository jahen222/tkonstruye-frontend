<template>
  <div id="dashboardProfile" class="post-detail reply-form w-100">
    <h3 class="mb-0">Datos de Usuario</h3>
    <form class="w-100 pb-50" @submit="handleProfileUpdateUserData">
      <div class="row">
        <div class="col-md-6 col-sm-6 col-lg-6">
          <div class="field-wrap w-100">
            <label>Nombre Completo:</label>
            <input type="text" v-model="me.detail.name" />
          </div>
        </div>
        <div class="col-md-6 col-sm-6 col-lg-6">
          <div class="field-wrap w-100">
            <label>Nombre de Usuario:</label>
            <input type="text" v-model="me.detail.username" />
          </div>
        </div>
        <div class="col-md-6 col-sm-6 col-lg-6">
          <div class="field-wrap w-100">
            <label>Correo Electrónico:</label>
            <input type="email" v-model="me.detail.email" />
          </div>
        </div>
        <div class="col-md-6 col-sm-6 col-lg-6">
          <div class="field-wrap w-100">
            <label>Teléfono:</label>
            <input type="text" v-model="me.detail.phone" />
          </div>
        </div>
        <div class="col-md-6 col-sm-6 col-lg-6">
          <div class="field-wrap w-100">
            <label>Comuna:</label>
            <vue-typeahead-bootstrap
              :data="getCommunes"
              :serializer="(item) => item.name"
              v-model="userCommune"
            >
            </vue-typeahead-bootstrap>
          </div>
        </div>
        <div class="col-md-6 col-sm-6 col-lg-6">
          <div class="field-wrap w-100">
            <label>Rut:</label>
            <input type="text" v-model="me.detail.rut" />
          </div>
        </div>
        <div class="col-md-12 col-sm-12 col-lg-12">
          <div class="field-wrap w-100">
            <label>Eslogan:</label>
            <textarea v-model="me.detail.slogan"></textarea>
          </div>
          <button class="thm-btn thm-bg" type="submit">
            Actualizar<i class="flaticon-arrow-pointing-to-right"></i>
          </button>
        </div>
      </div>
    </form>
    <h3 class="mb-0" v-if="me.detail.role.name === 'Professional'">
      Datos de Empresa
    </h3>
    <form
      class="w-100 pb-50"
      v-if="me.detail.role.name === 'Professional'"
      @submit="handleProfileUpdateCompanyData"
    >
      <div class="row">
        <div class="col-md-12 col-sm-12 col-lg-12">
          <div class="field-wrap w-100">
            <label>Giro:</label>
            <textarea v-model="me.detail.giro"></textarea>
          </div>
          <div class="field-wrap w-100">
            <label>Contacto:</label>
            <textarea v-model="me.detail.contact"></textarea>
          </div>
          <button class="thm-btn thm-bg" type="submit">
            Actualizar<i class="flaticon-arrow-pointing-to-right"></i>
          </button>
        </div>
      </div>
    </form>
    <h3 class="mb-0">Restablecer Contraseña</h3>
    <form class="w-100 pb-50" @submit="handleProfileForgotPassword">
      <div class="row">
        <div class="col-md-6 col-sm-6 col-lg-6">
          <div class="field-wrap w-100">
            <label>Correo Electrónico:</label>
            <input type="email" v-model="forgotPasswordEmail" />
          </div>
        </div>
        <div class="col-md-12 col-sm-12 col-lg-12">
          <div class="field-wrap w-100"></div>
          <button class="thm-btn thm-bg" type="submit">
            Enviar<i class="flaticon-arrow-pointing-to-right"></i>
          </button>
        </div>
      </div>
    </form>
    <h3 class="mb-0">Imagen de Perfil</h3>
    <form class="w-100" @submit="handleProfileUploadPhoto">
      <div class="row">
        <div class="col-md-6 col-sm-6 col-lg-6">
          <div class="field-wrap w-100">
            <label>Imagen o Foto:</label>
            <input
              type="file"
              name="files"
              @change="handlePhotoChange"
              alt="photo"
            />
          </div>
        </div>
        <div class="col-md-12 col-sm-12 col-lg-12">
          <div class="field-wrap w-100"></div>
          <button class="thm-btn thm-bg" type="submit">
            Enviar<i class="flaticon-arrow-pointing-to-right"></i>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { PROFILE_GET_ME, PROFILE_GET_COMMUNES } from "./constants/querys";
import {
  PROFILE_UPDATE_USER_DATA,
  PROFILE_UPDATE_COMPANY_DATA,
  PROFILE_FORGOT_PASSWORD,
  PROFILE_UPLOAD_PHOTO,
  PROFILE_UPDATE_PHOTO
} from "./constants/mutations";

export default {
  name: "Profile",
  data() {
    return {
      api_url: process.env.VUE_APP_STRAPI_API_URL,
      me: {
        detail: {
          id: "",
          username: "",
          email: "",
          name: "",
          phone: "",
          slogan: "",
          rut: "",
          giro: "",
          contact: "",
          photo: {
            url: ""
          },
          commune: {
            id: ""
          },
          role: {
            name: ""
          }
        }
      },
      communes: [],
      userCommune: "",
      forgotPasswordEmail: "",
      photo: null
    };
  },
  apollo: {
    me: {
      query: PROFILE_GET_ME
    },
    communes: {
      query: PROFILE_GET_COMMUNES
    }
  },
  methods: {
    ...mapMutations({
      updateUser: "updateUser"
    }),
    handleProfileUpdateUserData(e) {
      e.preventDefault();
      const {
        id,
        username,
        email,
        phone,
        name,
        rut,
        slogan
      } = this.$data.me.detail;
      let commune = null;
      let validate = true;

      if (this.getCommunes.some(commune => commune.name === this.userCommune)) {
        commune = this.getCommunes
          .filter(commune => commune.name === this.userCommune)
          .shift().id;
      } else if (this.userCommune !== "") {
        this.$toast.open({
          message: "Seleccione una comuna válida",
          type: "error",
          duration: 3000
        });
        validate = false;
      }

      if (validate) {
        this.$apollo
          .mutate({
            mutation: PROFILE_UPDATE_USER_DATA,
            variables: {
              id,
              username,
              email,
              phone,
              name,
              rut,
              slogan,
              commune
            }
          })
          .then(data => {
            const user = data.data.updateUser;
            delete user.name;
            delete user.phone;
            delete user.rut;
            delete user.slogan;
            delete user.commune;

            this.updateUser(user);
            this.$toast.open({
              message: "Usuario actualizado exitosamente",
              type: "success",
              duration: 3000
            });
          })
          .catch(({ graphQLErrors }) => {
            graphQLErrors.map(error =>
              this.$toast.open({
                message: error.message,
                type: "error",
                duration: 3000
              })
            );
          });
      }
    },
    handleProfileUpdateCompanyData(e) {
      e.preventDefault();
      const { id, giro, contact } = this.$data.me.detail;
      this.$apollo
        .mutate({
          mutation: PROFILE_UPDATE_COMPANY_DATA,
          variables: {
            id,
            giro,
            contact
          }
        })
        .then(() => {
          this.$toast.open({
            message: "Usuario actualizado exitosamente",
            type: "success",
            duration: 3000
          });
        })
        .catch(({ graphQLErrors }) => {
          graphQLErrors.map(error =>
            this.$toast.open({
              message: error.message,
              type: "error",
              duration: 3000
            })
          );
        });
    },
    handleProfileForgotPassword(e) {
      e.preventDefault();
      const email = this.forgotPasswordEmail;
      this.$apollo
        .mutate({
          mutation: PROFILE_FORGOT_PASSWORD,
          variables: {
            email
          }
        })
        .then(() => {
          this.$toast.open({
            message: "Correo enviado exitosamente",
            type: "success",
            duration: 3000
          });
        })
        .catch(({ graphQLErrors }) => {
          graphQLErrors.map(error =>
            this.$toast.open({
              message: error.message,
              type: "error",
              duration: 3000
            })
          );
        });
    },
    handlePhotoChange(e) {
      this.photo = e.target.files[0];
    },
    handleProfileUploadPhoto(e) {
      e.preventDefault();
      const file = this.photo;
      this.$apollo
        .mutate({
          mutation: PROFILE_UPLOAD_PHOTO,
          variables: {
            file
          }
        })
        .then(data => {
          const photo = data.data.upload.id;
          const { id } = this.$data.me.detail;
          this.$apollo
            .mutate({
              mutation: PROFILE_UPDATE_PHOTO,
              variables: {
                id,
                photo
              }
            })
            .then(() => {
              this.$toast.open({
                message: "Usuario actualizado exitosamente",
                type: "success",
                duration: 3000
              });
            })
            .catch(({ graphQLErrors }) => {
              graphQLErrors.map(error =>
                this.$toast.open({
                  message: error.message,
                  type: "error",
                  duration: 3000
                })
              );
            });
        })
        .catch(({ graphQLErrors }) => {
          graphQLErrors.map(error =>
            this.$toast.open({
              message: error.message,
              type: "error",
              duration: 3000
            })
          );
        });
    }
  },
  computed: {
    getCommunes() {
      const communes = this.communes;
      const array = [];
      communes.map(commune => {
        const cat = {
          id: commune.id,
          name:
            commune.name +
            ", " +
            commune.city.name +
            ", " +
            commune.city.region.name
        };

        if (
          this.me.detail.commune !== null &&
          this.me.detail.commune.id === commune.id
        ) {
          this.userCommune = cat.name;
        }

        array.push(cat);
      });

      return array;
    }
  }
};
</script>
