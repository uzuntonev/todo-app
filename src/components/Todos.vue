<template>
  <div v-if="!todos">Loading...</div>
  <div v-else class="wrapper">
    <div class="card" v-for="(todo, i) in todos" :key="i">
      <i class="fas fa-ellipsis-v move-icon"></i>
      <div class="list-content">
        <div class="description">
          <div class="checkList">
            <input
              @change="isChecked(todo)"
              v-model="todo.completed"
              type="checkbox"
              :id="`list0${i + 1}`"
              class="checkbox"
            />
            <label class="checkLabel" :for="`list0${i + 1}`">{{
              todo.title
            }}</label>
          </div>
        </div>
        <div class="features">
          <a
            class="edit"
            data-toggle="modal"
            data-target="#exampleModal"
            data-whatever="@mdo"
            @click="editTodo(todo)"
            title="delete"
          >
            <span class="material-icons">create</span>
          </a>
          <a class="delete" @click="deleteTodo(todo)" title="edit">
            <span class="material-icons">delete</span></a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { http } from '../services/httpClient';
export default {
  name: 'Todos',
  computed: {
    todos() {
      return this.$store.state.todos;
    }
  },
  methods: {
    async deleteTodo(todo) {
      if(!confirm('Are you sure ?')) { return; }
      
      try {
        await http.delete(`delete-todo?id=${todo._id.$oid}`);
        this.$store.commit('deleteTodo', todo);
      } catch (err) {
<<<<<<< HEAD
        console.error(err);
=======
        // console.error(err);
>>>>>>> todo app
      }
    },
    editTodo(todo) {
      this.$store.commit('setUpdateTodo', todo);
    },
    async isChecked(todo) {
      this.$store.commit('setUpdateTodo', todo);
      await http.put(`update-todo?id=${todo._id.$oid}`, {
        ...todo,
        completed: todo.completed
      });
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}
$mainColor: rgb(19, 132, 150);
$light-mainColor: rgb(19, 150, 150);
$white: #ffffff;
$gray: #d7d7d7;
$light-gray: #f0f0f0;
$dark-gray: #9b9b9b;

$mg-m: 20px;
$mg-s: 8px;

@mixin nor-card {
  padding: 20px;
  background-color: $white;
  border: 1px solid $gray;
  border-radius: 4px;
  position: relative;
  margin-bottom: $mg-s;
  .move-icon {
    position: absolute;
    color: $gray;
    height: 12px;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    padding: 8px;
    transition: 0.3s;
    &:hover {
      color: $light-mainColor;
      cursor: move;
    }
  }
}

.wrapper {
  width: 639px;
  margin: 0 auto;
  font-size: 14px;
  background-color: $light-gray;
}

.card {
  @include nor-card;
}
.highlight-card {
  border-color: $mainColor;
  background-color: #e2f5f0;
}
.finished-card {
  background-color: #ebebeb;
}

.list-content {
  display: flex;
  justify-content: space-between;
}
.checkList {
  margin-bottom: $mg-s;
  .checkbox {
    display: none;
    &:checked + .checkLabel {
      color: $dark-gray;
      text-decoration: line-through;
      &::before {
        content: '✔ \fe01';
        display: inline-block;
        border: 1px solid $mainColor;
        background-color: $mainColor;
        color: $white;
        text-align: center;
        line-height: 18px;
        width: 18px;
        height: 18px;
        border-radius: 4px;
        margin-right: $mg-s;
        vertical-align: middle;
      }
    }
  }
  .checkLabel {
    font-size: 16px;
    &::before {
      content: ' ';
      display: inline-block;
      border: 1px solid $gray;
      background-color: $white;
      width: 18px;
      height: 18px;
      border-radius: 4px;
      margin-right: $mg-s;
      vertical-align: middle;
    }
  }
}

.features {
  font-size: 16px;
  .edit {
    cursor: pointer;
    color: $dark-gray;
    transition: 0.3s;
    &:hover {
      color: $light-mainColor;
    }
  }
  .delete {
    cursor: pointer;
    color: $dark-gray;
    transition: 0.3s;
    &:hover {
      color: red;
    }
  }
}
</style>
