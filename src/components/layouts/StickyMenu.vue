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
              <li class="menu-item-has-children">
                <a href="javascript:void(0);" title="">Home</a>
                <ul class="mb-0 list-unstyled">
                  <li><a href="index.html" title="">Homepage 1</a></li>
                  <li><a href="index2.html" title="">Homepage 2</a></li>
                  <li><a href="index3.html" title="">Homepage 3</a></li>
                </ul>
              </li>
              <li><a href="about.html" title="">About Us</a></li>
              <li class="menu-item-has-children">
                <a href="javascript:void(0);" title="">Projects</a>
                <ul class="mb-0 list-unstyled">
                  <li><a href="projects.html" title="">Projects</a></li>
                  <li>
                    <a href="project-detail.html" title="">Project Detail</a>
                  </li>
                </ul>
              </li>
              <li class="menu-item-has-children">
                <a href="javascript:void(0);" title="">Pages</a>
                <ul class="mb-0 list-unstyled">
                  <li class="menu-item-has-children">
                    <a href="javascript:void(0);" title="">Services</a>
                    <ul class="mb-0 list-unstyled">
                      <li><a href="services.html" title="">Services</a></li>
                      <li>
                        <a href="services-detail.html" title=""
                          >Service Detail</a
                        >
                      </li>
                    </ul>
                  </li>
                  <li><a href="team.html" title="">Team</a></li>
                  <li>
                    <a href="testimonials.html" title="">Testimonials</a>
                  </li>
                  <li><a href="faq.html" title="">FAQ's</a></li>
                </ul>
              </li>
              <li class="menu-item-has-children">
                <a href="javascript:void(0);" title="">Blog</a>
                <ul class="mb-0 list-unstyled">
                  <li><a href="blog.html" title="">Blog</a></li>
                  <li>
                    <a href="blog-detail.html" title="">Blog Detail</a>
                  </li>
                </ul>
              </li>
              <li class="menu-item-has-children">
                <a href="javascript:void(0);" title="">Shop</a>
                <ul class="mb-0 list-unstyled">
                  <li><a href="shop.html" title="">Shop</a></li>
                  <li>
                    <a href="shop-detail.html" title="">Shop Detail</a>
                  </li>
                  <li><a href="cart.html" title="">Cart</a></li>
                  <li><a href="checkout.html" title="">Checkout</a></li>
                </ul>
              </li>
              <li><a href="contact.html" title="">Contact Us</a></li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
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
