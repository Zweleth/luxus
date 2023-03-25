<template lang="">
  <div class="cart" v-if="orders">
    <div class="left">
      <button class="btn_checkout" @click.prevent="">Checkout</button>
      <div class="image" v-for="order in orders" :key="order">
        <div
          class="img"
          :style="{ backgroundImage: `url(${order.image_url})` }"
        ></div>
      </div>
    </div>
    <div class="right">
      <div class="info" v-for="order in orders" :key="order">
        <div class="name_price">
          <h4>{{ order.perfume_name }}</h4>
        </div>
        <div class="description">
          <h5>{{ order.description }}</h5>
        </div>
        <div class="price">
          <p>R {{ order.price }}</p>
        </div>
        <div class="qty_button">
          <button class="qtyMin" @click="qtyMin(order.order_id)">
            <i class="fa-solid fa-minus"></i>
          </button>
          <div class="qtyVal">{{ order.qty }}</div>
          <button class="qtyPlus" @click="qtyPlus(order.order_id)">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
      <h3>R {{ total }}</h3>
    </div>
  </div>
  <div class="logOut_msg" v-else>
    <div>
      <h4>Cart is empty</h4>
      <i class="fa-solid fa-cart-shopping"></i>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      "perfumes",
      "perfume",
      "users",
      "user",
      "loggedUser",
      "orders",
      "order",
      "total",
    ]),
    loggedUserID() {
      return this.$store.state.loggedUser?.user_id;
    },
  },
  methods: {
    ...mapActions([
      "fetchPerfumes",
      "fetchPerfume",
      "fetchUsers",
      "fetchUser",
      "fetchOrders",
      "fetchOrder",
      "increaseQty",
      "decreaseQty",
      "calTotal",
      "cancelOrder",
    ]),
    ...mapMutations(["setPerfumes", "setUsers", "setOrders"]),
    qtyPlus(id) {
      this.increaseQty(id);

      // this.calTotal(this.orders);
    },
    qtyMin(id) {
      this.fetchOrder(id);

      // this.calTotal(this.orders);
    },
  },
  created() {
    this.fetchOrders(this.loggedUserID);
    console.log(this.loggedUserID);
  },
};
</script>
<style scoped>
.cart{
  background-attachment: fixed;
}
.logOut_msg {
  width: 100vw;
  height: 100vh;
  background-color: var(--tone-three);
  display: grid;
  place-items: center;
  color: var(--tone-five);
}
.logOut_msg h4 {
  font-size: 6rem;
  
}
.logOut_msg i {
  font-size: 10rem;
}
.cart {
  width: 100vw;
  min-height: 100vh;
  display: flex;
}

.btn_checkout {
  position: absolute;
  background: none;
  border: none;
  border: 0.1rem solid;
  width: 6rem;
  height: 2rem;
  border-radius: 0.22rem;
  color: var(--tone-five);
  margin-top: 33vh;
  margin-left: 10vh;
}
.left {
  width: 30vw;
  height: 100%;
  min-height: 100vh;
  background-color: var(--tone-three);
  background-attachment: fixed;
  padding-top: 5rem;
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 0.8rem;
}
.right h3 {
  margin-right: auto;
  margin-left: 20vw ;
}
.right {
  width: 70vw;
  height: 100%;
  min-height: 100vh;
  background-color: var(--tone-one);
  background-attachment: fixed;
  padding-top: 5rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
.image {
  width: 8rem;
  height: 8rem;
  background-color: var(--tone-one);
  border-radius: 0 1rem;
  border-radius: 0.5rem 0 0 0.5rem;
  margin-left: auto;
}
.img {
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
}
.info div {
  width: fit-content;
}
.description {
  width: 45vw;
  text-align: start;
}
.info {
  width: 55vw;
  height: 8rem;
  background-color: var(--tone-three);
  border-radius: 0 0.5rem 0.5rem 0;
  margin-right: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: flex-start;
}
.qty_button {
  width: fit-content;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  background: none;
}
.qtyMin {
  width: 2rem;
  height: 1.8rem;
  background: none;
  border: none;
  border-radius: 0.3rem 0 0 0.3rem;
  background-color: var(--tone-one);
}
.qtyVal {
  min-width: 2.5rem;
  height: 1.8rem;
  background-color: var(--tone-two);
  display: grid;
  place-items: center;
}
.qtyPlus {
  width: 2rem;
  height: 1.8rem;
  background: none;
  border: none;
  border-radius: 0 0.3rem 0.3rem 0;
  background-color: var(--tone-one);
}
</style>
