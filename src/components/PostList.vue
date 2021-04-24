<template lang="html">
  <div>
    <router-link to="/postcreate">
     <button class="add-post">Add Post</button>
    </router-link>
    <h1>
      NewsFeed
    </h1>
    <div class="list" v-for="(post) in posts" :key="post.id">
      <router-link :to="`/postdelete/${post.id}`">
        <button class="button" :style="{background: '#dc3545'}">Delete</button>
      </router-link>
      <router-link :to="`/postedit/${post.id}`">
        <button class="button" :style="{background: 'rgb(9 168 199)'}">Edit</button>
      </router-link>
      <h3>
        {{post.userName}}
      </h3>
      <router-link :to="`/postview/${post.id}`">
        <h4>{{post.title}}</h4>
      </router-link>
      <p>{{post.body}}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      posts: []
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
