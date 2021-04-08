<template lang="html">
  <div id="app">
    <h1>
      NewsFeed
      <button class="add-post" @click="togglePanel()">Add Post</button>
    </h1>
    <hr />
    <div class="list" v-for="(post) in posts" :key="post.id">
      <h3>
        {{post.userName}}
        <button class="button" :style="{background: '#dc3545'}" @click="toggleDeletePanel(post)">Delete</button>
        <button class="button" :style="{background: 'rgb(9 168 199)'}" @click="getPostData(post)">Edit</button>
        <button class="button" :style="{background: '#198754'}" @click="toggleViewPanel(post)">View</button>
      </h3>
      <h4>{{post.title}}</h4>
      <p>{{post.body}}</p>
    </div>
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
            v-model="postData.userName"
            autoComplete="off"
            class="input-box"
            >
          <br>
          <label class="label">Title:</label><br>
          <input
            type="text"
            v-model="postData.title"
            id="title"
            autoComplete="off"
            class="input-box"
          >
          <br>
          <label class="label">Description:</label><br>
          <input
            type="text"
            v-model="postData.body"
            id="body"
            autoComplete="off"
            class="description-box"
          >
          <br>
          <button class="submit-btn" @click.prevent="createPost()" type="submit">Add Post</button>
        </form>
      </div>
    </div>
    <div class="modal" v-if="showEditPost">
      <div class="modal-content">
        <span @click="editClosePanel(postData)" class="close">&times;</span>
        <h3>Edit the Post</h3>
        <hr />
        <form>
          <label class="label" >UserName</label><br>
          <input
            type="text"
            v-model="postData.userName"
            id="userName"
            class="input-box"
            >
          <br>
          <label class="label" >Title</label><br>
          <input
            type="text"
            v-model="postData.title"
            id="title"
            class="input-box"
          >
          <br>
          <label class="label" >Description</label><br>
          <input
            type="text"
            v-model="postData.body"
            id="body"
            class="input-box"
          >
          <br>
          <button class="update-btn" @click.prevent="updatePost(postData)" type="submit">Update</button>
        </form>
      </div>
    </div>
    <div class="modal" v-if="showDeletePost">
      <div class="modal-content">
        <span @click="showDeletePost = false" class="close">&times;</span>
        <h3>Delete the post</h3>
        <hr />
        <p :style="{margin: '20px 0 10px 0'}">Are you sure you want to delete the post?</p>
        <button class="submit-btn" :style="{background: '#dc3545'}"
         @click.prevent="deletePost(postData)" type="submit">
         Yes
        </button>
        <button class="submit-btn"
         @click="showDeletePost = false" type="submit">
         No
        </button> 
      </div>
    </div>
    <div class="modal" v-if="showViewPost">
      <div class="modal-content">
        <span @click="viewClosePanel()" class="close">&times;</span>
        <h3>View Post</h3>
        <hr />
        <div class="list">
          <h3>{{this.postData.userName}}</h3>
          <h4>{{this.postData.title}}</h4>
          <p>{{this.postData.body}}</p>
        </div>
        <div 
          :style="{padding: '5px 0 5px 7px', display: 'flex', background: 'white', margin: '5px'}" 
          v-for="comment in comments" :key="comment.id">
          <img 
            :src="`https://joeschmoe.io/api/v1/${comment.author}`"
            :style="{margin: '8px 5px 0 0', background: 'lightblue', borderRadius: '0.4rem'}" 
          width="40px" height="40px" alt={comment.author}/>
          <div>
            <h3>{{comment.author}}</h3>
            <p>{{comment.message}}</p>
          </div>
        </div>
        <label class="label" >Author</label><br>
        <input
          type="text"
          id="name"
          v-model="commentData.author"
          autoComplete="off"
          class="input-box"
        ><br>
        <label class="label" >Comment</label><br>
        <input
          type="text"
          id="comment"
          v-model="commentData.message"
          autoComplete="off"
          class="input-box"
        ><br>
        <button class="submit-btn" @click.prevent="submitComment()" type="submit">Comment</button>
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
      this.commentData.cId = post.id
      this.postData.id = post.id
      this.postData.userName = post.userName
      this.postData.title = post.title
      this.postData.body = post.body
      this.fetchComments()
      this.showViewPost = true
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
  color: #2c3e50;
  margin: auto 5%;
  padding: 1%;
  border-radius: 1%;
  background-color: #f6f6f6;
}

.input-box {
    width: 95%;
    padding: 0.3rem 0.6rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .3rem;
    margin-bottom: 5px;
}

.label {
  font-size: inherit;
  line-height: 1.5;
}

.description-box {
  width: 95%;
  padding: 0.3rem 0.6rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: .3rem;
}

.button {
  color: white;
  font-size: 0.9rem;
  float: right;
  cursor: pointer;
  border: none;
  background: blue;
  padding: 10px 15px;
  font-weight: 700;
  line-height: 1em;
  margin-right: 5px;
  border-radius: 0.4rem;
}

.submit-btn {
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  border: none;
  background: blue;
  padding: 10px 15px;
  font-weight: 700;
  line-height: 1.3em;
  margin: 10px 7px 0 0;
  border-radius: 0.3rem;
}

.update-btn{
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  border: none;
  background: rgb(212, 139, 3);
  padding: 10px 15px;
  font-weight: 700;
  line-height: 1.3em;
  margin: 10px 0 0 0;
  border-radius: 0.3rem;
}

.update-btn:hover {
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -o-transform: scale(1.1);
  background: rgb(226, 149, 5);
} 

.submit-btn:hover {
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -o-transform: scale(1.1);
  background: #006BF5;
}   

.button:hover {
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -o-transform: scale(1.1);
  background: #006BF5;
}   

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
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -o-transform: scale(1.1);
  background: #0078F5;
}   

.list {
  margin: 5px;
  background: white;
  padding: 10px;
  border-radius: 15px;
  pointer-events: auto;
}

.list:hover {
  background: #f9f9f9
}

h3, h4, p {
  margin: 5px 0 5px 0;
}

.borderStyle {
  width: 60%;
  height: 30px;
  border: 3px solid green;
  padding: 20px;
  margin: 10px
}

.modal-content {
  background-color: #f6f6f6;
  margin: 1% 20%;
  padding: 20px;
  border: 1px solid #888;
  pointer-events: auto;
  background-clip: padding-box;
  border: 1px solid rgba(0,0,0,.2);
  border-radius: .3rem;
}

.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.6);
      overflow-x: hidden;
    overflow-y: auto;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
