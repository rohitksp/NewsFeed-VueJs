<template lang="html">
  <div>
    <router-link to="/postcreate" class="add-post" tag="button"
      >Add Post</router-link
    >
    <h1>
      NewsFeed
    </h1>
    <h3 v-if="loadingData">Loading...</h3>
    <div class="list" v-for="post in posts" :key="post.id">
      <router-link
        :to="`/postdelete/${post.id}`"
        tag="button"
        class="button"
        :style="{background: '#dc3545'}"
        >Delete
      </router-link>
      <router-link
        :to="`/postedit/${post.id}`"
        tag="button"
        class="button"
        :style="{background: '#09A8C7'}"
        >Edit
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
  import axios from "axios";

  export default {
    data: function () {
      return {
        posts: [],
        loadingData: false
      };
    },

    methods: {
      fetchPosts() {
        this.loadingData = true;
        axios
          .get("http://localhost:3002/posts/")
          .then((response) => {
            if (response.status === 200) {
              this.loadingData = false;
              this.posts = response.data.reverse();
            }
          })
          .catch((error) => {
            window.alert(error);
            this.loadingData = false;
          });
      }
    },

    mounted: function () {
      this.fetchPosts();
    }
  };
</script>
