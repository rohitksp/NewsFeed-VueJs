<template>
  <div>
    <div class="header">Edit The Post</div>
    <form @submit.prevent="updatePost()">
      <label for="user-name" class="label">UserName:</label><br />
      <input
        type="text"
        placeholder="Edit the user name"
        v-model="postData.userName"
        id="user-name"
        class="input-box"
        autocomplete="off"
        required
      />
      <br />
      <label for="title" class="label">Title:</label><br />
      <input
        type="text"
        placeholder="Edit the title"
        v-model="postData.title"
        id="title"
        class="input-box"
        autocomplete="off"
        required
      />
      <br />
      <label for="description" class="label">Description:</label><br />
      <input
        type="text"
        placeholder="Edit the description"
        v-model="postData.body"
        id="description"
        class="input-box"
        autocomplete="off"
        required
      />
      <br />
      <button class="warning-btn mt-2" type="submit">
        Update
      </button>
      <HomeButton />
    </form>
  </div>
</template>

<script>
import HomeButton from "../HomeButton";
import { mapActions, mapState } from "vuex";

export default {
  name: "PostEdit",
  props: ["id"],
  components: {
    HomeButton,
  },

  methods: {
    ...mapActions(["editPost", "getPosts"]),

    updatePost() {
      this.editPost(this.postData);
      this.getPosts();
      this.$router.push("/");
    },
  },
  computed: {
    ...mapState(["posts"]),

    postData() {
      return this.posts.find((post) => post.id == this.id);
    },
  },
};
</script>
