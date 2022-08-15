<template>
  <div class="sticky-menu">
    <div class="container">
      <div
        class="sticky-menu-inner d-flex flex-wrap align-items-center justify-content-between w-100"
      >
        <div class="logo">
          <h1 class="mb-0">
            <a href="/" title="Home"
              ><img
                class="img-fluid"
                :src="getLogo"
                alt="Logo"
                :srcset="getLogo"
            /></a>
          </h1>
        </div>
        <!-- Logo -->
        <nav class="d-inline-flex justify-content-between align-items-center">
          <div class="header-left">
            <ul class="mb-0 list-unstyled d-inline-flex">
              <li><a href="/" title="">Home</a></li>
              <li class="menu-item-has-children">
                <a href="#" title="">Buscar Trabajos</a>
                <ul class="mb-0 list-unstyled">
                  <li>
                    <a
                      href="#"
                      title=""
                      data-toggle="modal"
                      data-target="#wizardModal"
                      >Pedir Presupuesto</a
                    >
                  </li>
                  <li v-if="getUsername">
                    <a href="/find-work" title="">Buscar Trabajos</a>
                  </li>
                  <li v-else>
                    <a href="#loginModal" data-toggle="modal" title=""
                      >Buscar Trabajos</a
                    >
                  </li>
                </ul>
              </li>
              <li><a href="blog.html" title="">Blog</a></li>
              <li><a href="/subscriptions" title="">Planes</a></li>
              <li><a href="about.html" title="">Nosotros</a></li>
              <li><a href="contact.html" title="">Contacto</a></li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { STICKYMENU_GET_LOGO } from "./constants/querys";

export default {
  name: "StickyMenu",
  data() {
    return {
      api_url: process.env.VUE_APP_STRAPI_API_URL,
      config: {
        logo: {
          url: ""
        }
      }
    };
  },
  apollo: {
    config: {
      query: STICKYMENU_GET_LOGO
    }
  },
  computed: {
    getUsername() {
      let user = "";
      if (Cookies.get("user") !== undefined) {
        user = JSON.parse(Cookies.get("user"));
        return user.username;
      }
      return user;
    },
    getLogo() {
      return this.api_url + this.config.logo.url;
    }
  }
};
</script>

<style scoped>
.logo {
  width: 180px;
}
</style>
