<template>
  <div class="center-content">
    <div class="box-styling">
      <div class="header">
        Login
      </div>
      <form @submit.prevent="checkUserInfo()">
        <label class="label" for="userName">UserName</label>
        <input
          class="input-box"
          v-model="userName"
          required
          type="text"
          placeholder="Username"
          id="userName"
          autocomplete="off"
        />
        <label class="label" for="password">Password</label>
        <input
          class="input-box"
          v-model="password"
          required
          type="password"
          placeholder="Password"
          id="password"
          autocomplete="off"
        />
        <button class="primary-btn mt-2" type="submit">Login</button>
        <button @click="homeBtn()" id="danger" class="danger-btn ml-1">
          Home
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "Login",
  data: function() {
    return {
      userName: "",
      password: "",
    };
  },
  methods: {
    checkUserInfo() {
      var matchResult = this.$store.getters.get_userData.filter(
        (user) =>
          user.userName === this.userName && user.password === this.password
      );
      if (matchResult.length > 0) {
        Swal.fire({
          icon: "success",
          title: "Logged In",
          html: "<b>Your are successfully logged in</b>",
        }).then((result) => {
          if (result.isConfirmed) {
            this.$store.dispatch("loginStatus", true);
            this.$router.push("/");
            this.$store.dispatch("getUserId", matchResult[0].id);
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Not Found",
          html: "<b>First register then login</b>",
        }).then((result) => {
          if (result.isConfirmed) {
            this.$store.dispatch("loginStatus", false);
            this.$router.push("/register");
          }
        });
      }
    },
    homeBtn() {
      this.$store.dispatch("loginStatus", false);
      // this.$router.push("/");
    },
  },
  mounted() {
    this.$store.dispatch("getUserInfo");
  },
};
</script>
