<template>
  <header class="stick style1 w-100">
    <div class="topbar bg-color1 w-100">
      <div class="container">
        <div
          class="topbar-inner d-flex flex-wrap justify-content-between align-items-center w-100"
        >
          <ul class="topbar-info-list mb-0 list-unstyled d-inline-flex">
            <li v-if="config.address">
              <i class="thm-clr fas fa-map-marker-alt"></i>{{ config.address }}
            </li>
            <li v-else>
              <i class="thm-clr fas fa-map-marker-alt"></i>27 Division,
              mirpur-12, pallbi.
            </li>
            <li>
              <i class="thm-clr far fa-envelope-open"></i>Email:

              <a href="javascript:void(0);" title="" v-if="config.email">
                {{ config.email }}</a
              >
              <a href="#" title="" v-else>bioxin0011@gmail.com</a>
            </li>
          </ul>
          <ul
            class="topbar-info-list topbar-links-custom mb-0 list-unstyled d-inline-flex"
            v-if="getUsername"
          >
            <li>
              <a href="#" title=""
                ><i class="thm-clr thm-clr far fa-user"></i> Bienvenido,
                {{ getUsername }}</a
              >
            </li>
            <li>
              <router-link to="/dashboard"
                ><i class="thm-clr fas fa-cog"></i>Ajustes
              </router-link>
            </li>
            <li>
              <a href="#" data-toggle="modal" title="" v-on:click="handleLogout"
                ><i class="thm-clr fas fa-sign-out-alt"></i>

                Salir</a
              >
            </li>
          </ul>
          <ul
            class="topbar-info-list topbar-links-custom mb-0 list-unstyled d-inline-flex"
            v-else
          >
            <li>
              <a href="#loginModal" data-toggle="modal" title=""
                ><i class="thm-clr far fa-user"></i> Iniciar Sesión</a
              >
            </li>
            <li>
              <a href="#signUpRegularModal" data-toggle="modal" title=""
                ><i class="thm-clr far fa-edit"></i> Registrarse</a
              >
            </li>
            <li>
              <a href="#signUpProfessionalModal" data-toggle="modal" title=""
                ><i class="thm-clr fas fa-briefcase"></i> Hazte Profesional</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="logo-info-bar-wrap w-100">
      <div class="container">
        <div
          class="logo-info-bar-inner w-100 d-flex flex-wrap justify-content-between align-items-center"
        >
          <div
            class="logo-social d-inline-flex flex-wrap justify-content-between align-items-center"
          >
            <div class="logo">
              <h1 class="mb-0">
                <a href="/" title="Home"
                  ><img
                    class="img-fluid"
                    :src="getLogo"
                    alt="Logo"
                    :srcset="getLogo"
                /></a>
              </h1>
            </div>
            <!-- Logo -->
            <div class="social-links">
              <a href="javascript:void(0);" title="Facebook" target="_blank"
                ><i class="fab fa-facebook-f"></i
              ></a>
              <a href="javascript:void(0);" title="Twitter" target="_blank"
                ><i class="fab fa-twitter"></i
              ></a>
              <a href="javascript:void(0);" title="Skype" target="_blank"
                ><i class="fab fa-skype"></i
              ></a>
              <a href="javascript:void(0);" title="Vimeo" target="_blank"
                ><i class="fab fa-vimeo-v"></i
              ></a>
            </div>
          </div>
          <div
            class="top-info-wrap d-inline-flex flex-wrap justify-content-between align-items-center"
          >
            <div class="call-us">
              <i class="thm-clr flaticon-phone-call"></i>
              <span>24/7 Servicio Activo</span>
              <strong v-if="config.phone">{{ config.phone }}</strong>
              <strong v-else>555 666 999 00</strong>
            </div>
            <div class="add-cart" v-if="getUsername">
              <a href="#" title="">
                <img
                  class="thm-bg img-fluid rounded-circle photo"
                  :src="api_url + me.detail.photo.url"
                  alt="About Image"
                  v-if="me.detail.photo"
                />
                {{ getUsername }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="menu-wrap">
      <div class="container">
        <nav
          class="d-inline-flex justify-content-between align-items-center w-100 bg-color1"
        >
          <div class="header-left">
            <ul class="mb-0 list-unstyled d-inline-flex">
              <li><a href="/" title="">Home</a></li>
              <li class="menu-item-has-children">
                <a href="#" title="">Buscar Trabajo</a>
                <ul class="mb-0 list-unstyled">
                  <li>
                    <a
                      href="#"
                      title=""
                      data-toggle="modal"
                      data-target="#wizardModal"
                      >Pedir Presupuesto</a
                    >
                  </li>
                  <li v-if="getUsername">
                    <a href="/find-work" title="">Buscar Trabajo</a>
                  </li>
                  <li v-else>
                    <a href="#loginModal" data-toggle="modal" title=""
                      >Buscar Trabajo</a
                    >
                  </li>
                </ul>
              </li>
              <li><a href="blog.html" title="">Blog</a></li>
              <li><a href="planes.html" title="">Planes</a></li>
              <li><a href="about.html" title="">Nosotros</a></li>
              <li><a href="contact.html" title="">Contacto</a></li>
            </ul>
          </div>
          <div class="header-right-btns">
            <a
              class="get-quote"
              href="javascript:void(0);"
              title=""
              data-toggle="modal"
              data-target="#wizardModal"
              ><i class="far fa-comments"></i>Pide Presupuesto<i
                class="flaticon-arrow-pointing-to-right"
              ></i
            ></a>
          </div>
        </nav>
      </div>
    </div>
    <!-- Login Modal -->
    <div id="loginModal" ref="loginModal" class="modal fade">
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
                      <input
                        type="password"
                        v-model="password"
                        placeholder="Ingrese su contraseña."
                        minlength="8"
                        maxlength="32"
                        :required="true"
                      />
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12 col-lg-12 right">
                    <div class="field-wrap w-100">
                      <a
                        class="link"
                        href="#"
                        @click="handleChangeModal('signUpRegularModal')"
                      >
                        Registrarse
                      </a>
                      <br />
                      <a
                        class="link"
                        href="#"
                        @click="handleChangeModal('signUpProfessionalModal')"
                      >
                        Hazte Profesional
                      </a>
                      <br />
                      <a class="link" href="#">
                        ¿Has olvidado la contraseña?
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
                      Login<i class="flaticon-arrow-pointing-to-right"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Sign Up Regular User Modal -->
    <div id="signUpRegularModal" ref="signUpRegularModal" class="modal fade">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title"><i class="far fa-edit"></i> Registrarse</h4>
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
              <form class="w-100 pb-50 pb-custom" @submit="handleRegister">
                <div class="row">
                  <div class="col-md-12 col-sm-12 col-lg-12">
                    <div class="field-wrap w-100">
                      <label
                        ><i class="fas fa-user"></i> Nombre de Usuario</label
                      >
                      <input
                        type="text"
                        v-model="username"
                        placeholder="Ingrese su nombre de usuario."
                        maxlength="32"
                        :required="true"
                      />
                    </div>
                  </div>
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
                      <div class="row">
                        <div class="col-md-4 col-sm-4 col-lg-4">
                          <label><i class="fas fa-phone"></i> Teléfono:</label>
                        </div>
                        <div class="col-md-8 col-sm-8 col-lg-8">
                          <label>+56</label>
                        </div>
                      </div>
                      <input
                        type="text"
                        v-model="phone"
                        minlength="13"
                        maxlength="13"
                        @input="handleFormatPhone()"
                        placeholder="Por ejemplo: 99240555"
                        :required="true"
                      />
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12 col-lg-12">
                    <div class="field-wrap w-100">
                      <label><i class="fas fa-lock"></i> Contraseña</label>
                      <input
                        type="password"
                        v-model="password"
                        placeholder="Ingrese su contraseña."
                        minlength="8"
                        maxlength="32"
                        :required="true"
                      />
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12 col-lg-12">
                    <div class="field-wrap w-100">
                      <label
                        ><i class="fas fa-lock"></i> Confirmar Contraseña</label
                      >
                      <input
                        type="password"
                        v-model="passwordConfirm"
                        placeholder="Ingrese su contraseña nuevamente."
                        minlength="8"
                        maxlength="32"
                        :required="true"
                      />
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12 col-lg-12 right">
                    <div class="field-wrap w-100">
                      <a class="link" @click="handleChangeModal('loginModal')">
                        Iniciar Sesión
                      </a>
                      <br />
                      <a
                        class="link"
                        @click="handleChangeModal('signUpProfessionalModal')"
                      >
                        Hazte Profesional
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
                      Registrarse<i
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
    <!-- Sign Up Professional User Modal -->
    <div
      id="signUpProfessionalModal"
      ref="signUpProfessionalModal"
      class="modal fade"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">
              <i class="fas fa-briefcase"></i> Hazte Profesional
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
              <form
                class="w-100 pb-50 pb-custom"
                @submit="handleProfessionalRegister"
              >
                <div class="row">
                  <div class="col-md-12 col-sm-12 col-lg-12">
                    <div class="field-wrap w-100">
                      <label
                        ><i class="fas fa-user"></i> Nombre de Usuario</label
                      >
                      <input
                        type="text"
                        v-model="username"
                        placeholder="Ingrese su nombre de usuario."
                        maxlength="32"
                        :required="true"
                      />
                    </div>
                  </div>
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
                      <div class="row">
                        <div class="col-md-4 col-sm-4 col-lg-4">
                          <label><i class="fas fa-phone"></i> Teléfono:</label>
                        </div>
                        <div class="col-md-8 col-sm-8 col-lg-8">
                          <label>+56</label>
                        </div>
                      </div>
                      <input
                        type="text"
                        v-model="phone"
                        minlength="13"
                        maxlength="13"
                        @input="handleFormatPhone()"
                        placeholder="Por ejemplo: 99240555"
                        :required="true"
                      />
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12 col-lg-12">
                    <div class="field-wrap w-100">
                      <label><i class="fas fa-lock"></i> Contraseña</label>
                      <input
                        type="password"
                        v-model="password"
                        placeholder="Ingrese su contraseña."
                        minlength="8"
                        maxlength="32"
                        :required="true"
                      />
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12 col-lg-12">
                    <div class="field-wrap w-100">
                      <label
                        ><i class="fas fa-lock"></i> Confirmar Contraseña</label
                      >
                      <input
                        type="password"
                        v-model="passwordConfirm"
                        placeholder="Ingrese su contraseña nuevamente."
                        minlength="8"
                        maxlength="32"
                        :required="true"
                      />
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12 col-lg-12 right">
                    <div class="field-wrap w-100">
                      <a class="link" @click="handleChangeModal('loginModal')">
                        Iniciar Sesión
                      </a>
                      <br />
                      <a
                        class="link"
                        @click="handleChangeModal('signUpRegularModal')"
                      >
                        Registrarse
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
                      Registrarse<i
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
    <Wizard />
  </header>
</template>

<script>
import $ from "jquery";
import Cookies from "js-cookie";
import { mapMutations } from "vuex";
import {
  HEADER_GET_LOGO,
  HEADER_GET_ROLES,
  HEADER_GET_PHOTO
} from "./constants/querys";
import { HEADER_USER_LOGIN, HEADER_USER_REGISTER } from "./constants/mutations";
import Wizard from "../common/Wizard";

export default {
  name: "Header",
  data() {
    return {
      api_url: process.env.VUE_APP_STRAPI_API_URL,
      config: {
        email: "",
        address: "",
        phone: "",
        logo: {
          url: ""
        }
      },
      role: "",
      roles: [],
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
      phone: "",
      error: "",
      me: {
        detail: {
          photo: {
            url: ""
          }
        }
      }
    };
  },
  components: {
    Wizard
  },
  apollo: {
    config: {
      query: HEADER_GET_LOGO
    },
    roles: {
      query: HEADER_GET_ROLES
    },
    me: {
      query: HEADER_GET_PHOTO,
      skip() {
        return !this.getUsername;
      }
    }
  },
  methods: {
    ...mapMutations({
      setUser: "setUser",
      logout: "logout"
    }),
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
              password
            }
          })
          .then(data => {
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
      const role = this.roles.filter(rol => rol.name === "Authenticated")[0].id;
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
              role
            }
          })
          .then(() => {
            this.handleLogin(e);
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
    handleProfessionalRegister(e) {
      e.preventDefault();
      const { username, email, password, passwordConfirm, phone } = this.$data;
      const role = this.roles.filter(rol => rol.name === "Professional")[0].id;
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
              role
            }
          })
          .then(() => {
            this.handleLogin(e);
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
      } else if (nameModal === "signUpRegularModal") {
        $("#loginModal").modal("hide");
        $("#signUpRegularModal").modal("show");
        $("#signUpProfessionalModal").modal("hide");
      } else if (nameModal === "signUpProfessionalModal") {
        $("#loginModal").modal("hide");
        $("#signUpRegularModal").modal("hide");
        $("#signUpProfessionalModal").modal("show");
      }
    },
    handleFormatPhone() {
      const formatedPhone = this.phone ? this.phone.replace(/[^\d]/g, "") : "";
      this.phone = formatedPhone
        .replace(/(\d{1})(\d{4})(\d{4})/, "($1) $2-$3")
        .substr(0, 13);
    }
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
      return this.api_url + this.config.logo.url;
    }
  },
  mounted() {
    $(this.$refs.loginModal).on("hidden.bs.modal", this.handleCloseModal);
    $(this.$refs.signUpRegularModal).on(
      "hidden.bs.modal",
      this.handleCloseModal
    );
    $(this.$refs.signUpProfessionalModal).on(
      "hidden.bs.modal",
      this.handleCloseModal
    );
  }
};
</script>

<style scoped>
.logo {
  width: 180px;
}
.wizard-form {
  margin-top: 0px;
}
.pb-custom {
  padding-left: 5%;
  padding-right: 5%;
}
.center {
  text-align: center;
}
.right {
  text-align: right;
}
.error-message {
  margin-bottom: -30px;
}
.error-label {
  color: red !important;
}
.link {
  color: #777;
  font-size: 1rem;
  font-weight: bold;
}
.link:hover {
  color: #ff5e15;
}
.photo {
  width: 50px;
  height: 50px;
  border: 2px solid #ff5e15;
}
</style>
