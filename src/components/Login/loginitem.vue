<template>
  <div>
    <v-card class="mx-auto" max-width="500" outlined elevation="4">
       <v-row align-content="center" justify="center">
        <v-col cols="9" class="text-center my-12">
          <h1 class="login-title">Login</h1>
          <form>
            <v-text-field label="Name" v-model="username" />
            <v-text-field label="Password" v-model="password" />
          </form>
          <div class="my-4">
            <v-btn x-lage block dark @click="login_btn" color="subcolor">Login</v-btn>
          </div>
          <div class="my-4">
            <v-btn
              class="btn-block"
              x-lage
              block
              outlined
              @click="google_login_btn"
              color="subcolor"
            >Google Login</v-btn>
          </div>
        </v-col>
       </v-row>
      
    </v-card>
  </div>
</template>

<script>
import auth from "../../API/Auth/auth.js";
export default {
  data: function() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login_btn: function() {
      auth.mail_login(this.username, this.password, this.$router);
    },
    google_login_btn: function() {
      auth.google_login(this.$router);
    }
  }
};
</script>

<style>
</style>