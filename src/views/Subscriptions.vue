<template>
  <div class="findWork">
    <main>
      <Header />
      <!-- Header -->
      <StickyMenu />
      <!-- Sticky Menu -->
      <ResponsiveHeader />
      <!-- Responsive Header -->
      <section>
        <div class="w-100 pt-100 pb-70 position-relative">
          <div class="container">
            <div class="sec-title v2 text-center w-100">
              <div class="sec-title-inner d-inline-block">
                <span class="thm-clr d-block"
                  >Nuestros planes y subscripciones</span
                >
                <h2 class="mb-0">
                  Elige uno de nuestros planes para que puedas obtener
                  beneficios y descuentos
                </h2>
              </div>
            </div>
            <div class="serv-wrap text-center w-100">
              <div class="row res-caro">
                <div
                  v-for="(subscription, index) in subscriptions"
                  v-bind:key="index"
                  class="col-md-4 col-sm-6 col-lg-4"
                >
                  <div
                    class="serv-box2 position-relative overflow-hidden w-100"
                    style="
                      background-image: url(assets/images/resources/serv-bg1.jpg);
                    "
                  >
                    <i :class="'thm-clr ' + subscription.icon"></i>
                    <div class="serv-box-inner">
                      <h3 class="mb-0">
                        <a
                          v-if="getUser && getUser.role.name === 'Professional'"
                          type="button"
                          aria-hidden="true"
                          @click="handleOpenProfessionalModal(subscription)"
                          >{{ subscription.name }}</a
                        >
                        <a
                          v-else-if="
                            getUser && getUser.role.name === 'Authenticated'
                          "
                          href="#nonProfessionalModal"
                          data-toggle="modal"
                          title=""
                          >{{ subscription.name }}</a
                        >
                        <a
                          v-else
                          href="#welcomeModal"
                          data-toggle="modal"
                          title=""
                          >{{ subscription.name }}</a
                        >
                      </h3>
                      <p class="mb-0">
                        {{ subscription.description }}
                      </p>
                      <span class="d-block"
                        ><i class="thm-clr">Precio Mensual: </i>
                        {{ subscription.price }} $<br />
                        <i class="thm-clr">Descuento: </i>
                        {{ subscription.discount }} %</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Services Wrap -->
          </div>
        </div>
      </section>
      <Footer />
      <!-- Footer -->
      <Copyright />
      <!-- Copyright -->
      <!-- Non Professional Modal -->
      <div
        id="nonProfessionalModal"
        ref="nonProfessionalModal"
        class="modal fade"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">
                <i class="fas fa-user"></i> Bienvenido
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
                <div class="row pb-50 pb-custom">
                  <div class="col-md-12 col-sm-12 col-lg-12 center">
                    <div class="field-wrap w-100">
                      <label
                        >Solo los usuarios registrados como profesionales pueden
                        adquirir subscripciones</label
                      >
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12 col-lg-12 pt-50 center">
                    <button
                      class="thm-btn thm-bg"
                      type="button"
                      data-dismiss="modal"
                      aria-hidden="true"
                      @click="handleCloseModal"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Professional Modal -->
      <div id="professionalModal" ref="professionalModal" class="modal fade">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">
                <i class="fas fa-user"></i> Bienvenido
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
                <div class="row pb-50 pb-custom">
                  <div class="col-md-12 col-sm-12 col-lg-12 center">
                    <div class="field-wrap w-100">
                      <label>¿deseas adquirir esta subscripción?</label>
                      <label
                        >Saldo disponible:
                        {{ me.detail.balance ? me.detail.balance : "0" }}</label
                      >
                    </div>
                  </div>
                  <div class="col-md-6 col-sm-6 col-lg-6 pt-50 center">
                    <button
                      class="thm-btn thm-bg"
                      type="button"
                      data-dismiss="modal"
                      aria-hidden="true"
                      :disabled="me.detail.balance < this.selectSubscription.price"
                      @click="handleSetSubcriptionToUser"
                    >
                      Con Saldo
                    </button>
                  </div>
                  <div class="col-md-6 col-sm-6 col-lg-6 pt-50 center">
                    <button
                      class="thm-btn thm-bg"
                      type="button"
                      data-dismiss="modal"
                      aria-hidden="true"
                      @click="handleSetSubcriptionToUser"
                    >
                      Comprar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Success Modal -->
      <div id="successModal" ref="successModal" class="modal fade">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">
                <i class="fas fa-user"></i> Compra realizada con éxito
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
                <div class="row pb-50 pb-custom">
                  <div class="col-md-12 col-sm-12 col-lg-12 center">
                    <div class="field-wrap w-100">
                      <label
                        >Has adquirido una subscripción, para eliminar esta
                        subscripción ve a la sección subscripciones en tu panel
                        de ajustes</label
                      >
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12 col-lg-12 pt-50 center">
                    <button
                      class="thm-btn thm-bg"
                      type="button"
                      data-dismiss="modal"
                      aria-hidden="true"
                      @click="handleCloseModal"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <!-- Main Wrapper -->
  </div>
