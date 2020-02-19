<template>
  <div class="about">
    <topBar :title_name="title_name" class="topbar"></topBar>
    <userlist :username="username" class="userlist"/>
    <bottomBar class="footer-navbar" :active_btn="active_btn"></bottomBar>
  </div>
</template>

<script>
import firebase from "firebase";
import topBar from "../../components/Bar/topBar";
import bottomBar from "../../components/Bar/bottomBar";
import firestore from "../../API/database/firestore";
import userlist from "../../components/Home/userlist";
export default {
  components: {
    topBar,
    bottomBar,
    userlist
  },
  data() {
    return {
      username: "",
      message: "",

      comments: [],
      db: null,
      title_name: "Home",
      active_btn: 0,
      test: ""
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
          firestore.usercheck(this.username);
          
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
<style lang="scss" scoped>
.topbar{
  position: fixed;
  top:0;
  left: 0;
  right: 0;
  z-index: 9999;
 
}
.userlist{
 margin-top: 70px;
}
</style>

