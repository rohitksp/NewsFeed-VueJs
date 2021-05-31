<template>
  <div class="form-style">
    <div class="header">Edit The Post</div>
    <form @submit.prevent="updatePost()">
      <label for="user-name" class="label">UserName:</label>
      <input
        type="text"
        placeholder="Edit the user name"
        v-model="postData.userName"
        id="user-name"
        class="input-box"
        autocomplete="off"
        required
      />
      <label for="title" class="label">Title:</label>
      <input
        type="text"
        placeholder="Edit the title"
        v-model="postData.title"
        id="title"
        class="input-box"
        autocomplete="off"
        required
      />
      <label for="description" class="label">Description:</label>
      <input
        type="text"
        placeholder="Edit the description"
        v-model="postData.body"
        id="description"
        class="input-box"
        autocomplete="off"
        required
      />
      <button class="warning-btn mt-2" type="submit">
        Update
      </button>
      <HomeButton />
    </form>
  </div>
</template>

<script>
import HomeButton from "../HomeButton";
export default {
  name: "PostEdit",
  props: ["id"],
  components: {
    HomeButton,
  },

  methods: {
    updatePost() {
      this.$store.dispatch("editPost", this.postData);
      this.$store.dispatch("getPosts");
      this.$router.push("/");
    },
  },
  computed: {
    postData() {
      var posts = this.$store.state.posts;
      return posts.find((post) => post.id == this.id);
    },
  },
};
</script>
