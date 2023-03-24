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
          <h5>{{ order.perfume_name }}</h5>
        </div>
        <div class="gender">
          <h5>{{ order.description }}</h5>
        </div>
        <div class="description">
          <p>R {{ order.price }}</p>
        </div>
        <div class="qty_button">
          <button class="qtyMin">
            <i class="fa-solid fa-minus"></i>
          </button>
          <div class="qtyVal"></div>
          <button class="qtyPlus">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters([
      "perfumes",
      "perfume",
      "users",
      "user",
      "loggedUser",
      "orders",
    ]),
  },
  methods: {
    ...mapActions([
      "fetchPerfumes",
      "fetchPerfume",
      "fetchUsers",
      "fetchUser",
      "fetchOrders",
    ]),
    ...mapMutations(["setPerfumes", "setUsers", "setOrders"]),
  },
  created() {
    this.fetchOrders;
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
}
.right {
  width: 70vw;
  height: 100vh;
  background-color: var(--tone-one);
}
.image {
  width: 4rem;
  height: 4rem;
}
.img {
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
}
.info {
 width: 20rem;
 height: 4rem;
}
</style>
