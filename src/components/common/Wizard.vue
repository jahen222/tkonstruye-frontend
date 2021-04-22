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
                <div class="col-md-12 col-sm-12 col-lg-12">
                  <div class="field-wrap w-100">
                    <label>
                      <i class="fas fa-question-circle"></i> ¿Qué tipo de
                      trabajo necesitas?</label
                    >
                    <vue-typeahead-bootstrap
                      v-if="getCategories.length > 0"
                      :data="getCategories"
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
                          :value="subCategory"
                        >
                          {{ subCategory }}
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
  WIZARD_GET_WIZARDFIELDS
} from "./constants/querys";

export default {
  name: "Wizard",
  data() {
    return {
      categories: [],
      category: "",
      subCategory: ""
    };
  },
  apollo: {
    categories: {
      query: WIZARD_GET_CATEGORIES
    }
  },
  methods: {
    handleWizardData(e) {
      e.preventDefault();
      if (Cookies.get("user") !== undefined) {
        console.log("category: ", this.category);
        console.log("subcategory: ", this.subCategory);
        this.getWizardFields.map((wizardField, index) => {
          console.log(
            wizardField.label + ": ",
            document.getElementById(wizardField.label + index).value
          );
        });
      } else {
        $("#wizardModal").modal("hide")
        $("#loginModal").modal("show");
      }
    }
  },
  computed: {
    getCategories() {
      const categories = [];

      this.categories.map(category => {
        categories.push(category.name);
      });

      return categories;
    }
  },
  asyncComputed: {
    getSubCategories() {
      const subCategories = [];
      this.subCategory = "";

      if (this.category !== "") {
        this.$apollo
          .query({
            query: WIZARD_GET_SUBCATEGORIES,
            variables: {
              category: this.category
            }
          })
          .then(data => {
            data.data.subcategories.map(subCategory =>
              subCategories.push(subCategory.name)
            );
          });
      }

      return subCategories;
    },
    getWizardFields() {
      const wizardFields = [];

      if (this.subCategory !== "") {
        this.$apollo
          .query({
            query: WIZARD_GET_WIZARDFIELDS,
            variables: {
              subCategory: this.subCategory
            }
          })
          .then(data => {
            data.data.wizardFields.map(wizardField =>
              wizardFields.push(wizardField)
            );
          });
      }

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
</style>
