<template>
  <div>
    <div v-if="!isAuth" class="forms">
      <form>
        <div class="form-group">
          <label for="email">Email address</label>
          <input
            v-model="username"
            type="email"
            class="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            id="password"
            placeholder="Password"
          />
        </div>

        <button @click="login" type="button" class="btn btn-info">
          Login
        </button>
      </form>
      <form>
        <div class="form-group">
          <label for="regUsername">Email address</label>
          <input
            v-model="regUsername"
            type="email"
            class="form-control"
            id="regUsername"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>

        <div class="form-group">
          <label for="regPassword">Password</label>
          <input
            v-model="regPassword"
            type="password"
            class="form-control"
            id="regPassword"
            placeholder="Password"
          />
        </div>

        <button @click="register" type="button" class="btn btn-info">
          Register
        </button>
      </form>
    </div>
    <div v-else>
      <button @click="logout" type="button" class="btn btn-info">
        Logout
      </button>
    </div>
  </div>
</template>

<script>
import {
  loginUserPasswordCredential,
  logoutCurrentUser,
  registerUser
} from '../services/stitchAuth';
export default {
  name: 'Auth',
  data() {
    return {
      username: null,
      password: null,
      regUsername: null,
      regPassword: null
    };
  },
  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    }
  },
  methods: {
    async login() {
      try {
        await loginUserPasswordCredential({
          username: this.username,
          password: this.password
        });
      } catch (err) {
        console.error(err);
      }
      this.$store.commit('setAuth', !this.isAuth);
      this.username = '';
      this.password = '';
    },
    async logout() {
      await logoutCurrentUser();
      this.$store.commit('setAuth', !this.isAuth);
    },
    async register() {
      try {
        await registerUser({
          username: this.regUsername,
          password: this.regPassword
        });
      } catch (err) {
        console.error(err);
      }

      this.regUsername = '';
      this.regPassword = '';
    }
  }
};
</script>

<style scoped>
.forms {
  display: flex;
  justify-content: space-around;
}
</style>
