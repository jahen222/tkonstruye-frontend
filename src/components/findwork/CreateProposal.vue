<template>
  <div
    class="modal fade"
    id="createProposalModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Propuesta</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div id="dashboardProfile" class="post-detail wizard-form w-100">
            <form class="w-100 pb-50 pb-custom" @submit="handleProposal">
              <div class="row">
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Número:</th>
                        <th scope="col">#{{ ticket ? ticket.id : "" }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">
                          <i class="fas fa-question-circle"></i> ¿Donde
                          necesitas el trabajo?
                        </th>
                        <td>
                          <p>
                            {{ ticket ? ticket.commune.name : "" }}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <i class="fas fa-question-circle"></i> ¿Qué tipo de
                          trabajo necesitas?
                        </th>
                        <td>
                          <p>
                            {{ ticket ? ticket.subcategory.category.name : "" }}
                            <i class="fas fa-greater-than"></i>
                            {{ ticket ? ticket.subcategory.name : "" }}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <i class="fas fa-question-circle"></i>
                          Requerimientos
                        </th>
                        <td>
                          <div
                            v-for="(requirement, index) in ticket
                              ? ticket.requirements
                              : []"
                            v-bind:key="index"
                          >
                            {{
                              Object.keys(ticket.requirements)[
                                Object.values(ticket.requirements).indexOf(
                                  requirement
                                )
                              ]
                            }}
                            :
                            <p class="italic">
                              {{ requirement }}
                            </p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <i class="fas fa-question-circle"></i> Descripción
                        </th>
                        <td>
                          <p>
                            {{ ticket ? ticket.description : "" }}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="col-md-12 col-sm-12 col-lg-12">
                  <div class="field-wrap w-100">
                    <label>
                      <i class="fas fa-question-circle"></i>
                      Carta de Presentación</label
                    >
                    <div class="input-group">
                      <textarea
                        maxlength="500"
                        :required="true"
                        v-model="coverLetter"
                        placeholder="Ingresa aquí tu respuesta."
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div class="col-md-12 col-sm-12 col-lg-12">
                  <div class="field-wrap w-100">
                    <label>
                      <i class="fas fa-question-circle"></i>
                      Descripción del trabajo</label
                    >
                    <div class="input-group">
                      <textarea
                        maxlength="500"
                        :required="true"
                        v-model="jobDetail"
                        placeholder="Ingresa aquí tu respuesta."
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div class="col-md-12 col-sm-12 col-lg-12 pt-50 center">
                  <button class="thm-btn thm-bg" type="submit">
                    Enviar Propuesta
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { FINDWORK_CREATE_PROPOSAL } from "./constants/mutations";
import Cookies from "js-cookie";
import {
  FIND_WORK_GET_TICKETS,
} from "../../views/constants/querys";

export default {
  name: "CreateProposal",
  props: ["ticket"],
  data() {
    return {
      coverLetter: "",
      jobDetail: "",
      limit: 10,
    };
  },
  methods: {
    async handleProposal(e) {
      e.preventDefault();
      let validate = true;

      if (validate) {
        await this.$apollo
          .mutate({
            mutation: FINDWORK_CREATE_PROPOSAL,
            variables: {
              ticket: this.ticket.id,
              usersPermissionsUser: JSON.parse(Cookies.get("user")).id,
              coverLetter: this.coverLetter,
              jobDetail: this.jobDetail
            },
            refetchQueries: [
              {
                query: FIND_WORK_GET_TICKETS,
                variables: {
                  limit: this.limit,
                  contains: "",
                }
              }
            ]
          })
          .then(() => {
            this.coverLetter = "";
            this.jobDetail = "";
            $("#createProposalModal").modal("hide");

            this.$toast.open({
              message: "Propuesta creada exitosamente.",
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
#createProposalModal {
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
