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
                        @click="handleAddCardModal()"
                      >
                        Agregar<i class="flaticon-arrow-pointing-to-right"></i>
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
                    <th scope="col">NOMBRE</th>
                    <th scope="col">APELLIDO</th>
                    <th scope="col">NUMERO</th>
                    <th scope="col">VENCIMIENTO</th>
                    <th scope="col">CVV</th>
                    <th scope="col">ZIP</th>
                    <th scope="col">TIPO</th>
                  </tr>
                </thead>
                <tbody v-if="cards ? cards.length > 0 : false">
                  <tr v-for="(card, index) in cards" v-bind:key="index">
                    <th scope="row" @click="handleShowCardModal(card)">
                      {{ card.id }}
                    </th>
                    <td @click="handleShowCardModal(card)">
                      {{ card.firstname }}
                    </td>
                    <td @click="handleShowCardModal(card)">
                      {{ card.lastname }}
                    </td>
                    <td @click="handleShowCardModal(card)">
                      {{ card.cardNumber }}
                    </td>
                    <td @click="handleShowCardModal(card)">
                      {{ card.expirationMonth }} / {{ card.expirationYear }}
                    </td>
                    <td @click="handleShowCardModal(card)">
                      {{ card.cvv }}
                    </td>
                    <td @click="handleShowCardModal(card)">
                      {{ card.zip }}
                    </td>
                    <td @click="handleShowCardModal(card)">
                      {{ card.type }}
                    </td>
                    <td>
                      <!-- <a
                        class="view iconTable"
                        title=""
                        @click="handleShowCardModal(card)"
                        data-toggle="modal"
                        ><i class="fas fa-eye"></i
                      ></a>
                      <a
                        class="edit iconTable"
                        title=""
                        @click="handleEditCardModal(card)"
                        data-toggle="modal"
                        ><i class="fas fa-pencil-alt"></i
                      ></a> -->
                      <a
                        class="remove iconTable"
                        @click="handleDeleteCardModal(card)"
                        data-toggle="modal"
                        title=""
                        ><i class="far fa-trash-alt"></i
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
      id="showTicketModal"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              <i class="fas fa-eye"></i> Ticket
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
              <form class="w-100 pb-50 pb-custom" @submit="handleShowTicket">
                <div class="row">
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">Número:</th>
                          <th scope="col">
                            #{{ selectTicket ? selectTicket.id : "" }}
                          </th>
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
                              {{
                                selectTicket ? selectTicket.commune.name : ""
                              }}
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
                              {{
                                selectTicket
                                  ? selectTicket.subcategory.category.name
                                  : ""
                              }}
                              <i class="fas fa-greater-than smaller"></i>
                              {{
                                selectTicket
                                  ? selectTicket.subcategory.name
                                  : ""
                              }}
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
                              v-for="(requirement, index) in selectTicket
                                ? selectTicket.requirements
                                : []"
                              v-bind:key="index"
                            >
                              {{
                                Object.keys(selectTicket.requirements)[
                                  Object.values(
                                    selectTicket.requirements
                                  ).indexOf(requirement)
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
                              {{ selectTicket ? selectTicket.description : "" }}
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
    <!-- Add Card Modal -->
    <div
      class="modal fade zIndex"
      id="addCardModal"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              <i class="fas fa-pencil-alt"></i> Agregar Tarjeta
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
              <form class="w-100 pb-50 pb-custom" @submit="handleAddCard">
                <div class="row">
                  <div class="col-md-12 col-sm-12 col-lg-12">
                    <div class="field-wrap w-100">
                      <label>
                        <i class="fas fa-question-circle"></i>
                        Nombre</label
                      >
                      <div class="input-group">
                        <input
                          type="text"
                          :required="true"
                          v-model="firstname"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12 col-lg-12">
                    <div class="field-wrap w-100">
                      <label>
                        <i class="fas fa-question-circle"></i>
                        Apellido</label
                      >
                      <div class="input-group">
                        <input
                          type="text"
                          :required="true"
                          v-model="lastname"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12 col-lg-12">
                    <div class="field-wrap w-100">
                      <label>
                        <i class="fas fa-question-circle"></i>
                        Número de tarjeta</label
                      >
                      <div class="input-group">
                        <input
                          type="text"
                          :required="true"
                          v-model="cardNumber"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-4 col-lg-4">
                    <div class="field-wrap w-100">
                      <label>
                        <i class="fas fa-question-circle"></i>
                        Mes</label
                      >
                      <div class="input-group">
                        <input
                          type="number"
                          :required="true"
                          v-model="expirationMonth"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-4 col-lg-4">
                    <div class="field-wrap w-100">
                      <label>
                        <i class="fas fa-question-circle"></i>
                        Año</label
                      >
                      <div class="input-group">
                        <input
                          type="number"
                          :required="true"
                          v-model="expirationYear"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-4 col-lg-4">
                    <div class="field-wrap w-100">
                      <label>
                        <i class="fas fa-question-circle"></i>
                        CVV</label
                      >
                      <div class="input-group">
                        <input type="number" :required="true" v-model="cvv" />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12 col-lg-12">
                    <div class="field-wrap w-100">
                      <label>
                        <i class="fas fa-question-circle"></i>
                        Zip</label
                      >
                      <div class="input-group">
                        <input type="text" :required="true" v-model="zip" />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12 col-lg-12">
                    <div class="field-wrap w-100">
                      <label>
                        <i class="fas fa-question-circle"></i>
                        Tipo</label
                      >
                      <div class="input-group">
                        <input type="text" :required="true" v-model="type" />
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
            <h5 class="modal-title" id="exampleModalLabel">
              <i class="fas fa-pencil-alt"></i> Editar Ticket
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
                            :disabled="
                              subCategory.id === subCategorySelected.id
                            "
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
                  <div
                    class="col-md-12 col-sm-12 col-lg-12"
                    v-if="getWizardFields ? getWizardFields.length > 0 : false"
                  >
                    <div class="field-wrap w-100">
                      <label>
                        <i class="fas fa-question-circle"></i>
                        Descripción del trabajo</label
                      >
                      <div class="input-group">
                        <textarea
                          maxlength="500"
                          :required="true"
                          v-model="description"
                          placeholder="Ingresa aquí tu respuesta."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12 col-lg-12 pt-50 center">
                    <button class="thm-btn thm-bg" type="submit">
                      Actualizar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Delete Card Modal -->
    <div id="deleteCardModal" ref="deleteCardModal" class="modal fade zIndex">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">
              <i class="far fa-trash-alt"></i> Eliminar Tarjeta
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
              <form class="w-100 pb-50 pb-custom" @submit="handleDeleteCard">
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
import {
  TICKETS_GET_TICKETS,
  TICKETS_GET_CATEGORIES,
  TICKETS_GET_SUBCATEGORIES,
  TICKETS_GET_WIZARDFIELDS,
  TICKETS_GET_COMMUNES,
  PAYMENT_GET_CARDS
} from "./constants/querys";
import {
  TICKETS_UPDATE_TICKET,
  PAYMENT_CREATE_CARD,
  PAYMENT_DELETE_CARD
} from "./constants/mutations";

export default {
  name: "Payment",
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
      subCategorySelected: "",
      description: "",
      contains: "",
      cards: [],
      firstname: "",
      lastname: "",
      cardNumber: "",
      expirationMonth: 0,
      expirationYear: 0,
      cvv: 0,
      zip: "",
      type: "",
      user: JSON.parse(Cookies.get("user"))
        ? JSON.parse(Cookies.get("user"))
        : null,
      selectCard: ""
    };
  },
  apollo: {
    tickets: {
      query: TICKETS_GET_TICKETS,
      variables() {
        return {
          user: Cookies.get("user") ? JSON.parse(Cookies.get("user")).id : null,
          contains: this.contains
        };
      }
    },
    categories: {
      query: TICKETS_GET_CATEGORIES
    },
    communes: {
      query: TICKETS_GET_COMMUNES
    },
    cards: {
      query: PAYMENT_GET_CARDS,
      variables() {
        return {
          user: Cookies.get("user") ? JSON.parse(Cookies.get("user")).id : null,
          contains: this.contains
        };
      },
      fetchPolicy: "no-cache"
    }
  },
  methods: {
    handleShowCardModal(ticket) {
      this.selectTicket = ticket;
      $("#showTicketModal").modal("show");
    },
    handleAddCardModal() {
      $("#addCardModal").modal("show");
    },
    handleEditCardModal(ticket) {
      this.selectTicket = ticket;
      this.commune = this.getCommunes.find(
        commune => commune.id === this.selectTicket.commune.id
      ).name;
      this.secondQuestion = true;
      this.category = this.selectTicket.subcategory.category.name;
      this.subCategory = this.selectTicket.subcategory.id;
      this.subCategorySelected = this.selectTicket.subcategory;
      this.description = this.selectTicket.description;
      $("#editTicketModal").modal("show");
    },
    handleDeleteCardModal(card) {
      this.selectCard = card;
      $("#deleteCardModal").modal("show");
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
    async handleAddCard(e) {
      e.preventDefault();

      if (
        Cookies.get("user") &&
        this.firstname &&
        this.lastname &&
        this.cardNumber &&
        this.expirationMonth &&
        this.expirationYear &&
        this.cvv &&
        this.zip &&
        this.type
      ) {
        await this.$apollo
          .mutate({
            mutation: PAYMENT_CREATE_CARD,
            variables: {
              firstname: this.firstname,
              lastname: this.lastname,
              cardNumber: this.cardNumber,
              expirationMonth: Number(this.expirationMonth),
              expirationYear: Number(this.expirationYear),
              cvv: Number(this.cvv),
              zip: this.zip,
              type: this.type,
              usersPermissionsUser: this.user.id
            },
            update: () => {
              this.$apollo.queries.cards.refresh();
            }
          })
          .then(() => {
            $("#addCardModal").modal("hide");
            this.firstname = "";
            this.error = "";
            this.lastname = "";
            this.cardNumber = "";
            this.expirationMonth = "";
            this.expirationYear = "";
            this.cvv = false;
            this.zip = "";
            this.type = "";

            this.$toast.open({
              message: "Tarjeta agregada exitosamente.",
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
          message: "Complete todos los campos.",
          type: "error",
          duration: 3000
        });
      }
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
              requirements: requirements,
              description: this.description
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
            this.description = "";

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
    async handleDeleteCard(e) {
      e.preventDefault();
      const id = this.selectCard.id;

      await this.$apollo
        .mutate({
          mutation: PAYMENT_DELETE_CARD,
          variables: {
            id
          },
          update: () => {
            this.$apollo.queries.cards.refresh();
          }
        })
        .then(() => {
          $("#deleteCardModal").modal("hide");

          this.$toast.open({
            message: "Tarjeta eliminada exitosamente.",
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