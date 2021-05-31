<template>
  <div class="form-style">
    <div class="header">View Post</div>
    <div class="bg-blue-200 rounded-lg p-2 my-2">
      <div class="font-bold text-lg">{{ this.postData.userName }}</div>
      <div class="font-semibold text-base">{{ this.postData.title }}</div>
      <div class="font-medium">{{ this.postData.body }}</div>
    </div>
    <div
      class="bg-gray-100 flex rounded-lg p-2 my-2"
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
    <form @submit.prevent="addComments()">
      <label for="name" class="label">Author</label>
      <input
        type="text"
        id="name"
        placeholder="Name"
        autocomplete="off"
        v-model="postComment.author"
        class="input-box"
        required
      />
      <label for="comment" class="label">Comment</label>
      <input
        type="text"
        id="comment"
        autocomplete="off"
        placeholder="Comment"
        v-model="postComment.message"
        class="input-box"
        required
      />
      <button class="primary-btn mt-2" type="submit">Comment</button>
      <HomeButton />
    </form>
    <h3 v-if="getters.loading_status">Loading...</h3>
  </div>
</template>

<script>
import HomeButton from "../HomeButton";
import Swal from "sweetalert2";

export default {
  name: "PostView",
  props: ["id"],
  components: {
    HomeButton,
  },

  data: function() {
    return {
      getters: this.$store.getters,
      postComment: {
        postId: this.id,
        author: "",
        message: "",
      },
    };
  },

  methods: {
    avatarUrl(comment) {
      return "https://joeschmoe.io/api/v1/" + comment.author;
    },

    submitComment() {
      this.$store.dispatch("addComment", {
        postId: this.id,
        author: this.postComment.author,
        message: this.postComment.message,
      });
      this.postComment.author = "";
      this.postComment.message = "";
    },
    addComments() {
      if (this.getters.login_status === false) {
        Swal.fire({
          icon: "error",
          title: "OOPS!!",
          html: "<b>Please login then comment</b>",
        }).then((result) => {
          if (result.isConfirmed) {
            this.$router.push("/login");
          }
        });
      } else {
        this.submitComment();
      }
    },
  },
  computed: {
    postData() {
      let post_data = this.$store.getters.posts_data;
      return post_data.find((post) => post.id == this.id);
    },

    commentData() {
      let comment_data = this.$store.getters.comments_data;
      return comment_data.filter((comment) => comment.postId == this.id);
    },
  },
  mounted() {
    this.$store.dispatch("getComments");
    this.$store.dispatch("getPosts");
  },
};
</script>
