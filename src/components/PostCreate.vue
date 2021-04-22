<template>
  <div>
    <button class="add-post" @click="toggleView()">Add Post</button>
    <div class="modal" v-if="showAddPost">
      <div class="modal-content">
        <span @click="showAddPost = false" class="close">&times;</span>
        <h3>Add New Post</h3>
        <hr />
        <form>
          <label class="label">UserName:</label><br>
          <input
            type="text"
            id="userName"
            v-model="postDetails.userName"
            autoComplete="off"
            class="input-box"
          />
          <br>
          <label class="label">Title:</label><br>
          <input
            type="text"
            v-model="postDetails.title"
            id="title"
            autoComplete="off"
            class="input-box"
          />
          <br>
          <label class="label">Description:</label><br>
          <input
            type="text"
            v-model="postDetails.body"
            id="body"
            autoComplete="off"
            class="description-box"
          />
          <br>
          <button class="submit-btn" @click.prevent="createPost()" type="submit">Add Post</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PostCreate',
  props: ['postData', 'fetchPosts'],
  data: function () {
    return {
      showAddPost: false,
      postDetails: this.postData,
    }
  },
  methods: {
    toggleView () {
      this.showAddPost = true
    },
    createPost () {
      axios.post('http://localhost:3002/posts/', this.postDetails)
        .then(() => {
          this.fetchPosts()
          this.postDetails.id = ''
          this.postDetails.userName = ''
          this.postDetails.title = ''
          this.postDetails.body = ''
          this.showAddPost = false
        })
    },
  }
}
</script>

<style scoped>
.add-post {
  color: white;
  font-size: 1rem;
  float: right;
  cursor: pointer;
  border: none;
  background: blue;
  padding: 13px 20px;
  font-weight: 800;
  line-height: 1em;
  border-radius: 0.4rem;
}

.add-post:hover {
  background: #0078F5;
}
</style>