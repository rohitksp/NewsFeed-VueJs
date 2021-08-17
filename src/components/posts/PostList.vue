<template lang="html">
  <div>
    <div class="bg-white py-3 px-2">
      <div class="float-right">
        <button class="success-btn" @click="userLoginStatus()">
          {{ loginIn() }}
        </button>
        <router-link
          class="primary-btn"
          v-if="!getters.login_status"
          to="/register"
          >Register</router-link
        >
      </div>
      <div id="mainHeader" class="text-3xl float-left font-bold text-green-700">
        NewsFeed
      </div>
      <button @click="createPost()" class="ml-2 primary-btn">
        Add Post
      </button>
    </div>
    <div
      class="font-bold text-xl text-center text-white"
      v-if="getters.loading_status"
    >
      Loading...
    </div>
    <div
      class="m-1 shadow-md mx-20 px-3 py-3 bg-white rounded-lg hover:bg-blue-100 p-2"
      v-for="(post, index) in getters.posts_data"
      :key="index"
    >
      <div v-if="loggedIn(post)">
        <router-link
          :to="`/postdelete/${post.id}`"
          class="float-right danger-btn"
          >Delete
        </router-link>
        <router-link
          :to="`/postedit/${post.id}`"
          class="float-right success-btn"
          >Edit
        </router-link>
      </div>
      <div class="font-bold text-lg">
        {{ post.userName }}
      </div>
      <router-link :to="`/postview/${post.id}`">
        <div class="font-bold text-base underline text-blue-600">
          {{ post.title }}
        </div>
      </router-link>
      <div class="font-medium">{{ post.body }}</div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  data: function() {
    return {
      getters: this.$store.getters,
    };
  },
  methods: {
    loginIn() {
      if (this.getters.login_status === false) {
        return "Login";
      } else {
        return "Logout";
      }
    },
    userLoginStatus() {
      if (this.getters.login_status === false) {
        if (this.$router) {
          this.$router.push("/login");
        }
        if (this.$store) {
          this.$store.dispatch("loginStatus", true);
        }
      } else {
        Swal.fire({
          icon: "success",
          title: "Log out",
          html: "<b>Your have Successfully Logged Out</b>",
        }).then((result) => {
          if (result.isConfirmed) {
            this.$store.dispatch("loginStatus", false);
            this.$store.dispatch("getUserId", "");
          }
        });
      }
    },
    loggedIn(post) {
      return post.userId === this.$store.getters.get_userId;
    },
    createPost() {
      if (this.getters.login_status === false) {
        Swal.fire({
          icon: "error",
          title: "OOPS!!",
          html: "<b>Please login then create your post</b>",
        }).then((result) => {
          if (result.isConfirmed) {
            this.$router.push("/login");
          }
        });
      } else {
        this.$router.push("/postcreate");
      }
    },
  },
  mounted: function() {
    this.$store.dispatch("getPosts");
  },
};
</script>
