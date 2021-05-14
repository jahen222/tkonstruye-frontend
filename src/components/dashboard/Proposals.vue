<template>
  <section id="dashboardTickets" class="post-detail wizard-form w-100">
    <h3 class="mb-0"><i class="fas fa-paperclip"></i> Propuestas</h3>
    <div class="w-100 pb-50 position-relative">
      <div class="container">
        <div class="cart-table w-100">
          <div class="post-detail wizard-form w-100 pb-10">
            <div class="field-wrap w-100">
              <div class="input-group">
                <input type="text" placeholder="Buscar..." v-model="contains" />
              </div>
            </div>
          </div>
          <form class="cart-form">
            <div class="table-responsive">
              <table class="table table-borderless table-hover">
                <thead class="thead">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col"># TICKET</th>
                    <th scope="col">RESPONSABLE</th>
                    <th scope="col">OPCIONES</th>
                  </tr>
                </thead>
                <tbody v-if="proposals ? proposals.length > 0 : false">
                  <tr v-for="(proposal, index) in proposals" v-bind:key="index">
                    <th scope="row" @click="handleShowProposalModal(proposal)">
                      {{ proposal.id }}
                    </th>
                    <td @click="handleShowProposalModal(proposal)">
                      {{ proposal.ticket.id }}
                    </td>
                    <td @click="handleShowProposalModal(proposal)">
                      {{ proposal.users_permissions_user.username }}
                    </td>
                    <td>
                      <a
                        class="view iconTable"
                        title=""
                        @click="handleShowProposalModal(proposal)"
                        data-toggle="modal"
                        ><i class="fas fa-eye"></i
                      ></a>
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
    <!-- Show Ticket Modal -->
    <div
      class="modal fade zIndex"
      id="showProposalModal"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              <i class="fas fa-eye"></i> Propuesta
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
                @submit="handleShowProposalModalHide"
              >
                <div class="row">
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">Número:</th>
                          <th scope="col">
                            #{{ selectProposal ? selectProposal.id : "" }}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">Número del ticket:</th>
                          <td>
                            <p>
                              {{
                                selectProposal ? selectProposal.ticket.id : ""
                              }}
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Datos del Profesional:</th>
                          <td>
                            {{ "Nombre de Usuario" }}
                            :
                            <p class="italic">
                              {{
                                selectProposal
                                  ? selectProposal.users_permissions_user
                                      .username
                                  : ""
                              }}
                            </p>
                            {{ "Email" }}
                            :
                            <p class="italic">
                              {{
                                selectProposal
                                  ? selectProposal.users_permissions_user.email
                                  : ""
                              }}
                            </p>
                            {{ "Teléfono" }}
                            :
                            <p class="italic">
                              {{
                                selectProposal
                                  ? selectProposal.users_permissions_user.phone
                                  : ""
                              }}
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Carta de Presentación:</th>
                          <td>
                            <p>
                              {{
                                selectProposal ? selectProposal.coverLetter : ""
                              }}
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Descripción:</th>
                          <td>
                            <p>
                              {{
                                selectProposal ? selectProposal.jobDetail : ""
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
  </section>
</template>

<script>
import $ from "jquery";
import Cookies from "js-cookie";
import { PROPOSALS_GET_PROPOSALS } from "./constants/querys";

export default {
  name: "Proposals",
  data() {
    return {
      proposals: [],
      selectProposal: "",
      error: "",
      contains: ""
    };
  },
  apollo: {
    proposals: {
      query: PROPOSALS_GET_PROPOSALS,
      variables() {
        return {
          user: Cookies.get("user") ? JSON.parse(Cookies.get("user")).id : null,
          contains: this.contains
        };
      }
    }
  },
  methods: {
    handleShowProposalModal(proposal) {
      this.selectProposal = proposal;
      $("#showProposalModal").modal("show");
    },
    handleShowProposalModalHide(e) {
      e.preventDefault();
      this.closeModal();
      $("#showProposalModal").modal("hide");
    },
    closeModal() {
      this.selectProposal = "";
      this.error = "";
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