<template>
  <div>
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit Task</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Task:</label>
                <input
                  v-model="title"
                  type="text"
                  class="form-control"
                  id="recipient-name"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              @click="updateTodo"
              data-dismiss="modal"
              class="btn btn-info"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { http } from '../services/httpClient';
export default {
  name: 'Dialog',
  computed: {
    title: {
      get: function() {
        return this.$store.state.updateTodo
          ? this.$store.state.updateTodo.title
          : '';
      },
      set: function(val) {
        this.$store.state.updateTodo.title = val;
      }
    }
  },
  methods: {
    async updateTodo() {
        const todo = this.$store.state.updateTodo
      await http.put(`update-todo?id=${todo._id.$oid}`, {
        ...todo,
        title: this.title
      });
    }
  }
};
</script>

<style scoped></style>
