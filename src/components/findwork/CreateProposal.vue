<template>
  <div
    class="modal fade"
    id="createProposalModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable"
      v-if="role==='Professional'"
    >
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
                <div class="col-md-6 col-sm-12 col-lg-6">
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
                            <p class="marginPs">
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
                            <p class="marginPs">
                              {{
                                ticket ? ticket.subcategory.category.name : ""
                              }}
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
                              <p class="italic marginPs">
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
                            <p class="marginPs">
                              {{ ticket ? ticket.description : "" }}
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2">
                            <iframe
                              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53211.524521758976!2d-70.59573121979936!3d-33.534657471820495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662d125ecd59095%3A0x375e6cb56bef3ac!2sLa%20Florida%2C%20Regi%C3%B3n%20Metropolitana%2C%20Chile!5e0!3m2!1ses!2sve!4v1621542101450!5m2!1ses!2sve"
                              width="100%"
                              height="100"
                              style="border: 0"
                              allowfullscreen=""
                              loading="lazy"
                            ></iframe>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <i class="fas fa-question-circle"></i> Total
                          </th>
                          <td>
                            <p class="marginPs price">
                              {{ ticket ? ticket.subcategory.price + "$" : "" }}
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="col-md-6 col-sm-12 col-lg-6">
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
                        rows="3"
                      ></textarea>
                    </div>
                  </div>
                  <button
                    class="thm-btn thm-bg"
                    type="submit"
                   
                  >
                    Enviar Propuesta
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
      v-else
    >
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
            <form class="w-100 pb-50 pb-custom">
              <div class="row">
                <div class="col-md-12 col-sm-12 col-lg-12">
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
                            <p class="marginPs">
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
                            <p class="marginPs">
                              {{
                                ticket ? ticket.subcategory.category.name : ""
                              }}
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
                              <p class="italic marginPs">
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
                            <p class="marginPs">
                              {{ ticket ? ticket.description : "" }}
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2">
                            <iframe
                              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53211.524521758976!2d-70.59573121979936!3d-33.534657471820495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662d125ecd59095%3A0x375e6cb56bef3ac!2sLa%20Florida%2C%20Regi%C3%B3n%20Metropolitana%2C%20Chile!5e0!3m2!1ses!2sve!4v1621542101450!5m2!1ses!2sve"
                              width="100%"
                              height="100"
                              style="border: 0"
                              allowfullscreen=""
                              loading="lazy"
                            ></iframe>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <i class="fas fa-question-circle"></i> Total
                          </th>
                          <td>
                            <p class="marginPs price">
                              {{ ticket ? ticket.subcategory.price + "$" : "" }}
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="col-md-12 col-sm-12 col-lg-12">
                  <button
                    class="thm-btn thm-bg"
                    :disabled="true"
                  >
                    Debes ser profesional para hacer propuestas
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
import { FIND_WORK_GET_TICKETS } from "../../views/constants/querys";

export default {
  name: "CreateProposal",
  props: ["ticket", "role"],
  data() {
    return {
      coverLetter: "",
      jobDetail: "",
      limit: 10
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
                  contains: ""
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
.marginPs {
  margin-bottom: 0px;
}
.wizard-form .field-wrap label {
  width: 100%;
  font-size: small;
  font-weight: bold;
  color: black;
  margin-bottom: 0.75rem;
}
.wizard-form .field-wrap textarea {
  padding: 1.125rem;
  height: 8.5rem;
}
.price {
  font-size: large;
  font-weight: bold;
}
</style>
