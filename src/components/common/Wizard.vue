<template>
  <div
    class="modal fade"
    id="commonWizard"
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
          <div id="dashboardProfile" class="post-detail reply-form w-100">
            <form class="w-100 pb-50 pb-custom">
              <div class="row">
                <div class="col-md-12 col-sm-12 col-lg-12">
                  <div class="field-wrap w-100">
                    <label>¿Qué tipo de trabajo necesitas?</label>
                    <vue-typeahead-bootstrap
                      v-if="categories.length > 0"
                      :data="getCategories"
                      v-model="category"
                    >
                    </vue-typeahead-bootstrap>
                  </div>
                </div>
                <div
                  class="col-md-12 col-sm-12 col-lg-12"
                  v-if="subCategories.length > 0"
                >
                  <div class="field-wrap w-100">
                    <label>Tipo de trabajo</label>
                    <div class="input-group mb-3">
                      <select class="custom-select" v-model="subCategory">
                        <option
                          v-for="item in getSubCategories"
                          v-bind:key="item.id"
                          :value="item.id"
                        >
                          {{ item.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div
                  class="col-md-12 col-sm-12 col-lg-12"
                  v-for="item in wizardFields"
                  v-bind:key="item.id"
                >
                  <div class="field-wrap w-100">
                    <label>{{item.label}}</label>
                    <div class="input-group mb-3" v-if="item.type == 'select'">
                      <select class="custom-select">
                        <option
                          v-for="item2 in item.isSelect"
                          v-bind:key="item2"
                          :value="Object.keys(item.isSelect)[Object.values(item.isSelect).indexOf(item2)]"
                        >
                          {{ item2 }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="col-md-12 col-sm-12 col-lg-12 pt-50 center">
                  <button class="thm-btn thm-bg" type="submit">
                    Pedir Presupuesto<i class="flaticon-arrow-pointing-to-right"></i>
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
      subCategories: [],
      category: "",
      subCategory: "",
      wizardFields: []
    };
  },
  apollo: {
    categories: {
      query: WIZARD_GET_CATEGORIES
    }
  },
  computed: {
    getCategories() {
      const array = [];
      this.categories.map(category => {
        const cat = category.id + "- " + category.name;
        array.push(cat);
      });

      return array;
    }
  },
  asyncComputed: {
    getSubCategories() {
      let categoryId = null;

      if (this.getCategories.some(category => category === this.category)) {
        categoryId = this.category.split("-")[0];
      }

      if (categoryId != null) {
        this.$apollo
          .query({
            query: WIZARD_GET_SUBCATEGORIES,
            variables: {
              categoryId: categoryId
            }
          })
          .then(data => {
            this.subCategories = data.data.subcategories;
          });
      }

      return this.subCategories;
    },
    getWizardFields() {
      if (this.subCategory != "") {
        this.$apollo
          .query({
            query: WIZARD_GET_WIZARDFIELDS,
            variables: {
              subCategoryId: this.subCategory
            }
          })
          .then(data => {
            this.wizardFields = data.data.wizardFields;
          });
      }
      //console.log("aqui: ", this.wizardFields);
      return this.wizardFields;
    }
  }
};
</script>

<style scoped>
.reply-form {
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
