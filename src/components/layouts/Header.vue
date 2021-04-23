<template>
  <header class="stick style1 w-100">
    <div class="topbar bg-color1 w-100">
      <div class="container">
        <div
          class="topbar-inner d-flex flex-wrap justify-content-between align-items-center w-100"
        >
          <ul class="topbar-info-list mb-0 list-unstyled d-inline-flex">
            <li>
              <i class="thm-clr fas fa-map-marker-alt"></i>27 Division,
              mirpur-12, pallbi.
            </li>
            <li>
              <i class="thm-clr far fa-envelope-open"></i>Email:
              <a href="javascript:void(0);" title="">bioxin0011@gmail.com</a>
            </li>
          </ul>
          <ul
            class="topbar-links mb-0 list-unstyled d-inline-flex"
            v-if="getUsername !== ''"
          >
            <li>
              <a href="#" title="">Bienvenido {{ getUsername }}</a>
            </li>
            <li>
              <router-link to="/dashboard"> Dashboard </router-link>
            </li>
            <li>
              <a href="#" data-toggle="modal" title="" v-on:click="handleLogout"
                >Salir</a
              >
            </li>
          </ul>
          <ul class="topbar-links mb-0 list-unstyled d-inline-flex" v-else>
            <li>
              <a href="#loginModal" data-toggle="modal" title=""
                >Iniciar Sesión</a
              >
            </li>
            <li>
              <a href="#signUpRegularModal" data-toggle="modal" title=""
                >Registrarse</a
              >
            </li>
            <li>
              <a href="#signUpProfessionalModal" data-toggle="modal" title=""
                >Hazte Profesional</a
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
              <span>24/7 Phone Services</span>
              <strong>555 666 999 00</strong>
            </div>
            <div class="add-cart">
              <a href="cart.html" title="">
                <i class="thm-bg fas fa-shopping-basket"></i>
                Add to Cart
                <span class="d-block">(Item: 02)</span>
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
              <li class="menu-item-has-children">
                <a href="javascript:void(0);" title="">Home</a>
                <ul class="mb-0 list-unstyled">
                  <li><a href="index.html" title="">Homepage 1</a></li>
                  <li><a href="index2.html" title="">Homepage 2</a></li>
                  <li><a href="index3.html" title="">Homepage 3</a></li>
                </ul>
              </li>
              <li><a href="about.html" title="">About Us</a></li>
              <li class="menu-item-has-children">
                <a href="javascript:void(0);" title="">Projects</a>
                <ul class="mb-0 list-unstyled">
                  <li><a href="projects.html" title="">Projects</a></li>
                  <li>
                    <a href="project-detail.html" title="">Project Detail</a>
                  </li>
                </ul>
              </li>
              <li class="menu-item-has-children">
                <a href="javascript:void(0);" title="">Pages</a>
                <ul class="mb-0 list-unstyled">
                  <li class="menu-item-has-children">
                    <a href="javascript:void(0);" title="">Services</a>
                    <ul class="mb-0 list-unstyled">
                      <li><a href="services.html" title="">Services</a></li>
                      <li>
                        <a href="services-detail.html" title=""
                          >Service Detail</a
                        >
                      </li>
                    </ul>
                  </li>
                  <li><a href="team.html" title="">Team</a></li>
                  <li>
                    <a href="testimonials.html" title="">Testimonials</a>
                  </li>
                  <li><a href="faq.html" title="">FAQ's</a></li>
                </ul>
              </li>
              <li class="menu-item-has-children">
                <a href="javascript:void(0);" title="">Blog</a>
                <ul class="mb-0 list-unstyled">
                  <li><a href="blog.html" title="">Blog</a></li>
                  <li>
                    <a href="blog-detail.html" title="">Blog Detail</a>
                  </li>
                </ul>
              </li>
              <li class="menu-item-has-children">
                <a href="javascript:void(0);" title="">Shop</a>
                <ul class="mb-0 list-unstyled">
                  <li><a href="shop.html" title="">Shop</a></li>
                  <li>
                    <a href="shop-detail.html" title="">Shop Detail</a>
                  </li>
                  <li><a href="cart.html" title="">Cart</a></li>
                  <li><a href="checkout.html" title="">Checkout</a></li>
                </ul>
              </li>
              <li><a href="contact.html" title="">Contact Us</a></li>
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
            <h4 class="modal-title">Iniciar Sesión</h4>
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
                      <label>Correo</label>
                      <input
                        type="email"
                        v-model="email"
                        placeholder="Ingrese su correo."
                        :required="true"
                      />
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12 col-lg-12">
                    <div class="field-wrap w-100">
                      <label>Contraseña</label>
                      <input
                        type="password"
                        v-model="password"
                        placeholder="Ingrese su contraseña."
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
                      <a
                        class="link"
                        href="#"
                      >
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
            <h4 class="modal-title">Registrarse</h4>
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
                      <label>Nombre de Usuario</label>
                      <input
                        type="text"
                        v-model="username"
                        placeholder="Ingrese su nombre de usuario."
                        :required="true"
                      />
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12 col-lg-12">
                    <div class="field-wrap w-100">
                      <label>Correo</label>
                      <input
                        type="email"
                        v-model="email"
                        placeholder="Ingrese su correo."
                        :required="true"
                      />
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12 col-lg-12">
                    <div class="field-wrap w-100">
                      <label>Teléfono</label>
                      <input
                        type="text"
                        v-model="phone"
                        placeholder="Ingrese su número de teléfono."
                        :required="true"
                      />
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12 col-lg-12">
                    <div class="field-wrap w-100">
                      <label>Contraseña</label>
                      <input
                        type="password"
                        v-model="password"
                        placeholder="Ingrese su contraseña."
                        :required="true"
                      />
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12 col-lg-12">
                    <div class="field-wrap w-100">
                      <label>Confirmar Contraseña</label>
                      <input
                        type="password"
                        v-model="passwordConfirm"
                        placeholder="Ingrese su contraseña nuevamente."
                        :required="true"
                      />
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12 col-lg-12 right">
                    <div class="field-wrap w-100">
                      <a
                        class="link"
                        @click="handleChangeModal('loginModal')"
                      >
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
    <!-- Sign Up Professional User Modal -->
    <div
      id="signUpProfessionalModal"
      ref="signUpProfessionalModal"
      class="modal fade"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Hazte Profesional</h4>
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
                      <label>Nombre de Usuario</label>
                      <input
                        type="text"
                        v-model="username"
                        placeholder="Ingrese su nombre de usuario."
                        :required="true"
                      />
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12 col-lg-12">
                    <div class="field-wrap w-100">
                      <label>Correo</label>
                      <input
                        type="email"
                        v-model="email"
                        placeholder="Ingrese su correo."
                        :required="true"
                      />
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12 col-lg-12">
                    <div class="field-wrap w-100">
                      <label>Teléfono</label>
                      <input
                        type="text"
                        v-model="phone"
                        placeholder="Ingrese su número de teléfono."
                        :required="true"
                      />
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12 col-lg-12">
                    <div class="field-wrap w-100">
                      <label>Contraseña</label>
                      <input
                        type="password"
                        v-model="password"
                        placeholder="Ingrese su contraseña."
                        :required="true"
                      />
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12 col-lg-12">
                    <div class="field-wrap w-100">
                      <label>Confirmar Contraseña</label>
                      <input
                        type="password"
                        v-model="passwordConfirm"
                        placeholder="Ingrese su contraseña nuevamente."
                        :required="true"
                      />
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12 col-lg-12 right">
                    <div class="field-wrap w-100">
                      <a
                        class="link"
                        @click="handleChangeModal('loginModal')"
                      >
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
    <Wizard />
  </header>
</template>

<script>
import $ from "jquery";
import Cookies from "js-cookie";
import { mapMutations } from "vuex";
import { HEADER_GET_LOGO, HEADER_GET_ROLES } from "./constants/querys";
import { HEADER_USER_LOGIN, HEADER_USER_REGISTER } from "./constants/mutations";
import Wizard from "../common/Wizard";

export default {
  name: "Header",
  data() {
    return {
      api_url: process.env.VUE_APP_STRAPI_API_URL,
      config: {
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
      error: ""
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
    },
    handleRegister(e) {
      e.preventDefault();
      const { username, email, password, passwordConfirm, phone } = this.$data;
      const role = this.roles.filter(rol => rol.name === "Authenticated")[0].id;

      if (password !== passwordConfirm) {
        this.error = "Las contraseñas no coinciden";
      } else {
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

      if (password !== passwordConfirm) {
        this.error = "Las contraseñas no coinciden";
      } else {
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
    handleLogout: function() {
      this.logout();
      this.$router.go();
    },
    handleCloseModal: function() {
      this.email = "";
      this.error = "";
      this.password = "";
      this.phone = "";
      this.role = "";
      this.username = "";
    },
    handleChangeModal(nameModal) {
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
</style>
