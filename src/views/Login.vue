<template>
  <div id="login">
    <h1 class="login_title">Login</h1>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="9">
          <form>
            <v-text-field label="Name" v-model="username"  />
            <v-text-field label="Password" v-model="password" />
          </form>
          <div class="my-4">
            <v-btn x-lage block   color="primary" @click="login_btn">Login</v-btn>
          </div>

          <div class="my-4">
            <v-btn x-lage block outlined @click="google_login_btn" color="primary">Google Login</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import auth from "../API/Auth/auth.js";
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

<style lang="scss">
.login_title {
    font-size: $textsize_lage;
    color:$text-color;
}
</style>