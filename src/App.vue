<template>
  <div id="app">
    <app-dialog></app-dialog>
    <app-auth></app-auth>
    <div v-if="isAuth">
      <app-add-todo @onNewTodo="$store.commit('addTodo', $event)">
      </app-add-todo>
      <app-todos></app-todos>
    </div>
  </div>
</template>

<script>
import AppTodos from './components/Todos.vue';
import AppAddTodo from './components/AddTodo.vue';
import AppAuth from './components/Auth.vue';
import AppDialog from './components/Dialog.vue';
import { http } from './services/httpClient';

export default {
  name: 'App',
  components: {
    AppTodos,
    AppAddTodo,
    AppAuth,
    AppDialog
  },
  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    },
  },
  async created() {
    const { data: todos } = await http.get(`todos`);
    this.$store.commit('getAllTodos', todos);
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
