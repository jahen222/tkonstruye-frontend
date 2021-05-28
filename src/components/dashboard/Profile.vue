<template>
  <div id="dashboardProfile" class="post-detail wizard-form w-100">
    <h3 class="mb-0"><i class="fas fa-user"></i> Datos de Usuario - (Usuario no validado)</h3>
    <form class="w-100 pb-40" @submit="handleProfileUpdateUserData">
      <div class="row">
        <div class="col-md-6 col-sm-6 col-lg-6">
          <div class="field-wrap w-100">
            <label>{{ getNameLabel }}:</label>
            <input
              type="text"
              v-model="me.detail.name"
              placeholder="Ingresa aquí tu respuesta."
              maxlength="128"
            />
          </div>
        </div>
        <div class="col-md-6 col-sm-6 col-lg-6">
          <div class="field-wrap w-100">
            <label>Nombre de Usuario:</label>
            <input
              type="text"
              v-model="me.detail.username"
              placeholder="Ingresa aquí tu respuesta."
              maxlength="32"
            />
          </div>
        </div>
        <div class="col-md-6 col-sm-6 col-lg-6">
          <div class="field-wrap w-100">
            <label>Correo Electrónico:</label>
            <input
              type="email"
              v-model="me.detail.email"
              placeholder="Ingresa aquí tu respuesta."
              minlength="7"
              maxlength="32"
            />
          </div>
        </div>
        <div class="col-md-6 col-sm-6 col-lg-6">
          <div class="field-wrap w-100">
            <label>Teléfono:</label>
            <div class="row">
              <div class="col-md-1 col-sm-1 col-lg-1">
                <label class="codeCountry">+56</label>
              </div>
              <div class="col-md-11 col-sm-11 col-lg-11">
                <input
                  type="text"
                  v-model="me.detail.phone"
                  minlength="13"
                  maxlength="13"
                  @input="handleFormatPhone()"
                  placeholder="Por ejemplo: 99240555"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-sm-6 col-lg-6">
          <div class="field-wrap w-100">
            <label>Comuna:</label>
            <vue-typeahead-bootstrap
              :data="getCommunes"
              :serializer="(item) => item.name"
              v-model="userCommune"
              :placeholder="'Por ejemplo: Santiago, Viña del Mar...'"
            >
            </vue-typeahead-bootstrap>
          </div>
        </div>
        <div class="col-md-6 col-sm-6 col-lg-6">
          <div class="field-wrap w-100">
            <label>Rut:</label>
            <input
              type="text"
              v-model="me.detail.rut"
              minlength="11"
              maxlength="12"
              @input="handleFormatRut()"
              placeholder="Por ejemplo: 24174768-9"
            />
          </div>
        </div>
        <div class="col-md-12 col-sm-12 col-lg-12">
          <div class="field-wrap w-100">
            <label>Eslogan:</label>
            <input
              type="text"
              v-model="me.detail.slogan"
              maxlength="128"
              placeholder="Ingresa aquí tu respuesta."
            />
          </div>
          <button class="thm-btn thm-bg" type="submit">
            Actualizar<i class="flaticon-arrow-pointing-to-right"></i>
          </button>
        </div>
      </div>
    </form>
    <hr class="pb-20" />
    <h3 class="mb-0" v-if="me.detail.role.name === 'Professional'">
      Datos de Empresa
    </h3>
    <form
      class="w-100 pb-40"
      v-if="me.detail.role.name === 'Professional'"
      @submit="handleProfileUpdateCompanyData"
    >
      <div class="row">
        <div class="col-md-12 col-sm-12 col-lg-12">
          <div class="field-wrap w-100">
            <label>Giro:</label>
            <textarea
              v-model="me.detail.giro"
              placeholder="Ingresa aquí tu respuesta."
              maxlength="512"
            ></textarea>
          </div>
          <div class="field-wrap w-100">
            <label>Contacto:</label>
            <textarea
              v-model="me.detail.contact"
              placeholder="Ingresa aquí tu respuesta."
              maxlength="512"
            ></textarea>
          </div>
          <button class="thm-btn thm-bg" type="submit">
            Actualizar<i class="flaticon-arrow-pointing-to-right"></i>
          </button>
        </div>
      </div>
    </form>
    <hr class="pb-20" v-if="me.detail.role.name === 'Professional'" />
    <h3 class="mb-0">Restablecer Contraseña</h3>
    <form class="w-100 pb-40" @submit="handleProfileForgotPassword">
      <div class="row">
        <div class="col-md-6 col-sm-6 col-lg-6">
          <div class="field-wrap w-100">
            <label>Correo Electrónico:</label>
            <input
              type="email"
              v-model="forgotPasswordEmail"
              placeholder="Ingresa aquí tu respuesta."
              minlength="7"
              maxlength="32"
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
    <hr class="pb-20" />
    <h3 class="mb-0">Imagen de Perfil</h3>
    <form class="w-100" @submit="handleProfileUploadPhoto">
      <div class="row">
        <div class="col-md-6 col-sm-6 col-lg-6">
          <div class="field-wrap w-100">
            <label>Imagen o Foto (png, jpg, svg ó gif):</label>
            <input
              type="file"
              name="files"
              @change="handlePhotoChange"
              ref="photo"
            />
            <div class="row">
              <div class="col-md-3 col-sm-3 col-lg-3">
                <label for="inputPhoto" @click="$refs.photo.click()"
                  ><i class="fas fa-upload iconUploadImage"></i
                ></label>
              </div>
              <div
                class="col-md-4 col-sm-4 col-lg-4 previewPhoto"
                v-if="previewPhoto"
              >
                <img v-if="previewPhoto" :src="previewPhoto" />
              </div>
              <div class="col-md-5 col-sm-5 col-lg-5" v-if="photo">
                <label>{{ photo.name }}</label>
              </div>
            </div>
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
      photo: "",
      previewPhoto: ""
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

      if (email.length < 7 || email.length > 32) {
        validate = false;
        this.$toast.open({
          message: "Ingrese un correo válido.",
          type: "error",
          duration: 3000
        });
      } else if (username.length < 1 || username.length > 32) {
        validate = false;
        this.$toast.open({
          message: "Ingrese un nombre de usuario válido.",
          type: "error",
          duration: 3000
        });
      } else if (phone.length !== 13 || phone[1] != 9) {
        validate = false;
        this.$toast.open({
          message: "Ingrese un teléfono válido.",
          type: "error",
          duration: 3000
        });
      } else if (name && name.length > 128) {
        validate = false;
        this.$toast.open({
          message: "Ingrese un nombre válido.",
          type: "error",
          duration: 3000
        });
      } else if (rut && !this.checkRutModule11(rut)) {
        validate = false;
        this.$toast.open({
          message: "Ingrese un rut válido.",
          type: "error",
          duration: 3000
        });
      } else if (slogan && slogan.length > 128) {
        validate = false;
        this.$toast.open({
          message: "Ingrese un eslogan válido.",
          type: "error",
          duration: 3000
        });
      }

      if (this.getCommunes.some(commune => commune.name === this.userCommune)) {
        commune = this.getCommunes
          .filter(commune => commune.name === this.userCommune)
          .shift().id;
      } else if (this.userCommune) {
        validate = false;
        this.$toast.open({
          message: "Seleccione una comuna válida.",
          type: "error",
          duration: 3000
        });
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
              message: "Usuario actualizado exitosamente.",
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
      let validate = true;

      if (giro && (giro.length < 16 || giro.length > 512)) {
        validate = false;
        this.$toast.open({
          message: "Ingrese un giro de al menos 16 caracteres.",
          type: "error",
          duration: 3000
        });
      } else if (contact && (contact.length <= 10 || contact.length > 256)) {
        validate = false;
        this.$toast.open({
          message: "Ingrese nombre y apellidos validos.",
          type: "error",
          duration: 3000
        });
      }

      if (validate) {
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
              message: "Usuario actualizado exitosamente.",
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
    handleProfileUploadPhoto(e) {
      e.preventDefault();
      const file = this.photo;
      let validate = true;

      if (!file) {
        validate = false;
        this.$toast.open({
          message: "Seleccione una imagen.",
          type: "error",
          duration: 3000
        });
      }

      if (validate) {
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
                  message: "Imagen actualizada exitosamente.",
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
    handleProfileForgotPassword(e) {
      e.preventDefault();
      const email = this.forgotPasswordEmail;
      let validate = true;

      if (email.length < 7 || email.length > 32) {
        validate = false;
        this.$toast.open({
          message: "Ingrese un correo válido.",
          type: "error",
          duration: 3000
        });
      }

      if (validate) {
        this.$apollo
          .mutate({
            mutation: PROFILE_FORGOT_PASSWORD,
            variables: {
              email
            }
          })
          .then(() => {
            this.$toast.open({
              message: "Correo enviado exitosamente.",
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
    handlePhotoChange(e) {
      if (
        e.target.files[0].type === "image/png" ||
        e.target.files[0].type === "image/jpg" ||
        e.target.files[0].type === "image/jpeg" ||
        e.target.files[0].type === "image/gif" ||
        e.target.files[0].type === "image/svg"
      ) {
        this.photo = e.target.files[0];
        this.previewPhoto = URL.createObjectURL(this.photo);
      } else {
        this.$toast.open({
          message: "Seleccione un archivo con un formato válido.",
          type: "error",
          duration: 3000
        });
      }
    },
    handleFormatPhone() {
      const formatedPhone = this.me.detail.phone
        ? this.me.detail.phone.replace(/[^\d]/g, "")
        : "";
      this.me.detail.phone = formatedPhone
        .replace(/(\d{1})(\d{4})(\d{4})/, "($1) $2-$3")
        .substr(0, 13);
    },
    handleFormatRut() {
      const formatedRut = this.me.detail.rut
        ? this.me.detail.rut.replace(/[^\dKk]/g, "")
        : "";
      this.me.detail.rut = formatedRut
        .replace(/(\d{1,2})(\d{3})(\d{3})([\dKk]{1})/, "$1.$2.$3-$4")
        .substr(0, 12);
    },
    checkRutModule11(rut) {
      // by-> https://gist.github.com/rotvulpix/69a24cc199a4253d058c
      let valor = rut.replaceAll(".", "");
      valor = valor.replace("-", "");
      let cuerpo = valor.slice(0, -1);
      let dv = valor.slice(-1).toUpperCase();
      rut = cuerpo + "-" + dv;

      if (cuerpo.length < 7 || cuerpo.length > 8) {
        return false;
      }
      let suma = 0;
      let multiplo = 2;

      for (let i = 1; i <= cuerpo.length; i++) {
        let index = multiplo * valor.charAt(cuerpo.length - i);
        suma = suma + index;
        if (multiplo < 7) {
          multiplo = multiplo + 1;
        } else {
          multiplo = 2;
        }
      }
      let dvEsperado = 11 - (suma % 11);
      dv = dv == "K" ? 10 : dv;
      dv = dv == 0 ? 11 : dv;

      if (dvEsperado != dv) {
        return false;
      } else {
        return true;
      }
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
    },
    getNameLabel() {
      if (this.me.detail.rut && this.me.detail.rut.substr(0, 2) >= 50) {
        return "Razón Social";
      }
      else if (this.me.detail.rut && this.me.detail.rut.substr(0, 2) < 50) {
        return "Nombre";
      }
      else {
        return "Nombre o Razón Social"
      }
    }
  }
};
</script>

<style scoped>
.iconUploadImage:hover {
  color: #ff5e15;
}
.codeCountry {
  margin-top: 5px;
  margin-bottom: 0px;
}
</style>
