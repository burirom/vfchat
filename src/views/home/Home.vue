<template>
  <div class="about">
    <top_bar :title_name="title_name"></top_bar>
    <userlist :username="username" :userimg="userimg"/>
    <bottom_bar class="footer-navbar" :active_btn="active_btn"></bottom_bar>
  </div>
</template>

<script>
import firebase from "firebase";
import top_bar from "../../components/Bar/top_bar";
import bottom_bar from "../../components/Bar/bottom_bar";
import testset from "../../API/database/firestore";
import userlist from "../../components/Home/userlist"
export default {
  components: {
    top_bar,
    bottom_bar,
    userlist
  },
  data() {
    return {
      username: "",
      userimg:'https://firebasestorage.googleapis.com/v0/b/vf-chat-project.appspot.com/o/kouryou1.png?alt=media&token=313bb9d1-560f-49c7-bcd2-468b80698bc0',
      message: "",

      comments: [],
      db: null,
      title_name: "Home",
      active_btn: 0,
      test: ''
    };
  },
  created() {

    this.getstatus();

  },
  methods: {
    signout: function() {
      firebase.auth().signOut();
    },
    getstatus() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          // User is signed in.
          this.username = user.email;
          testset.useradd(this.username);
        } else {
          // User is signed out.
          this.$router.push("/");
          // ...
        }
      });
    },

    headertitle: function(message) {
      this.title_name = message;
    }
  }
};
</script>
<style>
</style>

