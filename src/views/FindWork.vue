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
        <div class="w-100 pt-100 pb-100 position-relative">
          <div class="container">
            <div class="post-detail-wrap w-100">
              <div class="row">
                <div class="col-md-6 col-sm-12 col-lg-4">
                  <aside class="sidebar-wrap w-100">
                    <div class="widget2 search_widget brd-rd5 w-100">
                      <h3>Buscar</h3>
                      <form class="w-100">
                        <input
                          type="text"
                          placeholder="Buscar tickets..."
                          v-model="contains"
                        />
                        <button type="submit">
                          <i class="fas fa-search"></i>
                        </button>
                      </form>
                    </div>
                    <div class="widget2 category_widget brd-rd5 w-100">
                      <h3>Categorías</h3>
                      <ul class="mb-0 list-unstyled w-100">
                        <li
                          v-for="(category, index) in categories"
                          v-bind:key="index"
                        >
                          <span
                            class="linkSpam"
                            data-toggle="collapse"
                            :data-target="'#collapse' + index"
                            :aria-expanded="'false'"
                            :aria-controls="'collapse' + index"
                            title=""
                          >
                            {{ category.name }}
                          </span>
                          <br />
                          <div class="collapse" :id="'collapse' + index">
                            <div class="card card-body">
                              <span
                                class="linkSpam"
                                href="#"
                                v-for="(
                                  subCategory, index2
                                ) in category.subcategories"
                                v-bind:key="index2"
                                @click="
                                  handleFilterSubCategories(subCategory.id)
                                "
                              >
                                {{ subCategory.name }}</span
                              >
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </aside>
                  <!-- Sidebar Wrap -->
                </div>
                <div class="col-md-12 col-sm-12 col-lg-8">
                  <div class="post-detail w-100">
                    <div class="w-100">
                      <ul class="comments-thread mb-0 list-unstyled">
                        <li
                          class="pb-20"
                          v-for="(ticket, index) in tickets"
                          v-bind:key="index"
                        >
                          <div class="comment w-100">
                            <div class="comment-detail">
                              <h4 class="mb-0">
                                {{ ticket.subcategory.category.name }}
                                <i class="fas fa-greater-than"></i>
                                {{ ticket.subcategory.name }}
                              </h4>
                              <span class="d-inline-block"
                                ><i class="fas fa-map-marker-alt"></i>
                                {{ ticket.commune.name }},
                                {{ ticket.commune.city.name }},
                                {{ ticket.commune.city.region.name }}
                              </span>
                              <p class="mb-0">
                                {{ ticket.description }}
                              </p>
                              <a
                                class="comment-reply-link d-inline-block orange"
                                href="javascript:void(0);"
                                title=""
                                ><i class="fas fa-reply-all"></i>Contactar</a
                              >
                              <span class="d-inline-block"
                                ><i class="fa fa-user"></i
                                >{{
                                  ticket.users_permissions_user.username
                                }}</span
                              >
                              <span class="d-inline-block replyCustom"
                                ><i class="far fa-clock"></i
                                >{{ ticketDate(ticket.created_at) }}</span
                              >
                            </div>
                          </div>
                        </li>
                        <div class="col-md-12 col-sm-12 col-lg-12 center">
                          <button
                            class="thm-btn thm-bg"
                            @click="handleMoreTickets"
                          >
                            Cargar Más
                          </button>
                        </div>
                      </ul>
                    </div>
                    <!-- Comments -->
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
  FIND_WORK_GET_CATEGORIES,
  FIND_WORK_GET_TICKETS,
  FIND_WORK_FILTER_SUBCATEGORIES
} from "./constants/querys";
import moment from "moment";

export default {
  name: "FindWork",
  data() {
    return {
      categories: [],
      tickets: [],
      limit: 10,
      contains: ""
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
    categories: {
      query: FIND_WORK_GET_CATEGORIES
    },
    tickets: {
      query: FIND_WORK_GET_TICKETS,
      variables() {
        return {
          limit: this.limit,
          contains: this.contains
        };
      }
    }
  },
  methods: {
    handleMoreTickets(e) {
      e.preventDefault();
      this.limit = this.limit + 5;
    },
    handleFilterSubCategories(subCategoryId) {
      this.$apollo
        .query({
          query: FIND_WORK_FILTER_SUBCATEGORIES,
          variables: {
            limit: this.limit,
            subCategoryId
          }
        })
        .then(data => {
          this.tickets = data.data.tickets;
        })
        .catch(({ graphQLErrors }) => {
          graphQLErrors.map(({ extensions }) =>
            extensions.exception.data.message.map(({ messages }) =>
              messages.map(({ message }) => (this.error = message))
            )
          );
        });
    },
    ticketDate(ticketDate) {
      let now = moment();
      let date = moment(ticketDate);
      let cat = "";

      if (now.diff(date, "second") < 60) {
        cat = now.diff(date, "second") + " Segundos";
      } else if (now.diff(date, "minute") < 60) {
        cat = now.diff(date, "minute") + " Minutos";
      } else if (now.diff(date, "hour") < 24) {
        cat = now.diff(date, "hour") + " Horas";
      } else if (now.diff(date, "day") < 30) {
        cat = now.diff(date, "day") + " Dias";
      } else {
        cat = now.diff(date, "month") + " Meses";
      }

      return cat;
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
</style>