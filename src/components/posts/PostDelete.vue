<template>
  <div>
    <div class="header">Delete The Post</div>
    <div class="bg-white rounded-lg p-2 mt-2">
      <div class="label my-2">
        Are you sure you want to delete the post?
      </div>
      <button class="danger-btn" @click.prevent="deletePostData()">
        Yes
      </button>
      <router-link to="/" class="primary-btn ml-1">No</router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "PostDelete",
  props: ["id"],

  methods: {
    ...mapActions(["deletePost", "getPosts"]),

    deletePostData() {
      this.deletePost(this.id);
      this.getPosts();
      this.$router.push("/");
    },
  },
};
</script>
