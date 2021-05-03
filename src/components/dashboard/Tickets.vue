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
                  <td class="product-btns">
                    <div class="product-cart-btns">
                      <a
                        class="view"
                        title=""
                        @click="handleShowTicketModal(ticket)"
                        data-toggle="modal"
                        ><i class="fas fa-eye"></i
                      ></a>
                      <a
                        class="edit"
                        title=""
                        @click="handleEditTicketModal(ticket)"
                        data-toggle="modal"
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
    <!-- Show Ticket Modal -->
    <div
      class="modal fade zIndex"
      id="showTicketModal"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Mostrar Ticket</h5>
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
              <form class="w-100 pb-50 pb-custom" @submit="handleShowTicket">
                <div class="row">
                  <div class="col-md-12 col-sm-12 col-lg-12">
                    <div class="field-wrap w-100">
                      <label>¿Donde necesitas el trabajo?</label>
                      <p>{{ selectTicket ? selectTicket.commune.name : "" }}</p>
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12 col-lg-12">
                    <div class="field-wrap w-100">
                      <label>¿Qué tipo de trabajo necesitas?</label>
                      <p>
                        {{
                          selectTicket
                            ? selectTicket.subcategory.category.name
                            : ""
                        }}
                      </p>
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12 col-lg-12">
                    <div class="field-wrap w-100">
                      <label>Tipo de trabajo</label>
                      <p>
                        {{ selectTicket ? selectTicket.subcategory.name : "" }}
                      </p>
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12 col-lg-12">
                    <div class="field-wrap w-100">
                      <label>Requerimientos</label>
                      <p
                        v-for="(requirement, index) in selectTicket
                          ? selectTicket.requirements
                          : []"
                        v-bind:key="index"
                      >
                        {{
                          Object.keys(selectTicket.requirements)[
                            Object.values(selectTicket.requirements).indexOf(
                              requirement
                            )
                          ]
                        }}
                        : {{ requirement }}
                      </p>
                    </div>
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
    <!-- Edit Ticket Modal -->
    <div
      class="modal fade zIndex"
      id="editTicketModal"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">¿Qué necesitas?</h5>
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
              <form class="w-100 pb-50 pb-custom" @submit="handleEditTicket">
                <div class="row">
                  <div
                    class="col-md-12 col-sm-12 col-lg-12"
                    v-if="getCommunes.length > 0"
                  >
                    <div class="field-wrap w-100">
                      <label>
                        <i class="fas fa-question-circle"></i> ¿Donde necesitas
                        el trabajo?</label
                      >
                      <vue-typeahead-bootstrap
                        :data="getCommunes"
                        :serializer="(item) => item.name"
                        :required="true"
                        :placeholder="'Por ejemplo: Santiago, Viña del Mar...'"
                        v-model="commune"
                        @hit="handleSecondQuestion"
                      >
                      </vue-typeahead-bootstrap>
                    </div>
                  </div>
                  <div
                    class="col-md-12 col-sm-12 col-lg-12"
                    v-if="categories.length > 0 && secondQuestion"
                  >
                    <div class="field-wrap w-100">
                      <label>
                        <i class="fas fa-question-circle"></i> ¿Qué tipo de
                        trabajo necesitas?</label
                      >
                      <vue-typeahead-bootstrap
                        :data="categories"
                        :serializer="(item) => item.name"
                        :required="true"
                        :placeholder="'Por ejemplo: Pintores, Construcción...'"
                        v-model="category"
                        @keyup="subCategory = ''"
                      >
                      </vue-typeahead-bootstrap>
                    </div>
                  </div>
                  <div
                    class="col-md-12 col-sm-12 col-lg-12"
                    v-if="
                      getSubCategories ? getSubCategories.length > 0 : false
                    "
                  >
                    <div class="field-wrap w-100">
                      <label>
                        <i class="fas fa-question-circle"></i> Tipo de
                        trabajo</label
                      >
                      <div class="input-group">
                        <select :required="true" v-model="subCategory">
                          <option
                            :value="subCategorySelected.id"
                            :hidden="
                              subCategorySelected.category.name !== category
                            "
                            :disabled="
                              subCategorySelected.category.name !== category
                            "
                          >
                            {{ subCategorySelected.name }}
                          </option>
                          <option
                            v-for="(subCategory, index) in getSubCategories"
                            v-bind:key="index"
                            :value="subCategory.id"
                            :hidden="subCategory.id === subCategorySelected.id"
                          >
                            {{ subCategory.name }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div
                    class="col-md-12 col-sm-12 col-lg-12"
                    v-for="(wizardField, index) in getWizardFields"
                    v-bind:key="index"
                  >
                    <div class="field-wrap w-100">
                      <label>
                        <i class="fas fa-question-circle"></i>
                        {{ wizardField.label }}</label
                      >
                      <div
                        class="input-group"
                        v-if="wizardField.type === 'text'"
                      >
                        <input
                          type="text"
                          :id="wizardField.label + index"
                          :maxlength="wizardField.isTextLength"
                          :required="wizardField.isRequired"
                          placeholder="Ingresa aquí tu respuesta."
                          :value="wizardField.value"
                        />
                      </div>
                      <div
                        class="input-group"
                        v-if="wizardField.type === 'number'"
                      >
                        <input
                          type="number"
                          :id="wizardField.label + index"
                          :min="wizardField.isNumberMin"
                          :max="wizardField.isNumberMax"
                          :required="wizardField.isRequired"
                          placeholder="Ingresa aquí la cantidad."
                          :value="wizardField.value"
                        />
                      </div>
                      <div
                        class="input-group"
                        v-if="wizardField.type === 'select'"
                      >
                        <select
                          :id="wizardField.label + index"
                          :required="wizardField.isRequired"
                        >
                          <option
                            class="option-disabled"
                            :value="wizardField.value"
                            selected
                          >
                            {{ wizardField.value }}
                          </option>
                          <option
                            v-for="(option, index) in wizardField.isSelect"
                            v-bind:key="index"
                            :value="option"
                            :hidden="option === wizardField.value"
                          >
                            {{ option }}
                          </option>
                        </select>
                      </div>
                      <div
                        class="input-group"
                        v-if="wizardField.type === 'textarea'"
                      >
                        <textarea
                          :id="wizardField.label + index"
                          :maxlength="wizardField.isTextLength"
                          :required="wizardField.isRequired"
                          placeholder="Ingresa aquí tu respuesta."
                          :value="wizardField.value"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12 col-lg-12 pt-50 center">
                    <button class="thm-btn thm-bg" type="submit">
                      Pedir Presupuesto<i
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
    <!-- Delete Ticket Modal -->
    <div
      id="deleteTicketModal"
      ref="deleteTicketModal"
      class="modal fade zIndex"
    >
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
import {
  TICKETS_GET_TICKETS,
  TICKETS_GET_CATEGORIES,
  TICKETS_GET_SUBCATEGORIES,
  TICKETS_GET_WIZARDFIELDS,
  TICKETS_GET_COMMUNES
} from "./constants/querys";
import {
  TICKETS_UPDATE_TICKET,
  TICKETS_DELETE_TICKET
} from "./constants/mutations";

export default {
  name: "Tickets",
  data() {
    return {
      tickets: [],
      selectTicket: "",
      error: "",
      categories: [],
      category: "",
      subCategory: "",
      communes: [],
      commune: "",
      secondQuestion: false,
      subCategorySelected: ""
    };
  },
  apollo: {
    tickets: {
      query: TICKETS_GET_TICKETS,
      variables: {
        user: Cookies.get("user") ? JSON.parse(Cookies.get("user")).id : null
      }
    },
    categories: {
      query: TICKETS_GET_CATEGORIES
    },
    communes: {
      query: TICKETS_GET_COMMUNES
    }
  },
  methods: {
    handleShowTicketModal(ticket) {
      this.selectTicket = ticket;
      $("#showTicketModal").modal("show");
    },
    handleEditTicketModal(ticket) {
      this.selectTicket = ticket;
      this.commune = this.getCommunes.find(
        commune => commune.id === this.selectTicket.commune.id
      ).name;
      this.secondQuestion = true;
      this.category = this.selectTicket.subcategory.category.name;
      this.subCategory = this.selectTicket.subcategory.id;
      this.subCategorySelected = this.selectTicket.subcategory;
      $("#editTicketModal").modal("show");
    },
    handleDeleteTicketModal(ticket) {
      this.selectTicket = ticket;
      $("#deleteTicketModal").modal("show");
    },
    handleCloseModal() {
      this.selectTicket = "";
      this.error = "";
      this.category = "";
      this.subCategory = "";
      this.commune = "";
      this.subCategorySelected = "";
      this.secondQuestion = false;
    },
    handleShowTicket(e) {
      e.preventDefault();
      this.handleCloseModal();
      $("#showTicketModal").modal("hide");
    },
    async handleEditTicket(e) {
      e.preventDefault();
      let requirements = {};

      if (
        Cookies.get("user") &&
        this.category &&
        this.subCategory &&
        this.commune
      ) {
        this.getWizardFields.map((wizardField, index) => {
          requirements[wizardField.label] = document.getElementById(
            wizardField.label + index
          ).value;
        });

        await this.$apollo
          .mutate({
            mutation: TICKETS_UPDATE_TICKET,
            variables: {
              id: this.selectTicket.id,
              subCategory: this.subCategory,
              usersPermissionsUser: JSON.parse(Cookies.get("user")).id,
              commune: this.getCommunes
                .filter(commune => commune.name === this.commune)
                .shift().id,
              requirements: requirements
            }
          })
          .then(() => {
            $("#editTicketModal").modal("hide");
            this.selectTicket = "";
            this.error = "";
            this.category = "";
            this.subCategory = "";
            this.commune = "";
            this.subCategorySelected = "";
            this.secondQuestion = false;

            this.$toast.open({
              message: "Ticket actualizado exitosamente.",
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
      } else {
        this.$toast.open({
          message: "Seleccione una comuna, categoría y subcategoría válidas",
          type: "error",
          duration: 3000
        });
      }
    },
    async handleDeleteTicket(e) {
      e.preventDefault();
      const id = this.selectTicket.id;
      // is not working
      await this.$apollo
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
    },
    handleSecondQuestion() {
      this.secondQuestion = true;
    }
  },
  computed: {
    getCommunes() {
      const communes = [];

      this.communes.map(commune => {
        const cat = {
          id: commune.id,
          name:
            commune.name +
            ", " +
            commune.city.name +
            ", " +
            commune.city.region.name
        };

        communes.push(cat);
      });

      return communes;
    }
  },
  asyncComputed: {
    async getSubCategories() {
      let subCategories = [];

      if (this.categories.some(category => category.name === this.category)) {
        await this.$apollo
          .query({
            query: TICKETS_GET_SUBCATEGORIES,
            variables: {
              category: this.categories
                .filter(category => category.name === this.category)
                .shift().id
            }
          })
          .then(data => {
            subCategories = data.data.subcategories;
          });
      }

      return subCategories;
    },
    async getWizardFields() {
      let wizardFields = [];
      // incomplete
      await this.$apollo
        .query({
          query: TICKETS_GET_WIZARDFIELDS,
          variables: {
            subCategory: this.subCategory
          }
        })
        .then(data => {
          /*           console.log("getWizardFields: ", this.getWizardFields);
          console.log("get1: ", data.data.wizardFields);
          console.log("requirements: ", this.selectTicket.requirements); */

          data.data.wizardFields.map(wizardField => {
            delete wizardField.value;
            Object.entries(this.selectTicket.requirements).map(requirement => {
              if (wizardField.label === requirement[0]) {
                wizardField.value = requirement[1];
              }
            });
            wizardFields.push(wizardField);
          });
        });

      /* console.log("wizardFields: ", wizardFields); */
      return wizardFields;
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
</style>