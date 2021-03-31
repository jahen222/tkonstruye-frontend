<template>
  <aside id="dashboardSidebar" class="sidebar-wrap w-100">
    <div class="widget2 brd-rd5 w-100">
      <div class="about-widget text-center w-100">
        <div class="about-widget-img d-inline-block">
          <img
            v-if="me.detail.photo === null"
            class="img-fluid rounded-circle"
            src="../../assets/blubuild/images/resources/about-widget-img.jpg"
            alt="About Image"
          />
          <img
            v-else
            class="img-fluid rounded-circle photo"
            :src="this.api_url + me.detail.photo.url"
            alt="About Image"
          />
        </div>
        <h4 class="mb-0">{{ me.detail.username }}</h4>
        <p class="mb-0">“{{ me.detail.slogan }}”</p>
        <span class="d-block"
          ><a href="#" @click="handleGeneralOption('profile')"
            >Editar Perfi</a
          ></span
        >
      </div>
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
          username: "",
          slogan: "",
          photo: ""
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
</style>
