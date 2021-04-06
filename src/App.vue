<template lang="html">
  <div id="app">
    <h1>NewsFeed</h1>
    <button @click="togglePanel()">Add Post</button>
    <hr />
    <h1 v-for="(post) in posts" :key="post.id">
      <p>{{post.userName}}</p>
      {{post.title}}<br>
      {{post.body}}<br>
      <button @click="getPostData(post)">Edit</button> |
      <button @click="deletePostData(post)">Delete</button>
      <hr />
    </h1>
    <div class="modal" v-if="showAddPost">
      <div class="modal-content">
        <span @click="showAddPost = false" class="close">&times;</span>
        <h3>Add New Post</h3>
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
          <button @click.prevent="createPost()" type="submit">Submit</button>
        </form>
      </div>
    </div>
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
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      posts: [],
      postData: {
        id: "",
        userName: "",
        title: "",
        body: ""
      },
      showAddPost: false,
      updateSubmit: false
    }
  },

  methods: {
    togglePanel () {
      this.showAddPost = true
    },
    updatePanel () {
      this.updateSubmit = true
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
            this.updateSubmit = false
        })
      },
    fetchPosts () {
      axios.get('http://localhost:3001/posts/')
        .then(response => {
          this.posts = response.data.reverse()
        })
    },
    createPost () {
      axios.post('http://localhost:3001/posts/', this.postData)
        .then(() => {
          this.fetchPosts()
          this.postData.id = ''
          this.postData.userName = ''
          this.postData.title = ''
          this.postData.body = ''
          this.showAddPost = false
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
          this.updateSubmit = false
        })
    },
    deletePostData (post) {
      axios.delete(`http://localhost:3001/posts/${post.id}`)
        .then(() => {
          this.fetchPosts()
          this.postData.id = ''
          this.postData.userName = ''
          this.postData.title = ''
          this.postData.body = ''
        })
    }
  },

  mounted: function () {
    this.fetchPosts()
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

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
