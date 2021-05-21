<template>
  <div>
    <div class="header">View Post</div>
    <div class="bg-white rounded-lg hover:bg-gray-300 p-2 my-2">
      <div class="font-bold text-lg">{{ this.postData.userName }}</div>
      <div class="font-semibold text-base">{{ this.postData.title }}</div>
      <div class="font-medium">{{ this.postData.body }}</div>
    </div>
    <div
      class="bg-white flex rounded-lg p-2 my-2"
      v-for="(comment, index) in commentData"
      :key="index"
    >
      <img
        :src="avatarUrl(comment)"
        width="50px"
        height="50px"
        :alt="comment.author"
        class="bg-blue-300 rounded-full mr-1"
      />
      <div>
        <div class="font-bold text-lg">{{ comment.author }}</div>
        <div class="font-normal">{{ comment.message }}</div>
      </div>
    </div>
    <form @submit.prevent="submitComment()">
      <label for="name" class="label">Author</label><br />
      <input
        type="text"
        id="name"
        placeholder="Name"
        autocomplete="off"
        v-model="postComment.author"
        class="input-box"
        required
      /><br />
      <label for="comment" class="label">Comment</label><br />
      <input
        type="text"
        id="comment"
        autocomplete="off"
        placeholder="Comment"
        v-model="postComment.message"
        class="input-box"
        required
      /><br />
      <button class="primary-btn mt-2" type="submit">Comment</button>
      <HomeButton />
    </form>
    <h3 v-if="loading_status">Loading...</h3>
  </div>
</template>

<script>
import HomeButton from "../HomeButton";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "PostView",
  props: ["id"],
  components: {
    HomeButton,
  },

  data: function() {
    return {
      postComment: {
        postId: this.id,
        author: "",
        message: "",
      },
    };
  },

  methods: {
    ...mapActions(["getComments", "getPosts", "addComment"]),

    avatarUrl(comment) {
      return "https://joeschmoe.io/api/v1/" + comment.author;
    },

    submitComment() {
      this.addComment({
        postId: this.id,
        author: this.postComment.author,
        message: this.postComment.message,
      });
      this.postComment.author = "";
      this.postComment.message = "";
    },
  },
  computed: {
    ...mapGetters(["comments_data", "posts_data", "loading_status"]),

    postData() {
      return this.posts_data.find((post) => post.id == this.id);
    },

    commentData() {
      return this.comments_data.filter((comment) => comment.postId == this.id);
    },
  },
  mounted() {
    this.getComments();
    this.getPosts();
  },
};
</script>
