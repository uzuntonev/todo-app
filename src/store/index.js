import Vue from 'vue';
import Vuex from 'vuex';
import { hasLoggedInUser } from '../services/stitchAuth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuth: hasLoggedInUser(),
    todos: [],
    updateTodo: null
  },
  getters: {
    isAuth(state) {
      return state.isAuth;
    }
  },
  mutations: {
    getAllTodos(state, todos) {
      state.todos = todos;
    },
    addTodo(state, todo) {
      state.todos = state.todos.concat(todo);
    },
    deleteTodo(state, todo) {
      state.todos = state.todos.filter(t => t._id !== todo._id);
    },
    setUpdateTodo(state, todo) {
      state.updateTodo = todo;
    },
    setAuth(state, payload) {
      state.isAuth = payload;
    }
  },
  actions: {},
  modules: {}
});
