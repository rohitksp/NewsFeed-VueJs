<template lang="html">
  <div>
    <router-link to="/postcreate" class="add-post" tag="button"
      >Add Post</router-link
    >
    <h1>
      NewsFeed
    </h1>
    <h3 v-if="loading_status">Loading...</h3>
    <div class="list" v-for="(post, index) in posts_data" :key="index">
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
import { mapActions, mapGetters } from "vuex";

export default {
  methods: {
    ...mapActions(["getPosts"]),
  },

  computed: {
    ...mapGetters(["posts_data", "loading_status"]),
  },

  mounted: function () {
    this.getPosts();
  },
};
</script>
