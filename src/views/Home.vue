

<template>
  <div class="about">
    <h1>ログイン成功</h1>
    <button @click="signout">サインアウト</button>
    <div>{{this.username}}</div>
  </div>
</template>

<script>
import firebase from "firebase";


export default {
  components:{
   
    
  },
  data() {
    return {
      username: "",
      message: "",
      comments: [],
      db: null
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
        } else {
          // User is signed out.
          this.$router.push("/");
         
          // ...
        }
      });
    },
    
  }
};
</script>

<style>
</style>

