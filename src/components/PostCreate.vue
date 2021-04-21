<template>
  <div>
    <button :style="{marginTop: '18px'}" class="add-post" @click="toggleView()">Add Post</button>

    <div class="modal" v-if="createPostModal">
      <div class="modal-content">
        <span @click="createPostModal = false" class="close">&times;</span>
        <h3>Add New Post</h3>
        <hr />
        <form>
          <label class="label">UserName:</label><br>
          <input
            type="text"
            id="userName"
            v-model="postDetail.userName"
            autoComplete="off"
            class="input-box"
            >
          <br>
          <label class="label">Title:</label><br>
          <input
            type="text"
            v-model="postDetail.title"
            id="title"
            autoComplete="off"
            class="input-box"
          >
          <br>
          <label class="label">Description:</label><br>
          <input
            type="text"
            v-model="postDetail.body"
            id="body"
            autoComplete="off"
            class="description-box"
          >
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
  props: ['showAddPost', 'postData', 'fetchPosts'],
  data: function () {
    return {
      createPostModal: this.showAddPost,
      postDetail: this.postData,
    }
  },
  methods: {
    toggleView () {
      this.createPostModal = true
    },
    createPost () {
      axios.post('http://localhost:3002/posts/', this.postDetail)
        .then(() => {
          this.fetchPosts()
          this.postDetail.id = ''
          this.postDetail.userName = ''
          this.postDetail.title = ''
          this.postDetail.body = ''
          this.createPostModal = false
        })
    },
  }
}
</script>