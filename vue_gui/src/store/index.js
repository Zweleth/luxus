import { createStore } from "vuex";
import axios from "axios";
const URL = "https://luxus.onrender.com/";

export default createStore({
  state: {
    perfumes: null,
    perfume: null,
    users: null,
    user: null,
    loggedUser: null,
    message: null,
    orders: null,
    order: null,
    total: 0,
  },
  getters: {
    perfumes(state) {
      return state.perfumes;
    },
    perfume(state) {
      return state.perfume;
    },
    users(state) {
      return state.users;
    },
    user(state) {
      return state.user;
    },
    loggedUser(state) {
      return state.loggedUser;
    },
    orders(state) {
      return state.orders;
    },
    order(state) {
      return state.order;
    },
    total(state) {
      return state.total;
    },
  },
  mutations: {
    setPerfumes(state, perfumes) {
      state.perfumes = perfumes;
    },
    setPerfume(state, perfume) {
      state.perfume = perfume;
    },
    setUsers(state, users) {
      state.users = users;
    },
    setUser(state, user) {
      state.user = user;
    },
    setLoggedUser(state, loggedUser) {
      state.loggedUser = loggedUser;
    },
    setMessage(state, message) {
      state.message = message;
    },
    sortPerfumes(state, perfumes) {
      state.perfumes = perfumes;
    },
    setOrders(state, orders) {
      state.orders = orders;
    },
    setOrder(state, order) {
      state.order = order;
    },
    setTotal(state, total) {
      state.total = total;
    },
  },
  actions: {
    async signIn(context, payload) {
      let res = await axios.post(`${URL}login`, payload);

      let { result, msg, err } = await res.data;

      if (result) {
        // console.log('statement reached 1');
        context.commit("setLoggedUser", result);
        context.commit("setMessage", msg);
        context.dispatch("fetchOrders");
        // console.log(result.first_name);
      } else {
        context.commit("setMessage", err);
        console.log(err);
      }
    },

    async signUp(context, payload) {
      let res = await axios.post(`${URL}register`, payload);
      let { result, msg, err } = await res.data;
      if (result) {
        context.commit("setUser", result);
        context.commit("setMessage", msg);
      } else {
        context.commit("setMessage", err);
      }
    },

    async addPerfume(context, payload) {
      let res = await axios.post(`${URL}perfumes`, payload);
      let { result, msg, err } = await res.data;
      if (result) {
        context.dispatch("fetchPerfumes");
        context.commit("setPerfume", result);
        context.commit("setMessage", msg);
      } else {
        context.commit("setMessage", err);
      }
    },

    // async login(context, info){
    //   try {
    //     let res = await fetch(`${URL}login`, {
    //       method: 'POST',
    //       body: info
    //     });
    //     let data = await res.json();
    //     context.commit('setLoggedUser', data.results)
    //   }
    //   catch(err){
    //     console.log(err);
    //   }
    // },

    // fetch vehicles
    async fetchPerfumes(context) {
      try {
        let res = await fetch(URL + "perfumes");
        let data = await res.json();
        console.log(data);
        context.commit(
          "setPerfumes",
          data.results.length !== 0 ? data.results : null
        );
      } catch (e) {
        console.log(e);
      }
    },

    // delete client
    async deleteUser(context, id) {
      let res = await axios.delete(`${URL}user/${id}`);
      let { msg, err } = await res.data;
      if (msg) {
        context.dispatch("fetchUsers");
        context.commit("setMessage", msg);
      } else {
        context.commit("setMessage", err);
      }
    },

    // delete client
    async deletePerfume(context, id) {
      let res = await axios.delete(`${URL}perfume/${id}`);
      let { msg, err } = await res.data;
      if (msg) {
        context.dispatch("fetchPerfumes");
        context.commit("setMessage", msg);
      } else {
        context.commit("setMessage", err);
      }
    },

    // edit/update client
    async updateUser(context, payload) {
      let res = await axios.put(`${URL}user/${payload.user_id}`, payload);
      let { msg, err } = await res.data;
      msg
        ? context.commit("setMessage", msg)
        : context.commit("setMessage", err);
      context.dispatch("fetchUsers");
    },

    async updatePerfume(context, id, payload) {
      let res = await axios.put(`${URL}perfume/${id}`, payload);
      let { msg, err } = await res.data;
      msg
        ? context.commit("setMessage", msg)
        : context.commit("setMessage", err);
    },

    async fetchUser(context, id) {
      try {
        let res = await fetch(`${URL}user/${id}`);
        let data = await res.json();
        console.log(data);
        context.commit(
          "setUser",
          data.results.length !== 0 ? data.results : null
        );
      } catch (e) {
        console.log(e);
      }
    },

    async fetchUsers(context) {
      try {
        let res = await fetch(URL + "users");
        let data = await res.json();
        console.log(data);
        context.commit(
          "setUsers",
          data.results.length !== 0 ? data.results : null
        );
      } catch (e) {
        console.log(e);
      }
    },

    async fetchPerfume(context, id) {
      try {
        let res = await fetch(`${URL}perfume/${id}`);
        let data = await res.json();
        console.log(data);
        context.commit(
          "setPerfume",
          data.results.length !== 0 ? data.results : null
        );
      } catch (e) {
        console.log(e);
      }
    },
    sortPerfumes: (state) => {
      state.perfumes.sort((a, b) => {
        return a.price - b.price;
      });
      if (!state.asc) {
        state.perfumes.reverse();
      }
      state.asc = !state.asc;
      context.dispatch("fetchPerfumes");
    },

    async fetchOrders(context, id) {
      try {
        let res = await fetch(`${URL}orders/${id}`);
        let data = await res.json();
        console.log(data);
        context.commit(
          "setOrders",
          data.results.length !== 0 ? data.results : null
        );
        context.dispatch("calTotal", this.state.orders);
      } catch (e) {
        console.log(e);
      }
    },

    async fetchOrder(context, id) {
      let done = false;
      try {
        let res = await fetch(`${URL}order/${id}`);
        let data = await res.json();
        context.commit(
          "setOrder",
          data.results.length !== 0 ? data.results : null
        );
        done = true;
      } catch (e) {
        console.log(e);
      }
      if (done) {
        console.log(this.state.order[0].qty)
        if (this.state.order[0].qty === 1) {
          context.dispatch("cancelOrder", id);
        } else {
          context.dispatch("decreaseQty", id);
        }
      }
    },

    async createOrder(context, payload) {
      let res = await axios.post(`${URL}orders`, payload);
      let { result, msg, err } = await res.data;
      if (result) {
        context.dispatch("fetchOrders", this.state.loggedUser.user_id);
        context.commit("setMessage", msg);
        console.log(result);
      } else {
        context.commit("setMessage", err);
      }
    },
    async increaseQty(context, id) {
      let res = await axios.put(`${URL}incQty/${id}`);
      let { msg, err } = await res.data;
      if (msg) {
        context.commit("setMessage", msg);
        context.dispatch("fetchOrders", this.state.loggedUser.user_id);
        console.log(msg);
      } else {
        context.commit("setMessage", err);
      }
    },
    async decreaseQty(context, id) {
      let res = await axios.put(`${URL}decQty/${id}`);
      let { msg, err } = await res.data;
      if (msg) {
        context.commit("setMessage", msg);
        context.dispatch("fetchOrders", this.state.loggedUser.user_id);
      } else {
        context.commit("setMessage", err);
      }
    },
    calTotal(context, arr) {
      let i = 0;
      let sum = 0;
      while (i < arr.length) {
        sum += parseFloat(parseFloat(arr[i].price) * parseFloat(arr[i].qty));
        i++;
      }
      console.log(sum);
      context.commit("setTotal", sum.toFixed(10, 2));
      console.log("Total calculated");
    },

    async cancelOrder(context, id) {
      let res = await axios.delete(`${URL}order/${id}`);
      let { msg, err } = await res.data;
      if (msg) {
        context.dispatch("fetchOrders", this.state.loggedUser.user_id);
        context.commit("setMessage", msg);
      } else {
        context.commit("setMessage", err);
      }
    },
  },
});
