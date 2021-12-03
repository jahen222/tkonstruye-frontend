<template>
  <div class="findWork">
    <main>
      <Header />
      <!-- Header -->
      <StickyMenu />
      <!-- Sticky Menu -->
      <ResponsiveHeader />
      <!-- Responsive Header -->
      <section>
        <div class="w-100 pt-100 pb-70 position-relative">
          <div class="container">
            <div class="sec-title v2 text-center w-100">
              <div class="sec-title-inner d-inline-block">
                <span class="thm-clr d-block"
                  >Nuestros planes y subscripciones</span
                >
                <h2 class="mb-0">
                  Elige uno de nuestros planes para que puedas obtener
                  beneficios y descuentos
                </h2>
              </div>
            </div>
            <div class="serv-wrap text-center w-100">
              <div class="row res-caro">
                <div
                  v-for="(subscription, index) in subscriptions"
                  v-bind:key="index"
                  class="col-md-4 col-sm-6 col-lg-4"
                >
                  <div
                    class="serv-box2 position-relative overflow-hidden w-100"
                    style="
                      background-image: url(assets/images/resources/serv-bg1.jpg);
                    "
                  >
                    <i :class="'thm-clr ' + subscription.icon"></i>
                    <div class="serv-box-inner">
                      <h3 class="mb-0">
                        <a
                          v-if="getUser"
                          href="services-detail.html"
                          title=""
                          >{{ subscription.name }}</a
                        >
                        <a
                          v-else
                          href="#welcomeModal"
                          data-toggle="modal"
                          title=""
                          >{{ subscription.name }}</a
                        >
                      </h3>
                      <p class="mb-0">
                        {{ subscription.description }}
                      </p>
                      <span class="d-block"
                        ><i class="thm-clr">Precio: </i>
                        {{ subscription.price }} $<br />
                        <i class="thm-clr">Descuento: </i>
                        {{ subscription.discount }} %</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Services Wrap -->
          </div>
        </div>
      </section>
      <Footer />
      <!-- Footer -->
      <Copyright />
      <!-- Copyright -->
    </main>
    <!-- Main Wrapper -->
  </div>
</template>

<script>
import Header from "../components/layouts/Header";
import StickyMenu from "../components/layouts/StickyMenu";
import ResponsiveHeader from "../components/layouts/ResponsiveHeader";
import Footer from "../components/layouts/Footer";
import Copyright from "../components/layouts/Copyright";
import {
  FIND_WORK_GET_ME,
  SUBSCRIPTIONS_GET_SUBCRIPTIONS
} from "./constants/querys";
import Cookies from "js-cookie";

export default {
  name: "Subscriptions",
  data() {
    return {
      me: {
        detail: {
          id: "",
          role: {
            name: ""
          }
        }
      },
      subscriptions: []
    };
  },
  components: {
    Header,
    StickyMenu,
    ResponsiveHeader,
    Footer,
    Copyright
  },
  apollo: {
    me: {
      query: FIND_WORK_GET_ME
    },
    subscriptions: {
      query: SUBSCRIPTIONS_GET_SUBCRIPTIONS
    }
  },
  methods: {},
  computed: {
    getUser() {
      let user = "";
      if (Cookies.get("user") !== undefined) {
        user = JSON.parse(Cookies.get("user"));
        return user;
      }
      return user;
    }
  }
};
</script>

<style scoped>
.comment {
  margin-top: 0px;
}
.center {
  text-align: center;
}
.replyCustom {
  margin-left: 1.25rem;
}
.orange {
  color: #ff5e15;
}
.linkSpam:hover {
  color: #ff5e15;
  cursor: pointer;
}
.card-body {
  padding: 0.55rem;
  padding-left: 10%;
}
.widget2.category_widget ul li {
  text-align: left;
}
.smaller {
  font-size: smaller;
}
</style>