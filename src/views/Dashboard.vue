<template>
  <div id="dashboard">
    <Header />
    <!-- Header -->
    <StickyMenu />
    <!-- Sticky Menu -->
    <ResponsiveHeader />
    <!-- Responsive Header -->
    <section>
      <div class="w-100 pt-50 opc7 position-relative">
        <div class="container">
          <div class="page-top-wrap w-100" v-if="generalOption === 'profile'">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="#" @click="handleGeneralOption('')" title=""
                  >Dashboard</a
                >
              </li>
              <li class="breadcrumb-item active">Perfil</li>
            </ol>
          </div>
          <div
            class="page-top-wrap w-100"
            v-else-if="generalOption === 'tickets'"
          >
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="#" @click="handleGeneralOption('')" title=""
                  >Dashboard</a
                >
              </li>
              <li class="breadcrumb-item active">Tickets</li>
            </ol>
          </div>
          <div
            class="page-top-wrap w-100"
            v-else-if="generalOption === 'categories'"
          >
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="#" @click="handleGeneralOption('')" title=""
                  >Dashboard</a
                >
              </li>
              <li class="breadcrumb-item active">Categorías</li>
            </ol>
          </div>
          <div
            class="page-top-wrap w-100"
            v-else-if="generalOption === 'proposals'"
          >
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="#" @click="handleGeneralOption('')" title=""
                  >Dashboard</a
                >
              </li>
              <li class="breadcrumb-item active">Propuestas</li>
            </ol>
          </div>
          <div class="page-top-wrap w-100" v-else>
            <ol class="breadcrumb">
              <li class="breadcrumb-item active">
                <a href="#" title="">Dashboard</a>
              </li>
            </ol>
          </div>
          <!-- Page Top Wrap -->
        </div>
      </div>
    </section>
    <section>
      <div class="w-100 pt-20 pb-100 position-relative">
        <div class="container">
          <div class="post-detail-wrap w-100">
            <div class="row">
              <div class="col-md-4 col-sm-12 col-lg-3">
                <Sidebar :handleGeneralOption="handleGeneralOption" />
              </div>
              <div class="col-md-8 col-sm-12 col-lg-9">
                <div v-if="generalOption == 'profile'">
                  <Profile />
                </div>
                <div v-else-if="generalOption == 'tickets'">
                  <Tickets />
                </div>
                <div v-else-if="generalOption == 'categories'">
                  <Categories />
                </div>
                <div v-else-if="generalOption == 'proposals'">
                  <Proposals />
                </div>
                <div v-else>
                  <Index />
                </div>
              </div>
            </div>
          </div>
          <!-- Blog Detail Wrap -->
        </div>
      </div>
    </section>
    <Footer />
    <!-- Footer -->
    <Copyright />
    <!-- Copyright -->
  </div>
</template>

<script>
import Header from "../components/layouts/Header";
import StickyMenu from "../components/layouts/StickyMenu";
import ResponsiveHeader from "../components/layouts/ResponsiveHeader";
import Sidebar from "../components/dashboard/Sidebar.vue";
import Profile from "../components/dashboard/Profile";
import Categories from "../components/dashboard/Categories";
import Tickets from "../components/dashboard/Tickets";
import Proposals from "../components/dashboard/Proposals";
import Index from "../components/dashboard/Index";
import Footer from "../components/layouts/Footer";
import Copyright from "../components/layouts/Copyright";

export default {
  name: "Dashboard",
  components: {
    Header,
    StickyMenu,
    ResponsiveHeader,
    Profile,
    Categories,
    Tickets,
    Proposals,
    Index,
    Footer,
    Copyright,
    Sidebar
  },
  data() {
    return {
      api_url: process.env.VUE_APP_STRAPI_API_URL,
      generalOption: ""
    };
  },
  methods: {
    handleGeneralOption: function(option) {
      this.generalOption = option;
    }
  },
  mounted() {
    if (this.$route.params.option) {
      this.generalOption = this.$route.params.option;
    }
  }
};
</script>

<style scoped>
.reply-form {
  margin-top: 0px;
}
.breadcrumb-item {
  color: #6c757d !important;
}
.breadcrumb-item::before {
  color: #6c757d !important;
}
.active {
  color: #ff5e15 !important;
}
</style>
