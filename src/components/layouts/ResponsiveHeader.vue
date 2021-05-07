<template>
  <div class="rspn-hdr">
    <div class="rspn-mdbr">
      <div class="rspn-scil">
        <a href="javascript:void(0);" title="Twitter" target="_blank"
          ><i class="fab fa-twitter"></i
        ></a>
        <a href="javascript:void(0);" title="Facebook" target="_blank"
          ><i class="fab fa-facebook-f"></i
        ></a>
        <a href="javascript:void(0);" title="Linkedin" target="_blank"
          ><i class="fab fa-linkedin-in"></i
        ></a>
        <a href="javascript:void(0);" title="Google Plus" target="_blank"
          ><i class="fab fa-google-plus-g"></i
        ></a>
      </div>
      <form class="rspn-srch">
        <input type="text" placeholder="Enter Your Keyword" />
        <button type="submit"><i class="fa fa-search"></i></button>
      </form>
    </div>
    <div class="lg-mn">
      <div class="logo">
        <a href="/" title="Home"><img :src="getLogo" alt="Logo" /></a>
      </div>
      <div class="rspn-cnt">
        <span
          ><i class="thm-clr far fa-envelope-open"></i
          ><a href="javascript:void(0);" title="">bioxin0011@gmail.com</a></span
        >
        <span
          ><i class="thm-clr fas fa-map-marker-alt"></i>27 Division, mirpur-12,
          pallbi.</span
        >
      </div>
      <span class="rspn-mnu-btn"><i class="fa fa-list-ul"></i></span>
    </div>
    <div class="rsnp-mnu">
      <span class="rspn-mnu-cls"><i class="fa fa-times"></i></span>
      <ul class="mb-0 list-unstyled w-100">
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
                  <a href="services-detail.html" title="">Service Detail</a>
                </li>
              </ul>
            </li>
            <li><a href="team.html" title="">Team</a></li>
            <li><a href="testimonials.html" title="">Testimonials</a></li>
            <li><a href="faq.html" title="">FAQ's</a></li>
          </ul>
        </li>
        <li class="menu-item-has-children">
          <a href="javascript:void(0);" title="">Blog</a>
          <ul class="mb-0 list-unstyled">
            <li><a href="blog.html" title="">Blog</a></li>
            <li><a href="blog-detail.html" title="">Blog Detail</a></li>
          </ul>
        </li>
        <li class="menu-item-has-children">
          <a href="javascript:void(0);" title="">Shop</a>
          <ul class="mb-0 list-unstyled">
            <li><a href="shop.html" title="">Shop</a></li>
            <li><a href="shop-detail.html" title="">Shop Detail</a></li>
            <li><a href="cart.html" title="">Cart</a></li>
            <li><a href="checkout.html" title="">Checkout</a></li>
          </ul>
        </li>
        <li><a href="contact.html" title="">Contact Us</a></li>
      </ul>
    </div>
    <!-- Responsive Menu -->
  </div>
</template>

<script>
import { RESPONSIVEHEADER_GET_LOGO } from "./constants/querys";

export default {
  name: "ResponsiveHeader",
  data() {
    return {
      api_url: process.env.VUE_APP_STRAPI_API_URL,
      config: {
        logo_mobile: {
          url: ""
        }
      }
    };
  },
  apollo: {
    config: {
      query: RESPONSIVEHEADER_GET_LOGO
    }
  },
  computed: {
    getLogo() {
      return this.api_url + this.config.logo_mobile.url;
    }
  }
};
</script>

<style scoped>
.logo {
  width: 20%;
}
</style>
