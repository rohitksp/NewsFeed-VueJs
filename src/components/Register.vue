<template>
  <div class="center-content">
    <div class="box-styling">
      <div class="header">Register Page</div>
      <form @submit.prevent="registerUser()">
        <label class="label" for="userName">UserName</label>
        <input
          v-model="userData.userName"
          type="text"
          placeholder="Username"
          id="userName"
          required
          class="input-box"
          autocomplete="off"
        />
        <label class="label" for="email">Email Id</label>
        <input
          v-model="userData.email"
          type="email"
          placeholder="Email Id"
          id="emailId"
          required
          class="input-box"
          autocomplete="off"
        />
        <label class="label" for="password">Password</label>
        <input
          v-model="userData.password"
          type="password"
          placeholder="Password"
          id="password"
          required
          class="input-box"
          autocomplete="off"
        />
        <br />
        <button class="primary-btn mt-2" type="submit">Register</button>
        <button @click="homeBtn()" class="danger-btn ml-1">Home</button>
      </form>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2";
export default {
  name: "Register",

  data: function() {
    return {
      userData: {
        userName: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    registerUser() {
      var matchingInfo = this.$store.getters.get_userData.filter(
        (userInfo) => userInfo.userName === this.userData.userName
      );
      if (matchingInfo.length > 0) {
        Swal.fire({
          icon: "error",
          title: "Already Exist",
          html: "<b>Please use different username</b>",
        }).then((result) => {
          if (result.isConfirmed) {
            this.userData.userName = "";
          }
        });
      } else {
        this.$store.dispatch("registerUser", this.userData);
        Swal.fire({
          icon: "success",
          title: "Registered",
          html: "<b>You have successfully registered</b>",
        }).then((result) => {
          if (result.isConfirmed) {
            this.$router.push("/login");
          }
        });
      }
    },
    homeBtn() {
      this.$store.dispatch("loginStatus", false);
      this.$router.push("/");
    },
  },
  mounted() {
    this.$store.dispatch("getUserInfo");
  },
};
</script>
