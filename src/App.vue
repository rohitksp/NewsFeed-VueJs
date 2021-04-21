<template lang="html">
  <div id="app">
    <PostCreate 
      :showAddPost="showAddPost"
      :postData="postData"
      :fetchPosts="fetchPosts"
    />
    <h1>
      NewsFeed
    </h1>
    <hr />
    <div class="list" v-for="(post) in posts" :key="post.id">
      <h3>
        {{post.userName}}
        <PostEdit 
          :showEditPost="showEditPost"
          :postData="postData"
          :fetchPosts="fetchPosts"
          :post="post"
        />
        <button class="button" :style="{background: '#dc3545'}" @click="toggleDeletePanel(post)">Delete</button>
        <button class="button" :style="{background: '#198754'}" @click="toggleViewPanel(post)">View</button>
      </h3>
      <h4>{{post.title}}</h4>
      <p>{{post.body}}</p>
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
          width="40px" height="40px" :alt="`${comment.author}`"/>
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
import PostEdit from "./components/PostEdit"
import PostCreate from "./components/PostCreate"

export default {
  components: {
    PostEdit,
    PostCreate
  },
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
        postId: '',
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
      axios.get('http://localhost:3002/posts/')
        .then(response => {
          this.posts = response.data.reverse()
        })
        .catch (() => {
          console.warn('Something went wrong for getting post')
        })
    },
    fetchComments () {
      axios.get(`http://localhost:3002/comments?postId=${this.postData.id}`)
        .then(response => {
          this.comments = response.data.reverse()
        })
        .catch (() => {
          console.warn('Something went wrong for getting comments')
        })
    },
    toggleDeletePanel (post) {
      this.showDeletePost = true
      this.postData.id = post.id
    },
    toggleViewPanel (post) {
      this.commentData.postId = post.id
      this.postData.id = post.id
      this.postData.userName = post.userName
      this.postData.title = post.title
      this.postData.body = post.body
      this.fetchComments()
      this.showViewPost = true
    },
    viewClosePanel () {
      this.showViewPost = false
      this.postData.id = ''
      this.postData.userName = ''
      this.postData.title = ''
      this.postData.body = ''
    },
    deletePost (postData){
      axios.delete(`http://localhost:3002/posts/${postData.id}`)
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
      axios.post('http://localhost:3002/comments/', this.commentData)
        .then(() => {
          this.fetchComments()
          this.commentData.postId = this.postData.id
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

