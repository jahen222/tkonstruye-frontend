<template>
  <aside id="dashboardSidebar" class="sidebar-wrap widget2 brd-rd5 w-100">
    <nav
      class="navbar flex-column navbar-expand-md navbar-light bg-light text-justify w-100 d-none d-md-block d-lg-block d-xl-block"
    >
      <button
        type="button"
        class="navbar-toggler"
        data-toggle="collapse"
        data-target="#navbarCollapse"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse justify-content-between"
        id="navbarCollapse"
      >
        <nav class="nav flex-column">
          <a class="nav-link paddingLeft text-center" href="#">
            <div class="about-widget-img d-inline-block">
              <img
                v-if="me.detail.photo"
                class="img-fluid rounded-circle photo"
                :src="this.api_url + me.detail.photo.url"
                alt="About Image"
              />
              <img
                v-else
                class="img-fluid rounded-circle photo"
                src="../../assets/neutro-user.png"
                alt="About Image"
              />
            </div>
          </a>
          <a class="nav-link paddingLeft text-center" href="#"
            ><h4 class="mb-0">{{ me.detail.username }}</h4></a
          >
          <a class="nav-link paddingLeft text-center" href="#"
            ><p class="mb-0">“{{ me.detail.slogan }}”</p></a
          >
          <hr />
          <a
            class="nav-link customNavLink"
            href="#"
            @click="handleGeneralOption('dashboard')"
          >
            <i class="fas fa-tachometer-alt"></i> Dashboard</a
          >
          <a
            class="nav-link customNavLink"
            href="#"
            @click="handleGeneralOption('profile')"
          >
            <i class="fas fa-user"></i> Mi Perfil</a
          >
          <a
            class="nav-link customNavLink"
            href="#"
            @click="handleGeneralOption('categories')"
            v-if="me.detail.role.name === 'Professional'"
            ><i class="fas fa-stream"></i> Categorías</a
          >
          <a
            class="nav-link customNavLink"
            href="#"
            @click="handleGeneralOption('tickets')"
            v-if="me.detail.role.name === 'Authenticated'"
            ><i class="fas fa-briefcase"></i> Tickets</a
          >
          <a
            class="nav-link customNavLink"
            href="#"
            @click="handleGeneralOption('proposals')"
            v-if="me.detail.role.name === 'Authenticated'"
            ><i class="fas fa-paperclip"></i> Propuestas</a
          >
          <a
            class="nav-link customNavLink"
            href="#"
            @click="handleGeneralOption('professionalProposals')"
            v-if="me.detail.role.name === 'Professional'"
            ><i class="fas fa-paperclip"></i> Propuestas</a
          >
          <a
            class="nav-link customNavLink"
            href="#"
            @click="handleGeneralOption('payment')"
          >
            <i class="fas fa-dollar-sign"></i> Payment</a
          >
        </nav>
      </div>
    </nav>
    <div class="rspn-hdr d-block d-md-none d-lg-none d-xl-none">
      <div class="lg-mn">
        <span class="rspn-mnu-btn"><i class="fa fa-list-ul"></i></span>
      </div>
      <div class="rsnp-mnu">
        <div class="about-widget-img d-inline-block">
          <img
            v-if="me.detail.photo"
            class="img-fluid rounded-circle photo"
            :src="this.api_url + me.detail.photo.url"
            alt="About Image"
          />
        </div>
        <hr />
        <span class="rspn-mnu-cls"><i class="fa fa-times"></i></span>
        <ul class="mb-0 list-unstyled w-100">
          <li>
            <a href="#" @click="handleGeneralOption('dashboard')">Dashboard</a>
          </li>
          <li>
            <a href="#" @click="handleGeneralOption('profile')">Perfil</a>
          </li>
          <li>
            <a href="#" @click="handleGeneralOption('categories')">Categorías</a>
          </li>
          <li>
            <a href="#" @click="handleGeneralOption('tickets')">Tickets</a>
          </li>
          <li>
            <a href="#" @click="handleGeneralOption('proposals')">Propuestas</a>
          </li>
          <li>
            <a href="#" @click="handleGeneralOption('payment')">Pago</a>
          </li>
        </ul>
      </div>
      <!-- Responsive Menu -->
    </div>
  </aside>
  <!-- Sidebar Wrap -->
</template>

<script>
import { SIDEBAR_GET_ME } from "./constants/querys";

export default {
  name: "Sidebar",
  props: {
    handleGeneralOption: Function
  },
  data() {
    return {
      api_url: process.env.VUE_APP_STRAPI_API_URL,
      me: {
        detail: {
          id: "",
          username: "",
          slogan: "",
          photo: "",
          role: {
            name: ""
          }
        }
      }
    };
  },
  apollo: {
    me: {
      query: SIDEBAR_GET_ME
    }
  }
};
</script>

<style scoped>
.photo {
  width: 105px;
  height: 105px;
}
.customNavLink:hover {
  color: #ff5e15;
}
.nav {
  padding-left: 0;
}
.paddingLeft {
  padding-left: 25px;
}
</style>
