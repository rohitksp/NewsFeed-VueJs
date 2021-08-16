<template>
  <div class="form-style">
    <div class="header">Delete The Post</div>
    <div class="bg-gray-100 rounded-lg p-2 mt-2">
      <div class="label my-2">
        Are you sure you want to delete the post?
      </div>
      <button class="danger-btn" @click.prevent="deletePostData()">
        Yes
      </button>
      <router-link to="/" id="back-button" class="primary-btn ml-1"
        >No</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "PostDelete",
  props: ["id"],

  methods: {
    deletePostData() {
      if (this.$store) {
        this.$store.dispatch("deletePost", this.id);
        this.$store.dispatch("getPosts");
      }
      if (this.$router) {
        this.$router.push("/");
      }
    },
  },
};
</script>
