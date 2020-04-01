<template>
  <div class="content">
    <div class="addTask">
      <input
        v-model="todoTitle"
        type="input"
        class="form__field"
        placeholder="Type here..."
        required
      />
      <button @click="addTodo" type="button" class="btn btn-info">
        <span class="material-icons">add</span>
        <span>Add Task</span>
      </button>
    </div>
  </div>
</template>

<script>
import { http } from '../services/httpClient';
export default {
  name: 'AddTodo',
  data() {
    return {
      todoTitle: null
    };
  },
  computed: {
    todos() {
      return this.$store.state.todos;
    }
  },
  methods: {
    async addTodo() {
      if (!this.todoTitle) {
        return;
      }
      try {
        const todo = {
          title: this.todoTitle,
          id: this.todos.length,
          userId: 1,
          completed: false
        };
        const { data } = await http.post('post-todo', todo);
        this.$emit('onNewTodo', { ...todo, _id: { $oid: data.insertedId } });
      } catch (err) {
        // console.error(err);
      }

      this.todoTitle = '';
    }
  }
};
</script>

<style lang="scss" scoped>
.form__field {
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid #d7d7d7;
  outline: 0;
  font-size: 1.3rem;
  color: #94c7bb;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;

  &::placeholder {
    color: #94c7bb;
  }

  &:placeholder-shown ~ .form__label {
    font-size: 1.3rem;
    cursor: text;
    top: 20px;
  }
}

button {
  margin: 15px;
}
.content {
  width: 639px;
  margin: 0 auto;
}
.addTask {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