</template>

<script>
import $ from "jquery";
import Header from "../components/layouts/Header";
import StickyMenu from "../components/layouts/StickyMenu";
import ResponsiveHeader from "../components/layouts/ResponsiveHeader";
import Footer from "../components/layouts/Footer";
import Copyright from "../components/layouts/Copyright";
import {
  SUBSCRIPTIONS_GET_ME,
  SUBSCRIPTIONS_GET_SUBCRIPTIONS,
} from "./constants/querys";
import Cookies from "js-cookie";
import { SUBSCRIPTIONS_SET_USER } from "./constants/mutations";

export default {
  name: "Subscriptions",
  data() {
    return {
      me: {
        detail: {
          id: "",
          balance: "",
          role: {
            name: "",
          },
        },
      },
      subscriptions: [],
      selectSubscription: "",
    };
  },
  components: {
    Header,
    StickyMenu,
    ResponsiveHeader,
    Footer,
    Copyright,
  },
  apollo: {
    me: {
      query: SUBSCRIPTIONS_GET_ME,
    },
    subscriptions: {
      query: SUBSCRIPTIONS_GET_SUBCRIPTIONS,
    },
  },
  methods: {
    handleCloseModal() {},
    handleOpenProfessionalModal(subscription) {
      this.selectSubscription = subscription;
      $("#professionalModal").modal("show");
    },
    async handleSetSubcriptionToUser(e) {
      e.preventDefault();

      if (Cookies.get("user") && this.selectSubscription) {
        await this.$apollo
          .mutate({
            mutation: SUBSCRIPTIONS_SET_USER,
            variables: {
              userId: JSON.parse(Cookies.get("user")).id,
              subscriptionId: this.selectSubscription.id,
            },
          })
          .then(() => {
            $("#professionalModal").modal("hide");
            $("#successModal").modal("show");
            this.selectSubscription = "";
            this.$toast.open({
              message: "Subscripción adquirida exitosamente.",
              type: "success",
              duration: 3000,
            });
          })
          .catch(({ graphQLErrors }) => {
            graphQLErrors.map((error) =>
              this.$toast.open({
                message: error.message,
                type: "error",
                duration: 3000,
              })
            );
          });
      } else {
        this.$toast.open({
          message: "Usuario o subscripcion inválidas",
          type: "error",
          duration: 3000,
        });
      }
    },
  },
  computed: {
    getUser() {
      let user = "";
      if (Cookies.get("user") !== undefined) {
        user = JSON.parse(Cookies.get("user"));
        return user;
      }
      return user;
    },
  },
};
</script>

<style scoped>
.comment {
  margin-top: 0px;
}
.center {
  text-align: center;
}
.replyCustom {
  margin-left: 1.25rem;
}
.orange {
  color: #ff5e15;
}
.linkSpam:hover {
  color: #ff5e15;
  cursor: pointer;
}
.card-body {
  padding: 0.55rem;
  padding-left: 10%;
}
.widget2.category_widget ul li {
  text-align: left;
}
.smaller {
  font-size: smaller;
}
</style>