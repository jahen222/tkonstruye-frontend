<template>
  <div class="rspn-hdr">
    <!-- Responsive Menu -->
    <div class="rspn-mdbr">
      <div class="rspn-scil">
        <a href="javascript:void(0);" title="Twitter" target="_blank"
          ><i class="fab fa-twitter"></i
        ></a>
        <a href="javascript:void(0);" title="Facebook" target="_blank"
          ><i class="fab fa-facebook-f"></i
        ></a>
        <a href="javascript:void(0);" title="Linkedin" target="_blank"
          ><i class="fab fa-linkedin-in"></i
        ></a>
        <a href="javascript:void(0);" title="Google Plus" target="_blank"
          ><i class="fab fa-google-plus-g"></i
        ></a>
      </div>
    </div>
    <div class="lg-mn">
      <div class="logo">
        <a href="/" title="Home"><img :src="getLogo" alt="Logo" /></a>
      </div>
      <div class="rspn-cnt">
        <span
          ><i class="thm-clr far fa-envelope-open"></i
          ><a v-if="config.email" href="#" title="">{{ config.email }}</a
          ><a v-else href="#" title="">bioxin0011@gmail.com</a></span
        >
        <span v-if="config.address"
          ><i class="thm-clr fas fa-map-marker-alt"></i
          >{{ config.address }}</span
        >
        <span v-else
          ><i class="thm-clr fas fa-map-marker-alt"></i>27 Division, mirpur-12,
          pallbi.</span
        >
      </div>
      <span class="rspn-mnu-btn"><i class="fa fa-list-ul"></i></span>
    </div>
    <div class="rsnp-mnu">
      <span class="rspn-mnu-cls"><i class="fa fa-times"></i></span>
      <ul class="mb-0 list-unstyled w-100">
        <li><a href="/" title="">Home</a></li>
        <li>
          <a href="#" title="" data-toggle="modal" data-target="#wizardModal"
            >Pedir Presupuesto</a
          >
        </li>
        <li v-if="getUsername">
          <a href="/find-work" title="">Buscar Trabajos</a>
        </li>
        <li v-else>
          <a href="#loginModal" data-toggle="modal" title="">Buscar Trabajos</a>
        </li>
        <li><a href="/" title="">Home</a></li>
        <li><a href="blog.html" title="">Blog</a></li>
        <li><a href="/subscriptions" title="">Planes</a></li>
        <li><a href="about.html" title="">Nosotros</a></li>
        <li><a href="contact.html" title="">Contacto</a></li>
        <li v-if="getUsername">
          <router-link to="/dashboard"
            ><i class="thm-clr fas fa-cog"></i>Ajustes
          </router-link>
        </li>
        <li v-if="getUsername">
          <a href="#" data-toggle="modal" title="" v-on:click="handleLogout"
            ><i class="thm-clr fas fa-sign-out-alt"></i>

            Salir</a
          >
        </li>
        <li v-if="!getUsername">
          <a @click="openLoginModal" title=""
            ><i class="thm-clr far fa-user"></i> Iniciar Sesión</a
          >
        </li>
        <li v-if="!getUsername">
          <a href="#signUpRegularModal" data-toggle="modal" title=""
            ><i class="thm-clr far fa-edit"></i> Registrarse</a
          >
        </li>
        <li v-if="!getUsername">
          <a href="#signUpProfessionalModal" data-toggle="modal" title=""
            ><i class="thm-clr fas fa-briefcase"></i> Hazte Profesional</a
          >
        </li>
      </ul>
    </div>
    <!-- Login Modal -->
    <div id="loginModal" ref="loginModal" class="modal" style="z-index: 99999">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">
              <i class="fas fa-user"></i> Iniciar Sesión
            </h4>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-hidden="true"
              @click="handleCloseModal"
            >
              &times;
            </button>
          </div>
          <div class="modal-body">
            <div class="post-detail wizard-form w-100">
              <form class="w-100 pb-50 pb-custom" @submit="handleLogin">
                <div class="row">
                  <div class="col-md-12 col-sm-12 col-lg-12">
                    <div class="field-wrap w-100">
                      <label><i class="fas fa-envelope"></i> Correo</label>
                      <input
                        type="email"
                        v-model="email"
                        placeholder="Ingrese su correo."
                        minlength="7"
                        maxlength="32"
                        :required="true"
                      />
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12 col-lg-12">
                    <div class="field-wrap w-100">
                      <label><i class="fas fa-lock"></i> Contraseña</label>
                      <div class="row">
                        <div class="col-md-10 col-sm-10 col-lg-10">
                          <input
                            ref="loginPassword"
                            type="password"
                            v-model="password"
                            placeholder="Ingrese su contraseña."
                            minlength="8"
                            maxlength="32"
                            :required="true"
                          />
                        </div>
                        <div class="col-md-2 col-sm-2 col-lg-2">
                          <button
                            class="btn"
                            type="button"
                            @click="handleShowPassword('loginPassword')"
                          >
                            <span class="fa fa-eye-slash icon link"></span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12 col-lg-12 right">
                    <div class="field-wrap w-100">
                      <a
                        class="link"
                        href="#"
                        @click="handleChangeModal('signUpRegularModal')"
                      >
                        <i class="far fa-edit"></i> Registrarse
                      </a>
                      <br />
                      <a
                        class="link"
                        href="#"
                        @click="handleChangeModal('signUpProfessionalModal')"
                      >
                        <i class="fas fa-briefcase"></i> Hazte Profesional
                      </a>
                      <br />
                      <a class="link" href="#">
                        <i class="fas fa-unlock"></i> ¿Has olvidado la
                        contraseña?
                      </a>
                    </div>
                  </div>
                  <div
                    class="col-md-12 col-sm-12 col-lg-12 center"
                    v-if="error"
                  >
                    <div class="field-wrap w-100 error-message">
                      <label class="error-label">{{ error }}</label>
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12 col-lg-12 pt-50 center">
                    <button class="thm-btn thm-bg" type="submit">
                      Iniciar Sesión<i
                        class="flaticon-arrow-pointing-to-right"
                      ></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Cookies from "js-cookie";
