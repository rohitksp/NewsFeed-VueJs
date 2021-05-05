<template>
  <div>
    <h3>View Post</h3>
    <hr />
    <div class="list">
      <h3>{{ this.postData.userName }}</h3>
      <h4>{{ this.postData.title }}</h4>
      <p>{{ this.postData.body }}</p>
    </div>
    <div
      v-for="(comment, index) in commentData"
      :key="index"
      :style="styleObject"
    >
      <img
        :src="avatarUrl(comment)"
        :style="avatarStyle"
        width="40px"
        height="40px"
        :alt="comment.author"
      />
      <div>
        <h3>{{ comment.author }}</h3>
        <p>{{ comment.message }}</p>
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
      <button class="submit-btn" type="submit">Comment</button>
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

  data: function () {
    return {
      avatarStyle: {
        margin: "8px 5px 0 0",
        background: "lightblue",
        borderRadius: "0.4rem",
      },
      styleObject: {
        padding: "5px 0 5px 7px",
        display: "flex",
        background: "white",
        margin: "5px",
      },
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
