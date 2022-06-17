<template>
  <section id="dashboardTickets" class="post-detail wizard-form w-100">
    <h3 class="mb-0"><i class="fas fa-briefcase"></i> Payment</h3>
    <div class="w-100 pb-50 position-relative">
      <div class="container">
        <div class="cart-table w-100">
          <div class="post-detail wizard-form w-100 pb-10">
            <div class="field-wrap w-100">
              <div class="input-group">
                <div class="container">
                  <div class="row">
                    <div class="col-md-9 col-sm-9 col-lg-9">
                      <input
                        type="text"
                        placeholder="Buscar..."
                        v-model="contains"
                      />
                    </div>
                    <div class="col-md-3 col-sm-3 col-lg-3 right">
                      <button
                        class="thm-btn thm-bg"
                        @click="handlePaymentModal()"
                      >
                        Agregar Saldo<i
                          class="flaticon-arrow-pointing-to-right"
                        ></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <form class="cart-form">
            <div class="table-responsive">
              <table class="table table-borderless table-hover">
                <thead class="thead">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">MONTO</th>
                    <th scope="col">DIVISA</th>
                    <th scope="col">ASUNTO</th>
                  </tr>
                </thead>
                <tbody v-if="payments ? payments.length > 0 : false">
                  <tr
                    v-for="(payment, index) in payments.filter((payment) => {
                      if (payment.status != 'not payed') {
                        return payment;
                      }
                    })"
                    v-bind:key="index"
                  >
                    <th scope="row">
                      {{ payment.commerceOrder }}
                    </th>
                    <td>
                      {{ payment.amount }}
                    </td>
                    <td>
                      {{ payment.currency }}
                    </td>
                    <td>
                      {{ payment.subject }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- Add Card Modal -->
    <div
      class="modal fade zIndex"
      id="addPaymentModal"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              <i class="fas fa-pencil-alt"></i> Agregar Saldo
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="handleCloseModal"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div id="dashboardProfile" class="post-detail wizard-form w-100">
              <form
                class="w-100 pb-50 pb-custom"
                @submit="handleSetPaymentBalanceWithFlow"
              >
                <div class="row">
                  <div class="col-md-12 col-sm-12 col-lg-12">
                    <div class="field-wrap w-100">
                      <label>
                        <i class="fas fa-question-circle"></i>
                        Cantidad</label
                      >
                      <div class="input-group">
                        <input type="text" :required="true" v-model="balance" />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12 col-lg-12 pt-50 center">
                    <button class="thm-btn thm-bg" type="submit">
                      Agregar
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
import { PAYMENT_GET_PAYMENTS } from "./constants/querys";
import { CREATE_BALANCE_SET_PAYMENT_TO_FLOW } from "./constants/mutations";

export default {
  name: "Payment",
  data() {
    return {
      payments: [],
      user: JSON.parse(Cookies.get("user"))
        ? JSON.parse(Cookies.get("user"))
        : null,
      contains: "",
      balance: "",
    };
  },
  apollo: {
    payments: {
      query: PAYMENT_GET_PAYMENTS,
      variables() {
        return {
          user: Cookies.get("user") ? JSON.parse(Cookies.get("user")).id : null,
          contains: this.contains,
        };
      },
      fetchPolicy: "no-cache",
    },
  },
  methods: {
    handlePaymentModal() {
      $("#addPaymentModal").modal("show");
    },
    async handleSetPaymentBalanceWithFlow(e) {
      e.preventDefault();

      if (Cookies.get("user") && this.balance) {
        await this.$apollo
          .mutate({
            mutation: CREATE_BALANCE_SET_PAYMENT_TO_FLOW,
            variables: {
              userId: JSON.parse(Cookies.get("user")).id,
              balance: Number(this.balance),
            },
          })
          .then((data) => {
            window.location.href = data.data.setpaymentbalancewithflow.redirect;
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
          message: "Usuario invalido",
          type: "error",
          duration: 3000,
        });
      }
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
.smaller {
  font-size: smaller;
}
.right {
  text-align: right;
}
</style>