<template>
  <div>
    <h3>Add New Post</h3>
    <hr />
    <form @submit.prevent="createPost()">
      <label for="user-name" class="label">UserName:</label><br />
      <input
        type="text"
        id="user-name"
        placeholder="User Name"
        v-model="postData.userName"
        autocomplete="off"
        class="input-box"
        required
      />
      <br />
      <label for="title" class="label">Title:</label><br />
      <input
        type="text"
        id="title"
        placeholder="Title"
        v-model="postData.title"
        autocomplete="off"
        class="input-box"
        required
      />
      <br />
      <label for="description" class="label">Description:</label><br />
      <input
        type="text"
        id="description"
        placeholder="Description"
        v-model="postData.body"
        autocomplete="off"
        class="input-box"
        required
      />
      <br />
      <button class="submit-btn" type="submit">Add Post</button>
      <HomeButton />
    </form>
  </div>
</template>

<script>
import HomeButton from "../HomeButton.vue";
import { mapActions } from "vuex";

export default {
  name: "PostCreate",
  components: {
    HomeButton,
  },

  data: function () {
    return {
      postData: {
        userName: "",
        title: "",
        body: "",
      },
    };
  },
  methods: {
    ...mapActions(["addPost", "getPosts"]),
    createPost() {
      this.addPost({
        body: this.postData.body,
        title: this.postData.title,
        userName: this.postData.userName,
      });
      this.getPosts();
      this.postData = "";
      this.$router.push("/");
    },
  },
};
</script>
