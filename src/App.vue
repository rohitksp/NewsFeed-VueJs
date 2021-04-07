<template lang="html">
  <div id="app">
    <h1>NewsFeed</h1>
    <button @click="togglePanel()">Add Post</button>
    <hr />
    <div v-for="(post) in posts" :key="post.id">
      <h1>{{post.userName}}</h1>
      <h2>{{post.title}}</h2>
      <h3>{{post.body}}</h3>
      <button @click="getPostData(post)">Edit</button> |
      <button @click="toggleDeletePanel(post)">Delete</button> |
      <button @click="toggleViewPanel(post)">View</button>
      <hr />
    </div>
    <div class="modal" v-if="showAddPost">
      <div class="modal-content">
        <span @click="showAddPost = false" class="close">&times;</span>
        <h3>Add New Post</h3>
        <hr />
        <form>
          <label>UserName</label><br>
          <input
            type="text"
            id="userName"
            v-model="postData.userName"
            autoComplete="off"
            >
          <br>
          <label>Title</label><br>
          <input
            type="text"
            v-model="postData.title"
            id="title"
            autoComplete="off"
          >
          <br>
          <label>Description</label><br>
          <input
            type="text"
            v-model="postData.body"
            id="body"
            autoComplete="off"
          >
          <br>
          <button @click.prevent="createPost()" type="submit">Submit</button>
        </form>
      </div>
    </div>
    <div class="modal" v-if="showEditPost">
      <div class="modal-content">
        <span @click="editClosePanel(postData)" class="close">&times;</span>
        <h3>Edit the Post</h3>
        <hr />
        <form>
          <label>UserName</label><br>
          <input
            type="text"
            v-model="postData.userName"
            id="userName"
            >
          <br>
          <label>Title</label><br>
          <input
            type="text"
            v-model="postData.title"
            id="title"
          >
          <br>
          <label>Description</label><br>
          <input
            type="text"
            v-model="postData.body"
            id="body"
          >
          <br>
          <button @click.prevent="updatePost(postData)" type="submit">Update</button>
        </form>
      </div>
    </div>
    <div class="modal" v-if="showDeletePost">
      <div class="modal-content">
        <span @click="showDeletePost = false" class="close">&times;</span>
        <h3>Delete the post</h3>
        <hr />
        <h1>Are you sure you want to delete the post?</h1>
        <button @click.prevent="deletePost(postData)" type="submit">Yes</button> |
        <button @click="showDeletePost = false" type="submit">No</button>
      </div>
    </div>
    <div class="modal" v-if="showViewPost">
      <div class="modal-content">
        <span @click="viewClosePanel()" class="close">&times;</span>
        <h3>View Post</h3>
        <hr />
        <h1>{{this.postData.userName}}</h1>
        <h2>{{this.postData.title}}</h2>
        <h3>{{this.postData.body}}</h3>
        <div v-for="comment in comments" :key="comment.id">
          <h2>
            {{comment.author}}<br>
            {{comment.message}}
          </h2>
        </div>
        <label>Author</label><br>
        <input
          type="text"
          id="name"
          v-model="commentData.author"
          autoComplete="off"
        ><br>
        <label>Comment</label><br>
        <input
          type="text"
          id="comment"
          v-model="commentData.message"
          autoComplete="off"
        ><br>
        <button @click.prevent="submitComment()" type="submit">Comment</button>
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
      comments: [],
      postData: {
        id: "",
        userName: "",
        title: "",
        body: ""
      },
      commentData: {
        cId: '',
        author: '',
        message: ''
      },
      showAddPost: false,
      showEditPost: false,
      showDeletePost: false,
      showViewPost: false
    }
  },

  methods: {
    fetchPosts () {
      axios.get('http://localhost:3001/posts/')
        .then(response => {
          this.posts = response.data.reverse()
        })
    },
    fetchComments () {
      axios.get(`http://localhost:3001/comments?cId=${this.postData.id}`)
        .then(response => {
          this.comments = response.data.reverse()
        })
    },
    togglePanel () {
      this.showAddPost = true
    },
    toggleEditPanel () {
      this.showEditPost = true
    },
    toggleDeletePanel (post) {
      this.showDeletePost = true
      this.postData.id = post.id
    },
    toggleViewPanel (post) {
      this.showViewPost = true
      this.postData.id = post.id
      this.commentData.cId = post.id
      this.fetchComments()
      this.postData.userName = post.userName
      this.postData.title = post.title
      this.postData.body = post.body
    },
    editClosePanel (postData) {
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
          this.showEditPost = false
        })
    },
    viewClosePanel () {
      this.showViewPost = false
      this.postData.id = ''
      this.postData.userName = ''
      this.postData.title = ''
      this.postData.body = ''
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
      this.toggleEditPanel()
      this.postData.userName = post.userName
      this.postData.title = post.title
      this.postData.body = post.body
      this.postData.id = post.id
    },
    updatePost (postData) {
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
          this.showEditPost = false
        })
    },
    deletePost (postData){
      axios.delete(`http://localhost:3001/posts/${postData.id}`)
        .then(() => {
          this.fetchPosts()
          this.postData.id = ''
          this.postData.userName = ''
          this.postData.title = ''
          this.postData.body = ''
          this.showDeletePost = false
        })
    },
    submitComment () {
      axios.post('http://localhost:3001/comments/', this.commentData)
        .then(() => {
          this.fetchComments()
          this.commentData.cId = this.postData.id
          this.commentData.author = ''
          this.commentData.message = ''
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

.borderStyle {
  width: 60%;
  height: 30px;
  border: 3px solid green;
  padding: 20px;
  margin: 10px
}

.modal-content {
  background-color: #fefefe;
  margin: 1% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 60%;
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
