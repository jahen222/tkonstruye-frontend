<template>
  <section id="dashboardTickets">
    <div class="w-100 pb-100 position-relative">
      <div class="container">
        <div class="cart-table w-100">
          <form class="cart-form">
            <table class="product-table">
              <thead>
                <tr>
                  <th>Tipo de Trabajo</th>
                  <th>Comuna</th>
                  <th>Description</th>
                  <th>Editar</th>
                </tr>
              </thead>
              <tbody v-if="tickets ? tickets.length > 0 : false">
                <tr v-for="(ticket, index) in tickets" v-bind:key="index">
                  <td class="product-model">{{ ticket.subcategory.name }}</td>
                  <td class="product-model">{{ ticket.commune.name }}</td>
                  <td class="product-name">
                    <div
                      v-for="(requirement, index) in ticket.requirements"
                      v-bind:key="index"
                    >
                      <h4 class="mb-0">
                        <a href="#" title="">
                          {{
                            Object.keys(ticket.requirements)[
                              Object.values(ticket.requirements).indexOf(requirement)
                            ]
                          }}
                        </a>
                      </h4>
                      <p class="mb-0">
                        {{ requirement }}
                      </p>
                    </div>
                  </td>
                  <td class="product-btns">
                    <div class="product-cart-btns">
                      <a class="edit" href="javascript:void(0);" title=""
                        ><i class="fas fa-pencil-alt"></i
                      ></a>
                      <a class="remove" href="javascript:void(0);" title=""
                        ><i class="far fa-trash-alt"></i
                      ></a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- Product Table -->
          </form>
          <!-- Cart Form -->
        </div>
        <!-- Cart Table -->
      </div>
    </div>
  </section>
</template>

<script>
import Cookies from "js-cookie";
import { TICKETS_GET_TICKETS } from "./constants/querys";

export default {
  name: "Tickets",
  data() {
    return {
      tickets: []
    };
  },
  apollo: {
    tickets: {
      query: TICKETS_GET_TICKETS,
      variables: {
        user: JSON.parse(Cookies.get("user")).id
      }
    }
  }
};
</script>
