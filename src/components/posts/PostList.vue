<template lang="html">
  <div>
    <div class="bg-white m-2 rounded-lg py-7 px-2">
      <router-link to="/postcreate" class="float-right primary-btn"
        >Add Post</router-link
      >
      <div class="text-2xl font-bold">
        NewsFeed
      </div>
      <div class="font-medium" v-if="loading_status">Loading...</div>
    </div>
    <div
      class="m-2 bg-white rounded-lg hover:bg-gray-300 p-2"
      v-for="(post, index) in posts_data"
      :key="index"
    >
      <router-link
        :to="`/postdelete/${post.id}`"
        class="float-right danger-btn"
        >Delete
      </router-link>
      <router-link
        :to="`/postedit/${post.id}`"
        class="float-right success-btn"
        >Edit
      </router-link>
      <div class="font-bold text-lg">
        {{ post.userName }}
      </div>
      <router-link :to="`/postview/${post.id}`">
        <div class="font-bold text-base underline text-blue-600">
          {{ post.title }}
        </div>
      </router-link>
      <div class="font-medium">{{ post.body }}</div>
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

  mounted: function() {
    this.getPosts();
  },
};
</script>
