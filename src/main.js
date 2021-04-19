import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueApollo from "vue-apollo";
import apolloClient from "./scripts/vue-apollo";
import Cookies from "js-cookie";
import store from "./store";
import VueToast from "vue-toast-notification";
import VueTypeaheadBootstrap from "vue-typeahead-bootstrap";
import AsyncComputed from "vue-async-computed";
// Bootstrap
import "bootstrap/dist/css/bootstrap.css";
// Blubuild theme styles
import "./assets/blubuild/css/all.min.css";
import "./assets/blubuild/css/flaticon.css";
import "./assets/blubuild/css/animate.min.css";
import "./assets/blubuild/css/bootstrap.min.css";
import "./assets/blubuild/css/jquery.fancybox.min.css";
import "./assets/blubuild/css/perfect-scrollbar.css";
import "./assets/blubuild/css/slick.css";
import "./assets/blubuild/css/style.css";
import "./assets/blubuild/css/responsive.css";
import "./assets/blubuild/css/color.css";
// Blubuild theme scripts
import "./assets/blubuild/js/jquery.min.js";
import "./assets/blubuild/js/popper.min.js";
import "./assets/blubuild/js/bootstrap.min.js";
import "./assets/blubuild/js/wow.min.js";
import "./assets/blubuild/js/perfect-scrollbar.min.js";
import "./assets/blubuild/js/slick.min.js";
import "./assets/blubuild/js/particles.min.js";
import "./assets/blubuild/js/particle-int.js";
import "./assets/blubuild/js/custom-scripts.js";
import "./assets/blubuild/js/counterup.min.js";
import "./assets/blubuild/js/jquery.fancybox.min.js";
// Notification
import "vue-toast-notification/dist/theme-sugar.css";

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

// Auth
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (Cookies.get("user") !== undefined) {
      next();
      return;
    }
    next("/");
  } else {
    next();
  }
});

Vue.config.productionTip = false;
Vue.use(VueApollo);
Vue.use(VueToast);
Vue.component("vue-typeahead-bootstrap", VueTypeaheadBootstrap);
Vue.use(AsyncComputed);

new Vue({
  store,
  router,
  apolloProvider,
  render: (h) => h(App),
}).$mount("#app");
