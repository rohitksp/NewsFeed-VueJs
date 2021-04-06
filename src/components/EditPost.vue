<template>
  <div class="modal" v-if="updateSubmit">
    <div class="modal-content">
      <span @click="closePanel(postData)" class="close">&times;</span>
      <h3>Edit the Post</h3>
      <hr />
      <form>
        <label>UserName</label><br>
        <input
          type="text"
          v-model="postData.userName"
          required
          >
        <br>
        <label>Title</label><br>
        <input
          type="text"
          v-model="postData.title"
          id="title"
          required
        >
        <br>
        <label>Description</label><br>
        <input
          type="text"
          v-model="postData.body"
          id="body"
          required
        >
        <br>
        <button @click.prevent="updateData(postData)" type="submit">Update</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['fetchPosts', 'updateSubmit', 'postData', 'updatePanel'],
  data () {
    return {}
  },
  methods: {
    updatedSubmit () {
      this.$emit('updateSubmit', false)
    },
    closePanel (postData) {
    axios.put(`http://localhost:3001/posts/${postData.id}`, {
      userName: this.postData.userName,
      title: this.postData.title,
      body: this.postData.body
    })
      .then(() => {
        this.fetchPosts()
        this.postData.id = ''
        this.postData.userName = ''
        this.postData.title = ''
        this.postData.body = ''
        this.updatedSubmit()
      })
    },
    getPostData (post) {
      this.updatePanel()
      this.postData.userName = post.userName
      this.postData.title = post.title
      this.postData.body = post.body
      this.postData.id = post.id
    },
    updateData (postData) {
      axios.put(`http://localhost:3001/posts/${postData.id}`, {
        userName: this.postData.userName,
        title: this.postData.title,
        body: this.postData.body
      })
       .then(() => {
          this.fetchPosts()
          this.postData.id = ''
          this.postData.userName = ''
          this.postData.title = ''
          this.postData.body = ''
          this.updatedSubmit()
        })
    }
  }
}
</script>

<style scoped>
.modal-content {
  background-color: #fefefe;
  margin: 3% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 35%;
}

.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.modal {
  position: fixed;
  top: 2px;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.6);
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>