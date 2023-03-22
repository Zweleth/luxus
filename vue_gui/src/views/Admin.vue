<template lang="">
  <div class="admin">
    <div class="left">
      <button class="btn_data" @click="changeData">{{toggleData ? 'Users' : 'Perfumes'}}</button>
      <div class="images">
        <div class="image" v-if="this.toggleData === true" v-for="perfume in perfumes" :key="perfume">
          <div
            class="img"
            :style="{ backgroundImage: `url(${perfume.image_url})` }"
          ></div>
        </div>
        <div class="image" v-if="this.toggleData === false" v-for="user in users" :key="user">
          <div
            class="img"
            :style="{ backgroundImage: `url(${user.image_url})` }"
          ></div>
        </div>
      </div>
    </div>
    <div class="right">
      <button class="btn_sort" @click="sort()"><i class="fa-solid fa-arrow-down-a-z"></i></button>
      <div class="perfs">
        <div class="perf" v-if="this.toggleData === true" v-for="perfume in perfumes" :key="perfume">
          <div class="name_price">
            <h5>{{ perfume.perfume_name }}</h5>
            <h6>R {{ perfume.price }}</h6>
          </div>
          <div class="gender">
            <h5>{{ perfume.gender }}</h5>
          </div>
          <div class="description">
            <p>{{ perfume.description }}</p>
          </div>
          <div class="buttons perf_buttons">
            <button @click="fetchPerfume(perfume.perfume_id)">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button @click="delPerf(perfume.perfume_id)">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
        <div class="perf" v-if="this.toggleData === false" v-for="user in users" :key="users">
          <div class="name_price users_names">
            <h5>{{ user.first_name }}  {{user.last_name}}</h5>
            <h6>{{ user.gender }}</h6>
          </div>
          <div class="gender">
            <h5>{{ user.user_role === 'admin' ? 'Admin' : 'Client' }}</h5>
          </div>
          <div class="description user_desc">
            <p><span style="font-size: medium;">{{ user.email }}</span> <br> {{user.phone_number}}</p>
          </div>
          <div class="buttons ">
            <button class="btn_role" @click="edtRole(user.user_id, user.user_role)">
              <p>{{ user.user_role === 'admin' ? 'Make client' : 'Make admin' }}</p>
            </button>
            <button class="btn_del" @click="delUser(user.user_id)">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
      <button class="add_perf" @click="showAdd()">Add new perfume</button>
    </div>
    <div class="edit_screen" v-if="perfume !== null">
      <div class="edit_modal" v-for="perfume in perfume" :key="perfume">
        <form @submit.prevent="updatePerf(perfume.perfume_id, perfume)">
          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              id="floatingText"
              placeholder="name@example.com"
              required
              v-model="perfume.perfume_name"
            />
            <label for="floatingNumber">First name</label>
          </div>
          <div class="form-floating">
            <input
              type="number"
              class="form-control"
              id="floatingNumber"
              placeholder="name@example.com"
              required
              v-model="perfume.price"
            />
            <label for="floatingText">Price</label>
          </div>
          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              id="floatingText"
              placeholder="name@example.com"
              required
              v-model="perfume.gender"
            />
            <label for="floatingText">Gender</label>
          </div>
          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              id="floatingText"
              placeholder="name@example.com"
              required
              v-model="perfume.description"
            />
            <label for="floatingText">Description</label>
          </div>
          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              id="floatingText"
              placeholder="name@example.com"
              required
              v-model="perfume.image_url"
            />
            <label for="floatingText">Image link</label>
          </div>
          <div class="form-buttons">
            <button @click="fetchPerfume()">Cancel</button>
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>
    <div class="add_screen">
      <div class="add_modal">
        <form @submit.prevent="addPerf(this.newPerfume); hideAdd()">
          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              id="floatingText"
              placeholder="name@example.com"
              required
              v-model="this.newPerfume.perfume_name"
            />
            <label for="floatingNumber">First name</label>
          </div>
          <div class="form-floating">
            <input
              type="number"
              class="form-control"
              id="floatingNumber"
              placeholder="name@example.com"
              required
              v-model="this.newPerfume.price"
            />
            <label for="floatingText">Price</label>
          </div>
          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              id="floatingText"
              placeholder="name@example.com"
              required
              v-model="this.newPerfume.gender"
            />
            <label for="floatingText">Gender</label>
          </div>
          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              id="floatingText"
              placeholder="name@example.com"
              required
              v-model="this.newPerfume.description"
            />
            <label for="floatingText">Description</label>
          </div>
          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              id="floatingText"
              placeholder="name@example.com"
              required
              v-model="this.newPerfume.image_url"
            />
            <label for="floatingText">Image link</label>
          </div>
          <div class="form-buttons">
            <button @click="hideAdd()">Cancel</button>
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters(["perfumes", "perfume", "users", "user", "loggedUser"]),
  },
  methods: {
    ...mapActions(["fetchPerfumes", "fetchPerfume", "fetchUsers", "fetchUser"]),
    ...mapMutations(["setPerfumes", "setUsers"]),

    showEdit() {
      document.querySelector(".edit_screen").id = "showModal";
      console.log(this.updatingUser);
    },
    sort() {
      this.$store.commit('sortPerfumes');
      this.fetchPerfumes;
    },
    delPerf(id) {
      this.$store.dispatch("deletePerfume", id);
      this.fetchPerfumes();
    },
    delUser(id) {
      this.$store.dispatch("deleteUser", id);
      this.$store.state.loggedUser= null;
      this.fetchUsers();
    },
    updatePerf(id, payload) {
      this.$store.dispatch("updatePerfume", id, payload);
    },
    addPerf(payload) {
        this.$store.dispatch("addPerfume", payload);
        this.fetchPerfumes();
    },
    showAdd() {
      document.querySelector(".add_screen").id = "showModal";
    },
    hideAdd() {
      document.querySelector(".add_screen").id = "hideModal";
    },
    changeData() {
      this.toggleData= !this.toggleData;
    },
    edtRole(id, role) {
      let newRole = null
      if (role === 'admin') {
        newRole = 'client'
      }
      else {
        newRole = 'admin'
      }
      this.updateRole.user_role = newRole
      this.$store.dispatch("updateUser", id, this.updateRole);

    }

  },
  data() {
    return {
        newPerfume: {
            perfume_name: null,
            price: 1,
            gender: null,
            description: null,
            image_url: null 
        },
        toggleData: true
        ,
        updateRole: {
          user_role: null
        }

    }
  },

  created() {
    this.fetchPerfumes();
    this.fetchPerfume();
    this.fetchUsers();
    this.fetchUser();
  },
};
</script>
<style scoped>
.admin {
  width: 100vw;
  height: 100vh;
  display: flex;
  position: relative;
}

