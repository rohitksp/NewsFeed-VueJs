<template lang="html">
  <div id="app">
    <Header 
      :postData="postData"
      :fetchPosts="fetchPosts"
    />
    <div class="list" v-for="(post) in posts" :key="post.id">
      <PostDelete 
        :postData="postData"
        :fetchPosts="fetchPosts"
        :post="post"
      />
      <PostEdit
        :postData="postData"
        :fetchPosts="fetchPosts"
        :post="post"
      />
      <PostView 
        :post="post"
        :postData="postData"
        :fetchPosts="fetchPosts"
      />
      <h3>
        {{post.userName}}
      </h3>
      <h4>{{post.title}}</h4>
      <p>{{post.body}}</p>
    </div>    
  </div>
</template>

<script>
import axios from 'axios'
import Header from "./components/Header"
import PostCreate from "./components/PostCreate"
import PostView from "./components/PostView"
import PostEdit from "./components/PostEdit"
import PostDelete from "./components/PostDelete"

export default {
  components: {
    Header,
    PostCreate,
    PostView,
    PostEdit,
    PostDelete
  },
  data () {
    return {
      posts: [],
      postData: {
        id: "",
        userName: "",
        title: "",
        body: ""
      }
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
  margin: auto 2%;
  padding: 1%;
  border-radius: 1%;
  background-color: #f6f6f6;
}
</style>

