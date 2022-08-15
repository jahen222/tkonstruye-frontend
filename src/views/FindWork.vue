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
        <CreateProposal
          :ticket="ticket"
          :role="me.detail.role.name"
          :subscription="me.detail.subscription"
          :me="me.detail"
        />
        <div class="w-100 pt-100 pb-100 position-relative">
          <div class="container">
            <div class="post-detail-wrap w-100">
              <div class="row">
                <div class="col-md-6 col-sm-12 col-lg-4">
                  <aside class="sidebar-wrap w-100">
                    <div class="widget2 widget3 search_widget brd-rd5 w-100">
                      <h3>Buscar</h3>
                      <form class="w-100">
                        <input
                          type="text"
                          placeholder="Buscar trabajos..."
                          v-model="contains"
                        />
                        <button type="submit">
                          <i class="fas fa-search"></i>
                        </button>
                      </form>
                    </div>
                    <div class="widget2 widget3 category_widget brd-rd5 w-100">
                      <button
                        class="thm-btn thm-bg resetFilter"
                        @click="handleResetFilter()"
                      >
                        X Reiniciar Filtros
                      </button>
                    </div>
                    <div class="widget2 widget3 category_widget brd-rd5 w-100">
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
                    <div class="widget2 widget3 category_widget brd-rd5 w-100">
                      <h3>Comunas</h3>
                      <ul class="mb-0 list-unstyled w-100">
                        <li
                          v-for="(commune, index) in communes"
                          v-bind:key="index"
                        >
                          <span
                            class="linkSpam"
                            title=""
                            @click="handleFilterCommune(commune.id)"
                          >
                            {{ commune.name }}
                          </span>
                          <br />
                        </li>
                      </ul>
                    </div>
                  </aside>
                  <!-- Sidebar Wrap -->
                </div>
                <div class="col-md-6 col-sm-12 col-lg-8">
                  <h3 style="padding-bottom: 2%">Trabajos disponibles</h3>
                  <div class="post-detail w-100">
                    <div class="w-100">
                      <ul class="comments-thread mb-0 list-unstyled">
                        <li
                          class="pb-20"
                          style="display: flex"
                          v-for="(ticket, index) in tickets"
                          v-bind:key="index"
                        >
                          <div
                            class="comment"
                            style="width: 80% !important; margin-right: -10px"
                          >
                            <div class="comment-detail">
                              <h4 class="mb-0">
                                {{ ticket.subcategory.category.name }}
                                <i class="fas fa-greater-than smaller"></i>
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
                                v-if="
                                  ticket.users_permissions_user.id ===
                                  getUser.id
                                "
                                class="comment-reply-link d-inline-block"
                                title=""
                                >Ticket Propio</a
                              >
                              <a
                                v-else-if="
                                  me.detail.role.name === 'Authenticated'
                                "
                                class="comment-reply-link d-inline-block orange"
                                href="#createProposalModal"
                                data-toggle="modal"
                                title=""
                                @click="handleContactTicket(ticket)"
                                ><i class="fas fa-reply-all"></i>Ver</a
                              >
                              <a
                                v-else-if="
                                  ticket.proposals &&
                                  ticket.proposals.some(
                                    (proposal) =>
                                      proposal.users_permissions_user.id ===
                                      getUser.id
                                  )
                                "
                                class="comment-reply-link d-inline-block"
                                title=""
                                >Has propuesto</a
                              >
                              <a
                                v-else
                                class="comment-reply-link d-inline-block orange"
                                href="#createProposalModal"
                                data-toggle="modal"
                                title=""
                                @click="handleContactTicket(ticket)"
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
                              <span class="d-inline-block replyCustom"
                                ><i class="fas fa-users"></i
                                >{{
                                  ticket.proposals ? ticket.proposals.length : 0
                                }}
                                Propuestas</span
                              >
                            </div>
                          </div>
                          <div class="comment">
                            <div class="comment-detail">
                              <p class="price">
                                {{
                                  ticket
                                    ? me.detail.subscription
                                      ? handleFormatPrice(
                                          ticket.subcategory.price -
                                            (ticket.subcategory.price *
                                              me.detail.subscription.discount) /
                                              100
                                        )
                                      : handleFormatPrice(
                                          ticket.subcategory.price
                                        )
                                    : ""
                                }}
                              </p>
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
                <!-- success modal 2 -->
                <div>
                  <div
                    class="modal fade"
                    id="successModal2"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                    style="z-index: 10000 !important"
                    v-if="this.ticketBuy"
                  >
                    <div class="modal-dialog modal-lg modal-dialog-centered">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">
                            Felicitaciones
                          </h5>
                          <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <div class="container-fluid" style="padding: 50px">
                            <div class="row" style="margin-bottom: 30px">
                              <div class="col-md-7">
                                HAS COMPRADO EL SIGUIENTE AVISO:
                              </div>
                              <div class="col-md-5 ml-auto">
                                DATOS DE LA TRANSACCIÓN:
                              </div>
                              <div class="col-md-7" style="margin-top: 1px">
                                <ul class="comments-thread mb-0 list-unstyled">
                                  <li>
                                    <div
                                      class="comment"
                                      style="margin-top: 0.125rem"
                                    >
                                      <div
                                        class="comment-detail"
                                        style="padding: 0px"
                                      >
                                        <h4 class="mb-0">
                                          {{
                                            ticketBuy.subcategory.category.name
                                          }}
                                          <i
                                            class="fas fa-greater-than smaller"
                                          ></i>
                                          {{ ticketBuy.subcategory.name }}
                                        </h4>
                                        <span class="d-inline-block"
                                          ><i class="fas fa-map-marker-alt"></i>
                                          {{ ticketBuy.commune.name }},
                                          {{ ticketBuy.commune.city.name }},
                                          {{
                                            ticketBuy.commune.city.region.name
                                          }}
                                        </span>
                                        <p class="mb-0">
                                          {{ ticketBuy.description }}
                                        </p>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                              <div class="col-5">
                                <div class="row">
                                  <div class="col-12">
                                    Saldo anterior:
                                    {{
                                      handleFormatPrice(
                                        proposalBuy.users_permissions_user
                                          .balance +
                                          (ticketBuy
                                            ? ticketBuy.subcategory.price -
                                              (me.detail.subscription
                                                ? (ticketBuy.subcategory.price *
                                                    me.detail.subscription
                                                      .discount) /
                                                  100
                                                : 0)
                                            : 0)
                                      )
                                    }}
                                  </div>
                                  <div class="col-12">
                                    Costo aviso:
                                    {{
                                      ticketBuy
                                        ? handleFormatPrice(
                                            ticketBuy.subcategory.price -
                                              (me.detail.subscription
                                                ? (ticketBuy.subcategory.price *
                                                    me.detail.subscription
                                                      .discount) /
                                                  100
                                                : 0)
                                          )
                                        : ""
                                    }}
                                  </div>
                                  <div class="col-12">
                                    Saldo actual:
                                    {{
                                      handleFormatPrice(
                                        proposalBuy.users_permissions_user
                                          .balance
                                      )
                                    }}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <br />
                            <div class="row">
                              <div class="col-12">
                                DATOS DEL CLIENTE:
                                <div class="row">
                                  <div class="col-12">
                                    Nombre:
                                    {{
                                      ticketBuy.users_permissions_user.username
                                    }}
                                  </div>
                                  <div class="col-12">
                                    Correo:
                                    {{ ticketBuy.users_permissions_user.email }}
                                  </div>
                                  <div class="col-12">
                                    Celular:
                                    {{ ticketBuy.users_permissions_user.phone }}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