import { mapMutations } from "vuex";
import { RESPONSIVEHEADER_GET_LOGO } from "./constants/querys";
import { HEADER_USER_LOGIN, HEADER_USER_REGISTER } from "./constants/mutations";

export default {
  name: "ResponsiveHeader",
  data() {
    return {
      api_url: process.env.VUE_APP_STRAPI_API_URL,
      config: {
        email: "",
        address: "",
        phone: "",
        logo_mobile: {
          url: "",
        },
      },
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
      phone: "",
      error: "",
      me: {
        detail: {
          id: "",
          balance: "",
          photo: {
            url: "",
          },
        },
      },
    };
  },
  apollo: {
    config: {
      query: RESPONSIVEHEADER_GET_LOGO,
    },
  },
  methods: {
    ...mapMutations({
      setUser: "setUser",
      logout: "logout",
    }),
    openLoginModal() {
      $(".rsnp-mnu").removeClass("slidein");
      $("#loginModal").modal("show");
    },
    handleLogin(e) {
      e.preventDefault();
      const { email, password } = this.$data;
      let validate = true;

      if (email.length < 7 || email.length > 32) {
        validate = false;
        this.error = "Ingrese un correo válido.";
      } else if (password.length < 8 || password.length > 32) {
        validate = false;
        this.error = "Ingrese una contraseña válida.";
      }

      if (validate) {
        this.$apollo
          .mutate({
            mutation: HEADER_USER_LOGIN,
            variables: {
              email,
              password,
            },
          })
          .then((data) => {
            this.$toast.open({
              message: "Bienvenido, " + data.data.login.user.username,
              type: "success",
              duration: 3000,
            });
            this.setUser(data.data.login);
            this.$router.go();
          })
          .catch(({ graphQLErrors }) => {
            graphQLErrors.map(({ extensions }) =>
              extensions.exception.data.message.map(({ messages }) =>
                messages.map(({ message }) => (this.error = message))
              )
            );
          });
      }
    },
    handleRegister(e) {
      e.preventDefault();
      const { username, email, password, passwordConfirm, phone } = this.$data;
      const role = this.roles.filter((rol) => rol.name === "Authenticated")[0]
        .id;
      let validate = true;

      if (email.length < 7 || email.length > 32) {
        validate = false;
        this.error = "Ingrese un correo válido.";
      } else if (username.length > 32) {
        validate = false;
        this.error = "Ingrese un nombre de usuario válido.";
      } else if (phone.length != 13) {
        validate = false;
        this.error = "Ingrese un teléfono válido.";
      } else if (password.length < 8 || password.length > 32) {
        validate = false;
        this.error = "Ingrese una contraseña válida.";
      } else if (passwordConfirm.length < 8 || passwordConfirm.length > 32) {
        validate = false;
        this.error = "Ingrese una contraseña válida.";
      } else if (password !== passwordConfirm) {
        validate = false;
        this.error = "Las contraseñas no coinciden";
      }

      if (validate) {
        this.$apollo
          .mutate({
            mutation: HEADER_USER_REGISTER,
            variables: {
              username,
              email,
              password,
              phone,
              role,
              balance: 0,
            },
          })
          .then(() => {
            this.handleLogin(e);
          })
          .catch(({ graphQLErrors }) => {
            //this.error = "Nombre de usuario o Correo no disponible.";
            graphQLErrors.map(({ extensions }) =>
              extensions.exception.data.message.map(({ messages }) =>
                messages.map(({ message }) => (this.error = message))
              )
            );
          });
      }
    },
    handleProfessionalRegister(e) {
      e.preventDefault();
      const { username, email, password, passwordConfirm, phone } = this.$data;
      const role = this.roles.filter((rol) => rol.name === "Professional")[0]
        .id;
      let validate = true;

      if (email.length < 7 || email.length > 32) {
        validate = false;
        this.error = "Ingrese un correo válido.";
      } else if (username.length > 32) {
        validate = false;
        this.error = "Ingrese un nombre de usuario válido.";
      } else if (phone.length != 13) {
        validate = false;
        this.error = "Ingrese un teléfono válido.";
      } else if (password.length < 8 || password.length > 32) {
        validate = false;
        this.error = "Ingrese una contraseña válida.";
      } else if (passwordConfirm.length < 8 || passwordConfirm.length > 32) {
        validate = false;
        this.error = "Ingrese una contraseña válida.";
      } else if (password !== passwordConfirm) {
        validate = false;
        this.error = "Las contraseñas no coinciden";
      }

      if (validate) {
        this.$apollo
          .mutate({
            mutation: HEADER_USER_REGISTER,
            variables: {
              username,
              email,
              password,
              phone,
              role,
              balance: 0,
            },
          })
          .then(() => {
            this.handleLogin(e);
          })
          .catch(() => {
            this.error = "Nombre de usuario o Correo no disponible.";
            /* graphQLErrors.map(({ extensions }) =>
              extensions.exception.data.message.map(({ messages }) =>
                messages.map(({ message }) => (this.error = message))
              )
            ); */
          });
      }
    },
    handleLogout() {
      this.logout();
      this.$router.go();
    },
    handleCloseModal() {
      this.email = "";
      this.error = "";
      this.password = "";
      this.passwordConfirm = "";
      this.phone = "";
      this.role = "";
      this.username = "";
    },
    handleChangeModal(nameModal) {
      this.email = "";
      this.error = "";
      this.password = "";
      this.passwordConfirm = "";
      this.phone = "";
      this.role = "";
      this.username = "";

      if (nameModal === "loginModal") {
        $("#loginModal").modal("show");
        $("#signUpRegularModal").modal("hide");
        $("#signUpProfessionalModal").modal("hide");
        $("#welcomeModal").modal("hide");
      } else if (nameModal === "signUpRegularModal") {
        $("#loginModal").modal("hide");
        $("#signUpRegularModal").modal("show");
        $("#signUpProfessionalModal").modal("hide");
        $("#welcomeModal").modal("hide");
      } else if (nameModal === "signUpProfessionalModal") {
        $("#loginModal").modal("hide");
        $("#signUpRegularModal").modal("hide");
        $("#signUpProfessionalModal").modal("show");
        $("#welcomeModal").modal("hide");
      }
    },
    handleFormatPhone() {
      const formatedPhone = this.phone ? this.phone.replace(/[^\d]/g, "") : "";
      this.phone = formatedPhone
        .replace(/(\d{1})(\d{4})(\d{4})/, "($1) $2-$3")
        .substr(0, 13);
    },
  },
  computed: {
    getUsername() {
      let user = "";
      if (Cookies.get("user") !== undefined) {
        user = JSON.parse(Cookies.get("user"));
        return user.username;
      }
      return user;
    },
    getLogo() {
      return this.api_url + this.config.logo_mobile.url;
    },
  },
};
</script>

<style scoped>
.logo {
  width: 20%;
}
.modal-backdrop {
  z-index: -1 !important;
}
</style>
