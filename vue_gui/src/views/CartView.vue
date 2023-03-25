<template lang="">
  <div class="cart">
    <div class="left">
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
          <div class="qtyVal">{{order.qty}}</div>
          <button class="qtyPlus" @click="qtyPlus(order.order_id)">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
      <h3>R {{total}}</h3>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      
    };
  },
  computed: {
    ...mapGetters([
      "perfumes",
      "perfume",
      "users",
      "user",
      "loggedUser",
      "orders",
      "total"
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
      "cancelOrder"
    ]),
    ...mapMutations(["setPerfumes", "setUsers", "setOrders"]),
    qtyPlus(id) {
        this.increaseQty(id)

        // this.calTotal(this.orders);
    },
    qtyMin(id) {

      if (this.order?.qty > 0) {
        this.decreaseQty(id)
      }
      else{
        this.cancelOrder(id)
      }
        
        // this.calTotal(this.orders);
    }
  },
  created() {
    
    this.fetchOrders(this.loggedUserID);
    console.log(this.loggedUserID);
  },
};
</script>
<style scoped>
.cart {
  width: 100vw;
  height: 100vh;
  display: flex;
}
.left {
  width: 30vw;
  height: 100vh;
  background-color: var(--tone-three);
  padding-top: 5rem;
  display: flex;
  flex-direction: column;
  gap:0.8rem;
}
.right {
  width: 70vw;
  height: 100vh;
  background-color: var(--tone-one);
  padding-top: 5rem;
  display: flex;
  flex-direction: column;
  gap:0.8rem;
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
.qty_button{
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