import CreateProposal from "../components/findwork/CreateProposal";
import {
  FIND_WORK_GET_CATEGORIES,
  FIND_WORK_GET_TICKETS,
  FIND_WORK_FILTER_SUBCATEGORIES,
  FIND_WORK_GET_ME,
  FIND_WORK_GET_COMMUNES,
  FIND_WORK_FILTER_COMMUNES,
  CREATE_PROPOSAL_GET_PROPOSAL,
} from "./constants/querys";
import moment from "moment";
import Cookies from "js-cookie";
import $ from "jquery";

export default {
  name: "FindWork",
  data() {
    return {
      categories: [],
      tickets: [],
      limit: 10,
      contains: "",
      ticket: null,
      me: {
        detail: {
          id: "",
          balance: "",
          role: {
            name: "",
          },
        },
      },
      communes: [],
      ticketBuy: "",
    };
  },
  components: {
    Header,
    StickyMenu,
    ResponsiveHeader,
    Footer,
    Copyright,
    CreateProposal,
  },
  apollo: {
    categories: {
      query: FIND_WORK_GET_CATEGORIES,
    },
    tickets: {
      query: FIND_WORK_GET_TICKETS,
      variables() {
        return {
          limit: this.limit,
          contains: this.contains,
        };
      },
    },
    me: {
      query: FIND_WORK_GET_ME,
    },
    communes: {
      query: FIND_WORK_GET_COMMUNES,
    },
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
            subCategoryId,
          },
        })
        .then((data) => {
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
    handleResetFilter() {
      this.$apollo
        .query({
          query: FIND_WORK_GET_TICKETS,
          variables: {
            limit: this.limit,
            contains: this.contains,
          },
        })
        .then((data) => {
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
    handleContactTicket(ticket) {
      this.ticket = ticket;
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
    },
    handleFilterCommune(communeId) {
      this.$apollo
        .query({
          query: FIND_WORK_FILTER_COMMUNES,
          variables: {
            limit: this.limit,
            communeId,
          },
        })
        .then((data) => {
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
    handleFormatPrice(price) {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      });

      return formatter.format(price).replace(",", ".");
    },
  },
  computed: {
    getUser() {
      let user = "";
      if (Cookies.get("user") !== undefined) {
        user = JSON.parse(Cookies.get("user"));
        return user;
      }
      return user;
    },
  },
  updated() {
    if (this.$route.query.q) {
      let user = "";
      this.$apollo
        .query({
          query: CREATE_PROPOSAL_GET_PROPOSAL,
          variables: {
            id: this.$route.query.q,
          },
        })
        .then((data) => {
          this.proposalBuy = data.data.proposal;
          this.ticketBuy = data.data.proposal.ticket;
          if (Cookies.get("user") !== undefined) {
            user = JSON.parse(Cookies.get("user"));
            if (data.data.proposal.users_permissions_user.id == user.id) {
              $("#successModal2").modal("show");
            }
          }
        });
    }
  },
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
.price {
  font-size: x-large;
  color: #ff5e15;
  padding-top: 3%;
  padding-right: 3%;
}
.resetFilter {
  padding: 2px;
}
.widget3 {
  margin-top: 0 !important;
}
</style>