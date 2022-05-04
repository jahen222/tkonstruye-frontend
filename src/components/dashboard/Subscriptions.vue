<template>
  <section id="dashboardTickets" class="post-detail wizard-form w-100">
    <h3 class="mb-0"><i class="fas fa-paperclip"></i> Subscripciones</h3>
    <div class="w-100 pb-50 position-relative">
      <div class="container">
        <div class="cart-table w-100">
          <form class="cart-form">
            <div class="table-responsive">
              <table class="table table-borderless table-hover">
                <thead class="thead">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">SUBSCRIPCIÓN</th>
                    <th scope="col">DESCRIPCIÓN</th>
                    <th scope="col">DESCUENTO</th>
                    <th scope="col">OPCIONES</th>
                  </tr>
                </thead>
                <tbody v-if="subscriptions ? subscriptions.length > 0 : false">
                  <tr
                    v-for="(subscription, index) in subscriptions"
                    v-bind:key="index"
                  >
                    <th
                      scope="row"
                      @click="showSubscriptionModal(subscription)"
                    >
                      {{ subscription.id }}
                    </th>
                    <td @click="showSubscriptionModal(subscription)">
                      {{ subscription.name }}
                    </td>
                    <td @click="showSubscriptionModal(subscription)">
                      {{ subscription.description }}
                    </td>
                    <td @click="showSubscriptionModal(subscription)">
                      {{ subscription.discount }} %
                    </td>
                    <td>
                      <a
                        class="view iconTable"
                        title=""
                        @click="showSubscriptionModal(subscription)"
                        data-toggle="modal"
                        ><i class="fas fa-eye"></i
                      ></a>
                      <a
                        class="remove iconTable"
                        @click="deleteSubscriptionModal(subscription)"
                        data-toggle="modal"
                        title=""
                        ><i class="far fa-trash-alt"></i
                      ></a>
                    </td>
                    <td>
                      <a class="remove iconTable" href="/subscriptions" title=""
                        >Cambiar
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- Product Table -->
          </form>
          <!-- Cart Form -->
        </div>
        <!-- Cart Table -->
      </div>
    </div>
    <!-- Show Description Modal -->
    <div
      class="modal fade zIndex"
      id="showSubscriptionModal"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              <i class="fas fa-eye"></i> Subscripción
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="closeModal"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div id="dashboardProfile" class="post-detail wizard-form w-100">
              <form
                class="w-100 pb-50 pb-custom"
                @submit="showSubscriptionModalHide"
              >
                <div class="row">
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">Número:</th>
                          <th scope="col">
                            #{{
                              selectSubscription ? selectSubscription.id : ""
                            }}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">Nombre:</th>
                          <td>
                            <p>
                              {{
                                selectSubscription
                                  ? selectSubscription.name
                                  : ""
                              }}
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Descripción:</th>
                          <td>
                            <p>
                              {{
                                selectSubscription
                                  ? selectSubscription.description
                                  : ""
                              }}
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Descuento:</th>
                          <td>
                            <p>
                              {{
                                selectSubscription
                                  ? selectSubscription.discount + " %"
                                  : ""
                              }}
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="col-md-12 col-sm-12 col-lg-12 pt-50 center">
                    <button class="thm-btn thm-bg" type="submit">Cerrar</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Delete Description Modal -->
    <div
      id="deleteSubscriptionModal"
      ref="deleteSubscriptionModal"
      class="modal fade zIndex"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">
              <i class="far fa-trash-alt"></i> Eliminar Subscripción
            </h4>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-hidden="true"
              @click="deleteSubscriptionModalHide"
            >
              &times;
            </button>
          </div>
          <div class="modal-body">
            <div class="post-detail wizard-form w-100">
              <form
                class="w-100 pb-50 pb-custom"
                @submit="handleDeleteSubscription"
              >
                <div class="row">
                  <div class="col-md-12 col-sm-12 col-lg-12 center">
                    <div class="field-wrap w-100">
                      <label
                        >¿Estás seguro que deseas eliminar esta
                        subscripción?</label
                      >
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
                      Si, confirmar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import $ from "jquery";
import Cookies from "js-cookie";
import { SUBSCRIPTIONS_GET_SUBCRIPTION } from "./constants/querys";
import { SUBSCRIPTIONS_DELETE_SUBCRIPTION } from "./constants/mutations";

export default {
  name: "Subscriptions",
  data() {
    return {
      subscriptions: [],
      selectSubscription: "",
      error: "",
      user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
    };
  },
  apollo: {
    subscriptions: {
      query: SUBSCRIPTIONS_GET_SUBCRIPTION,
      variables() {
        return {
          user: Cookies.get("user") ? JSON.parse(Cookies.get("user")).id : null,
        };
      },
    },
  },
  methods: {
    showSubscriptionModal(subscription) {
      this.selectSubscription = subscription;
      $("#showSubscriptionModal").modal("show");
    },
    showSubscriptionModalHide(e) {
      e.preventDefault();
      this.closeModal();
      $("#showSubscriptionModal").modal("hide");
    },
    deleteSubscriptionModal(subscription) {
      this.selectSubscription = subscription;
      $("#deleteSubscriptionModal").modal("show");
    },
    deleteSubscriptionModalHide(e) {
      e.preventDefault();
      this.closeModal();
      $("#deleteSubscriptionModal").modal("hide");
    },
    closeModal() {
      this.selectSubscription = "";
      this.error = "";
    },
    async handleDeleteSubscription(e) {
      e.preventDefault();

      await this.$apollo
        .mutate({
          mutation: SUBSCRIPTIONS_DELETE_SUBCRIPTION,
          variables: {
            id: this.user.id,
          },
          fetchPolicy: "no-cache",
        })
        .then(() => {
          this.closeModal();
          $("#deleteSubscriptionModal").modal("hide");
          this.$toast.open({
            message: "Subscripción eliminada exitosamente.",
            type: "success",
            duration: 3000,
          });
          this.subscriptions = [];
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
    },
  },
};
</script>

<style scoped>
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
.zIndex {
  z-index: 10000;
}
.table {
  font-size: small;
}
.iconTable {
  padding-left: 10px;
}
.iconTable:hover {
  color: #ff5e15;
}
.thead {
  width: 100%;
  font-size: 1rem;
  font-weight: bold;
  color: #777;
}
.table-hover tbody tr:hover {
  background-color: #f8f8f9;
}
.table thead tr th {
  border-top: none;
}
.italic {
  font-style: italic;
}
</style>