<template>
  <div
    class="modal fade"
    id="createProposalModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    @click.self="handleCloseModal"
  >
    <div
      class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable"
      v-if="role === 'Professional'"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Propuesta</h5>
          <p class="marginPs price">
            {{ ticket ? ticket.subcategory.price + "$" : "" }}
          </p>
          <button
            type="button"
            class="close"
            @click="handleCloseModal"
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
                              <i class="fas fa-greater-than smaller"></i>
                              {{ ticket ? ticket.subcategory.name : "" }}
                            </p>
                          </td>
                        </tr>
                        <tr
                          v-for="(requirement, index) in ticket
                            ? ticket.requirements
                            : []"
                          v-bind:key="index"
                        >
                          <th scope="row">
                            <i class="fas fa-question-circle"></i>
                            {{
                              Object.keys(ticket.requirements)[
                                Object.values(ticket.requirements).indexOf(
                                  requirement
                                )
                              ]
                            }}
                          </th>
                          <td>
                            <p class="marginPs">
                              {{ requirement }}
                            </p>
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
                        maxlength="512"
                        minlength="128"
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
                        class="heightJobDetail"
                        maxlength="256"
                        minlength="10"
                        v-model="jobDetail"
                        placeholder="Ingresa aquí tu respuesta."
                      ></textarea>
                    </div>
                  </div>
                  <div class="field-wrap w-100">
                    <a class="link" href="#" @click="$refs.file.click()">
                      <i class="fas fa-upload"></i>
                      Subir Adjunto</a
                    >
                    <p v-if="fileName">{{ fileName }}</p>
                    <input
                      type="file"
                      name="files"
                      @change="handleFileChange"
                      ref="file"
                    />
                  </div>
                  <button class="thm-btn thm-bg" type="submit">
                    Participar
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
          <p class="marginPs price">
            {{ ticket ? ticket.subcategory.price + "$" : "" }}
          </p>
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
                              <i class="fas fa-greater-than smaller"></i>
                              {{ ticket ? ticket.subcategory.name : "" }}
                            </p>
                          </td>
                        </tr>
                        <tr
                          v-for="(requirement, index) in ticket
                            ? ticket.requirements
                            : []"
                          v-bind:key="index"
                        >
                          <th scope="row">
                            <i class="fas fa-question-circle"></i>
                            {{
                              Object.keys(ticket.requirements)[
                                Object.values(ticket.requirements).indexOf(
                                  requirement
                                )
                              ]
                            }}
                          </th>
                          <td>
                            <p class="marginPs">
                              {{ requirement }}
                            </p>
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
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="col-md-12 col-sm-12 col-lg-12">
                  <button class="thm-btn thm-bg" :disabled="true">
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
import {
  FINDWORK_CREATE_PROPOSAL,
  FINDWORK_UPLOAD_PHOTO
} from "./constants/mutations";
import Cookies from "js-cookie";
import {
  FIND_WORK_GET_TICKETS,
  CREATE_PROPOSAL_GET_VULGARITIES
} from "../../views/constants/querys";

export default {
  name: "CreateProposal",
  props: ["ticket", "role"],
  data() {
    return {
      coverLetter: "",
      jobDetail: "",
      limit: 10,
      config: {},
      file: "",
      fileName: "",
      fileId: ""
    };
  },
  apollo: {
    config: {
      query: CREATE_PROPOSAL_GET_VULGARITIES
    }
  },
  methods: {
    async handleProposal(e) {
      e.preventDefault();
      let validate = true;
      const { coverLetter, jobDetail } = this.$data;
      const file = this.file;

      if (coverLetter.length < 128 || coverLetter.length > 512) {
        validate = false;
        this.$toast.open({
          message:
            "La carta de presentación debe tener entre 128 y 512 caracteres.",
          type: "error",
          duration: 3000
        });
      } else if (coverLetter) {
        for (let i = 0; i < Object.values(this.config.vulgarity).length; i++) {
          const vulgarity = Object.values(this.config.vulgarity)[i];
          if (coverLetter.toLowerCase().search(vulgarity.toString()) != -1) {
            validate = false;
            this.$toast.open({
              message: "La carta de presentación tiene contenido ofensivo.",
              type: "error",
              duration: 3000
            });
            break;
          }
        }
      } else if (
        jobDetail &&
        (jobDetail.length < 10 || jobDetail.length > 256)
      ) {
        validate = false;
        this.$toast.open({
          message:
            "La descripción del trabajo debe tener entre 10 y 256 caracteres.",
          type: "error",
          duration: 3000
        });
      } else if (jobDetail) {
        for (let i = 0; i < Object.values(this.config.vulgarity).length; i++) {
          const vulgarity = Object.values(this.config.vulgarity)[i];
          if (jobDetail.toLowerCase().search(vulgarity.toString()) != -1) {
            validate = false;
            this.$toast.open({
              message: "La descripción del trabajo tiene contenido ofensivo.",
              type: "error",
              duration: 3000
            });
            break;
          }
        }
      }

      if (file) {
        await this.$apollo
          .mutate({
            mutation: FINDWORK_UPLOAD_PHOTO,
            variables: {
              file
            }
          })
          .then(data => {
            this.fileId = data.data.upload.id;
          })
          .catch(({ graphQLErrors }) => {
            validate = false;
            graphQLErrors.map(error =>
              this.$toast.open({
                message: error.message,
                type: "error",
                duration: 3000
              })
            );
          });
      }

      if (validate) {
        await this.$apollo
          .mutate({
            mutation: FINDWORK_CREATE_PROPOSAL,
            variables: {
              ticket: this.ticket.id,
              usersPermissionsUser: JSON.parse(Cookies.get("user")).id,
              coverLetter: coverLetter,
              jobDetail: jobDetail,
              file: this.fileId
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
    },
    handleFileChange(e) {
      if (
        e.target.files[0].type === "image/png" ||
        e.target.files[0].type === "image/jpg" ||
        e.target.files[0].type === "image/jpeg" ||
        e.target.files[0].type === "image/gif" ||
        e.target.files[0].type === "image/svg" ||
        e.target.files[0].type === "application/msword" ||
        e.target.files[0].type === "application/pdf" ||
        e.target.files[0].type === "application/vnd.ms-excel"
      ) {
        this.file = e.target.files[0];
        this.fileName = this.file.name;
      } else {
        this.$toast.open({
          message: "Seleccione un archivo con un formato válido.",
          type: "error",
          duration: 3000
        });
      }
    },
    handleCloseModal() {
      this.coverLetter = "";
      this.jobDetail = "";
      this.file = "";
      this.fileName = "";
      this.fileId = "";
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
  font-size: xx-large;
  font-weight: bold;
  margin-inline-start: 2%;
  color: #ff5e15;
}
.smaller {
  font-size: smaller;
}
.heightJobDetail {
  height: 5rem !important;
}
.link {
  font-size: small;
  font-weight: bold;
  color: black;
}
.link:hover {
  color: #ff5e15;
}
</style>
