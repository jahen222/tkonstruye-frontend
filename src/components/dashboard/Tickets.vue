<template>
  <section id="dashboardTickets">
    <div class="w-100 pb-100 position-relative">
      <div class="container">
        <div class="cart-table w-100">
          <form class="cart-form">
            <table class="product-table">
              <thead>
                <tr>
                  <th>Categoría</th>
                  <th>Tipo de Trabajo</th>
                  <th>Comuna</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody v-if="tickets ? tickets.length > 0 : false">
                <tr v-for="(ticket, index) in tickets" v-bind:key="index">
                  <td class="product-model">
                    {{ ticket.subcategory.category.name }}
                  </td>
                  <td class="product-model">{{ ticket.subcategory.name }}</td>
                  <td class="product-model">{{ ticket.commune.name }}</td>
                  <td class="product-name">
                    <div
                      v-for="(requirement, index) in ticket.requirements"
                      v-bind:key="index"
                    >
                      <h4 class="mb-0">
                        <a href="#" title="">
                          {{
                            Object.keys(ticket.requirements)[
                              Object.values(ticket.requirements).indexOf(
                                requirement
                              )
                            ]
                          }}
                        </a>
                      </h4>
                      <p class="mb-0">
                        {{ requirement }}
                      </p>
                    </div>
                  </td>
                  <td class="product-btns">
                    <div class="product-cart-btns">
                      <a class="view" title=""><i class="fas fa-eye"></i></a>
                      <a class="edit" title=""
                        ><i class="fas fa-pencil-alt"></i
                      ></a>
                      <a
                        class="remove"
                        @click="handleDeleteTicketModal(ticket)"
                        data-toggle="modal"
                        title=""
                        ><i class="far fa-trash-alt"></i
                      ></a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- Product Table -->
          </form>
          <!-- Cart Form -->
        </div>
        <!-- Cart Table -->
      </div>
    </div>
    <!-- Delete Ticket Modal -->
    <div id="deleteTicketModal" ref="deleteTicketModal" class="modal fade">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Eliminar Ticket</h4>
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
              <form class="w-100 pb-50 pb-custom" @submit="handleDeleteTicket">
                <div class="row">
                  <div class="col-md-12 col-sm-12 col-lg-12 center">
                    <div class="field-wrap w-100">
                      <label
                        >¿Estás seguro que deseas eliminar esta entrada?</label
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
                      Si, confirmar<i
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
  </section>
</template>

<script>
import $ from "jquery";
import Cookies from "js-cookie";
import { TICKETS_GET_TICKETS } from "./constants/querys";
import { TICKETS_DELETE_TICKET } from "./constants/mutations";

export default {
  name: "Tickets",
  data() {
    return {
      tickets: [],
      selectTicket: "",
      error: ""
    };
  },
  apollo: {
    tickets: {
      query: TICKETS_GET_TICKETS,
      variables: {
        user: Cookies.get("user") ? JSON.parse(Cookies.get("user")).id : null
      }
    }
  },
  methods: {
    handleShowTicketModal(ticket) {
      this.selectTicket = ticket;
      $("#showTicketModal").modal("show");
    },
    handleEditTicketModal(ticket) {
      this.selectTicket = ticket;
      $("#editTicketModal").modal("show");
    },
    handleDeleteTicketModal(ticket) {
      this.selectTicket = ticket;
      $("#deleteTicketModal").modal("show");
    },
    handleCloseModal() {
      this.selectTicket = "";
    },
    handleDeleteTicket() {
      const id = this.selectTicket.id
      
      this.$apollo
        .mutate({
          mutation: TICKETS_DELETE_TICKET,
          variables: {
            id
          }
        })
        .then(() => {
          this.$toast.open({
            message: "Ticket eliminado exitosamente.",
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
  }
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
</style>