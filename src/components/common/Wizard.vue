<template>
  <div
    class="modal fade"
    id="wizardModal"
    tabindex="-1"
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
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div id="dashboardProfile" class="post-detail wizard-form w-100">
            <form class="w-100 pb-50 pb-custom" @submit="handleWizardData">
              <div class="row">
                <div
                  class="col-md-12 col-sm-12 col-lg-12"
                  v-if="getCommunes.length > 0"
                >
                  <div class="field-wrap w-100">
                    <label>
                      <i class="fas fa-question-circle"></i> ¿Donde necesitas el
                      trabajo?</label
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
                    >
                    </vue-typeahead-bootstrap>
                  </div>
                </div>
                <div
                  class="col-md-12 col-sm-12 col-lg-12"
                  v-if="getSubCategories ? getSubCategories.length > 0 : false"
                >
                  <div class="field-wrap w-100">
                    <label>
                      <i class="fas fa-question-circle"></i> Tipo de
                      trabajo</label
                    >
                    <div class="input-group">
                      <select :required="true" v-model="subCategory">
                        <option value="" disabled hidden>
                          Selecciona una opción:
                        </option>
                        <option
                          v-for="(subCategory, index) in getSubCategories"
                          v-bind:key="index"
                          :value="subCategory.id"
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
                    <div class="input-group" v-if="wizardField.type === 'text'">
                      <input
                        type="text"
                        :id="wizardField.label + index"
                        :maxlength="wizardField.isTextLength"
                        :required="wizardField.isRequired"
                        placeholder="Ingresa aquí tu respuesta."
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
                          value=""
                          disabled
                          selected
                          hidden
                        >
                          Selecciona una opción:
                        </option>
                        <option
                          v-for="(option, index) in wizardField.isSelect"
                          v-bind:key="index"
                          :value="option"
                        >
                          {{ option }}
                        </option>
                      </select>
                    </div>

                    <div class="flexBox" v-if="wizardField.type === 'radio'">
                      <div
                        v-for="(option, index2) in wizardField.isRadio"
                        v-bind:key="index2"
                        class="center"
                      >
                        <input
                          class="radioButton"
                          type="radio"
                          :name="wizardField.label + index"
                          :value="option"
                          :checked="index2 == 1"
                        />
                        <h6 class="radioLabel" for="isradio">{{ option }}</h6>
                      </div>
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
</template>

<script>
import $ from "jquery";
import Cookies from "js-cookie";
import {
  WIZARD_GET_CATEGORIES,
  WIZARD_GET_SUBCATEGORIES,
  WIZARD_GET_WIZARDFIELDS,
  WIZARD_GET_COMMUNES,
  WIZARD_GET_VULGARITIES,
} from "./constants/querys";
import { WIZARD_CREATE_TICKET } from "./constants/mutations";
import { TICKETS_GET_TICKETS } from "../dashboard/constants/querys";

export default {
  name: "Wizard",
  data() {
    return {
      categories: [],
      category: "",
      subCategory: "",
      communes: [],
      commune: "",
      secondQuestion: false,
      description: "",
    };
  },
  apollo: {
    categories: {
      query: WIZARD_GET_CATEGORIES,
    },
    communes: {
      query: WIZARD_GET_COMMUNES,
    },
    config: {
      query: WIZARD_GET_VULGARITIES,
    },
  },
  methods: {
    async handleWizardData(e) {
      e.preventDefault();
      let requirements = {};

      if (!Cookies.get("user")) {
        $("#wizardModal").modal("hide");
        $("#loginModal").modal("show");
      } else if (
        Cookies.get("user") &&
        this.category &&
        this.subCategory &&
        this.commune
      ) {
        var validate = true;

        this.getWizardFields.map((wizardField, index) => {
          requirements[wizardField.label] =
            wizardField.type == "radio "
              ? document.getElementByName(wizardField.label + index).value
              : document.getElementById(wizardField.label + index).value;
        });

        if (this.description) {
          for (
            let i = 0;
            i < Object.values(this.config.vulgarity).length;
            i++
          ) {
            const vulgarity = Object.values(this.config.vulgarity)[i];
            if (
              this.description.toLowerCase().search(vulgarity.toString()) != -1
            ) {
              validate = false;
              this.$toast.open({
                message: "La descripción tiene contenido ofensivo.",
                type: "error",
                duration: 3000,
              });
              break;
            }
          }
        }

        if (validate || false) {
          await this.$apollo
            .mutate({
              mutation: WIZARD_CREATE_TICKET,
              variables: {
                subCategory: this.subCategory,
                usersPermissionsUser: JSON.parse(Cookies.get("user")).id,
                commune: this.getCommunes
                  .filter((commune) => commune.name === this.commune)
                  .shift().id,
                requirements: requirements,
                description: this.description,
              },
              refetchQueries: [
                {
                  query: TICKETS_GET_TICKETS,
                  variables: {
                    user: Cookies.get("user")
                      ? JSON.parse(Cookies.get("user")).id
                      : null,
                    contains: "",
                  },
                },
              ],
            })
            .then(() => {
              $("#wizardModal").modal("hide");
              this.category = "";
              this.subCategory = "";
              this.commune = "";
              this.secondQuestion = false;
              this.description = "";
              this.$toast.open({
                message: "Ticket creado exitosamente.",
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
        }
      } else {
        this.$toast.open({
          message: "Seleccione una comuna, categoría y subcategoría válidas",
          type: "error",
          duration: 3000,
        });
      }
    },
    handleSecondQuestion() {
      this.secondQuestion = true;
    },
  },
  computed: {
    getCommunes() {
      const communes = [];

      this.communes.map((commune) => {
        const cat = {
          id: commune.id,
          name:
            commune.name +
            ", " +
            commune.city.name +
            ", " +
            commune.city.region.name,
        };

        communes.push(cat);
      });

      return communes;
    },
  },
  asyncComputed: {
    async getSubCategories() {
      let subCategories = [];
      this.subCategory = "";

      if (this.categories.some((category) => category.name === this.category)) {
        await this.$apollo
          .query({
            query: WIZARD_GET_SUBCATEGORIES,
            variables: {
              category: this.categories
                .filter((category) => category.name === this.category)
                .shift().id,
            },
          })
          .then((data) => {
            subCategories = data.data.subcategories;
          });
      }

      return subCategories;
    },
    async getWizardFields() {
      let wizardFields = [];

      await this.$apollo
        .query({
          query: WIZARD_GET_WIZARDFIELDS,
          variables: {
            subCategory: this.subCategory,
          },
        })
        .then((data) => {
          wizardFields = data.data.wizardFields;
        });

      return wizardFields;
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
.flexBox {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.radioLabel {
  font-size: 14px;
  color: #777;
}
.radioButton {
  width: 13px !important;
  height: 13px !important;
}
</style>
