<template>
  <div class="form-style">
    <div class="header">
      Add New Post
    </div>
    <form @submit.prevent="createPost()">
      <label for="user-name" class="label">UserName:</label>
      <input
        type="text"
        id="user-name"
        placeholder="User Name"
        v-model="postData.userName"
        autocomplete="off"
        class="input-box"
        required
      />
      <label for="title" class="label">Title:</label>
      <input
        type="text"
        id="title"
        placeholder="Title"
        v-model="postData.title"
        autocomplete="off"
        class="input-box"
        required
      />
      <label for="description" class="label">Description:</label>
      <input
        type="text"
        id="description"
        placeholder="Description"
        v-model="postData.body"
        autocomplete="off"
        class="input-box"
        required
      />
      <button class="primary-btn mt-2" type="submit">Add Post</button>
      <HomeButton />
    </form>
  </div>
</template>

<script>
import HomeButton from "../HomeButton.vue";

export default {
  name: "PostCreate",
  components: {
    HomeButton,
  },

  data: function() {
    return {
      postData: {
        userName: "",
        title: "",
        body: "",
        // userId: this.$store.getters.get_userId,
      },
    };
  },
  methods: {
    createPost() {
      this.$store.dispatch("addPost", {
        body: this.postData.body,
        title: this.postData.title,
        userName: this.postData.userName,
        // userId: this.postData.userId,
      });
      this.$store.dispatch("getPosts");
      this.postData.userName = "";
      this.postData.title = "";
      this.postData.body = "";
      this.$router.push("/");
    },
  },
};
</script>