.right {
  width: 70vw;
  height: 100vh;
  background-color: var(--tone-one);
  display: grid;
  place-items: center;
  position: relative;
  padding: 5rem 0 5rem 0;
}

.left {
  width: 30vw;
  height: 100vh;
  background-color: var(--tone-three);
  display: grid;
  place-items: center;
  position: relative;
  padding: 5rem 0 5rem 0;
}

.name_price {
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-left: 0.3rem;
  width: 14rem;
  color: var(--tone-five);
}
.gender {
  display: flex;
  place-items: center;
  width: 5rem;
  color: var(--tone-five);
}

.add_perf {
  margin-top: 1.5rem;
  margin-right: 40%;
  background: none;
  border: none;
  border: 0.1rem solid;
  width: fit-content;
  height: 2rem;
  border-radius: 0.22rem;
  color: var(--tone-four);
  padding: 0 0.5rem 0 0.5rem;
}
.description {
  width: 25rem;
  display: flex;
  place-items: center;
  color: var(--tone-five);
}
.buttons {
  display: flex;
  place-items: center;
  gap: 2rem;
  width: 12rem;
  padding-left: 1rem;
}

.btn_del, .perf_buttons button {
  background: none;
  border: none;
}
.buttons i {
  color: var(--tone-five);
  scale: 1.1;
}
.description p {
  font-size: small;
  line-height: 1;

  text-align: left;
}
.image {
  height: 3rem;
  width: 4.5rem;
  display: grid;
  place-items: center;
  background-color: var(--tone-one);
  border-radius: 0.5rem 0 0 0.5rem;
}

.img {
  height: 100%;
  width: 80%;
  background-position: center;
  background-size: cover;
}
.images {
  margin-left: auto;
  height: 80vh;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.perfs {
  margin-right: auto;
  height: 80vh;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.perf {
  height: 3rem;
  width: 50rem;
  background-color: var(--tone-three);
  border-radius: 0 0.5rem 0.5rem 0;
  display: flex;
  gap: 1rem;
}
#showModal {
    display: grid;
  }
  #hideModal {
    display: none;
  }


.edit_screen, .add_screen {
  width: 100vw;
  height: 100vh;
  position: absolute;
  display: grid;
  place-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}
.add_screen {
    display: none;
}
.edit_modal, .add_modal {
  margin: 0 4rem 0 4rem;
  width: 28rem;
  height: 30rem;
  padding: 0.6rem;
  background-color: var(--tone-one);
  border-radius: 1rem;
  color: var(--tone-four);
}

form {
  display: flex;
  flex-direction: column;
}
.form-floating {
  margin-top: 1rem;
}

.form-floating input,
input:focus,
input:active {
  background: none;
  border: none;
  border-radius: 0;
  border-bottom: 0.15rem solid var(--tone-four);
  outline: none;
  box-shadow: none;
}
.form-buttons {
  display: flex;
  margin-top: 1rem;
  gap: 0.6rem;
  justify-content: center;
  align-items: center;
  width: fit-content;
  margin-left: auto;
}

.form-buttons button {
  background: none;
  height: 2.2rem;
  width: 5.5rem;
  border: none;
  border: 0.14rem solid var(--tone-four);
  border-radius: 0.3rem;
  color: var(--tone-four);
}
.btn_data {
  background: none;
  max-height: 2.2rem;
  width: 5.5rem;
  border: none;
  border: 0.14rem solid var(--tone-four);
  border-radius: 0.3rem;
  color: var(--tone-four);
  position: absolute;
}
.users_names {
  width: 15rem
}
.user_desc {
  width: 14rem;
}
.btn_role {
  background: none;
  height: 2.2rem;
  width: 7rem;
  border: none;
  border: 0.14rem solid var(--tone-five);
  border-radius: 0.3rem;
  color: var(--tone-five);
  
}

.btn_sort {
  position: absolute;
  right: 2rem;
  top:4rem;
  background: none;
  border: none;
  scale: 1.2;
  color: var(--tone-four)
}

</style>
