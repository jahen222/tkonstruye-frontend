<template>
  <div id="dashboardCategories" class="post-detail wizard-form w-100">
    <h3 class="mb-0"><i class="fas fa-stream"></i> Categorías</h3>
    <div
      class="accordion w-100 pb-50 pt-40 position-relative"
      id="accordionExample"
    >
      <div
        class="card"
        v-for="(category, index) in categories"
        v-bind:key="index"
      >
        <div class="card-header" :id="'heading' + index">
          <h2 class="mb-0">
            <button
              class="btn customNavLink text-left"
              type="button"
              data-toggle="collapse"
              :data-target="'#collapse' + index"
              :aria-expanded="'false'"
              :aria-controls="'collapse' + index"
            >
              <i class="fas fa-chevron-down"></i> {{ category.name }}
            </button>
          </h2>
        </div>

        <div
          :id="'collapse' + index"
          class="collapse show"
          :aria-labelledby="'heading' + index"
          data-parent="#accordionExample"
        >
          <div class="card-body">
            <form class="w-100">
              <div class="row">
                <div
                  class="col-md-4 col-sm-6 col-lg-4"
                  v-for="(subCategory, index2) in category.subcategories"
                  v-bind:key="index2"
                >
                  <div class="field-wrap w-100">
                    <div class="form-check">
                      <input
                        class="form-check-input customCheckbox"
                        type="checkbox"
                        :value="subCategory.id"
                        :id="subCategory.id"
                        v-model="getSubCategories"
                        @change="handleCheck(subCategory.id)"
                      />
                      <label class="form-check-label" for="defaultCheck1">
                        {{ subCategory.name }}
                      </label>
                    </div>
                  </div>
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
// import $ from "jquery";
import Cookies from "js-cookie";
import {
  CATEGORIES_GET_CATEGORIES,
  CATEGORIES_GET_ME
} from "./constants/querys";
import { CATEGORIES_UPDATE_USER_SUBCATEGORIES } from "./constants/mutations";

export default {
  name: "Categories",
  data() {
    return {
      categories: [],
      me: {
        detail: {
          subcategories: []
        }
      },
      checkSubCategories: []
    };
  },
  apollo: {
    categories: {
      query: CATEGORIES_GET_CATEGORIES
    },
    me: {
      query: CATEGORIES_GET_ME
    }
  },
  methods: {
    async handleCheck() {
      let validate = true;

      if (validate) {
        await this.$apollo
          .mutate({
            mutation: CATEGORIES_UPDATE_USER_SUBCATEGORIES,
            variables: {
              id: Cookies.get("user")
                ? JSON.parse(Cookies.get("user")).id
                : null,
              subCategories: this.checkSubCategories
            }
          })
          .then(data => {
            this.checkSubCategories = [];
            this.me.detail.subcategories = data.data.updateUser.user.subcategories;

            this.$toast.open({
              message: "Categorías actualizadas exitosamente.",
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
  },
  computed: {
    getSubCategories: {
      get() {
        this.me.detail.subcategories.map(subCategory => {
          this.checkSubCategories.push(subCategory.id);
        });

        return this.checkSubCategories;
      },
      set(arr) {
        this.me.detail.subcategories = [];
        this.checkSubCategories = arr;
      }
    }
  }
};
</script>

<style scoped>
.card {
  border: 0px;
  border-radius: 0.25rem;
}
.card-header {
  background-color: #f8f8f9;
  border-bottom: 0px;
}
.customNavLink:hover {
  color: #ff5e15;
}
.customCheckbox {
  width: auto !important;
  height: auto !important;
}
</style>