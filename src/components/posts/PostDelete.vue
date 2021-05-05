<template>
  <div>
    <h3>Delete the post</h3>
    <hr />
    <p :style="{ margin: '20px 0 10px 0' }">
      Are you sure you want to delete the post?
    </p>
    <button class="delete-btn" @click.prevent="deletePostData()" type="submit">
      Yes
    </button>
    <router-link to="/" class="submit-btn" tag="button">No</router-link>
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
