

<template>
  <div class="about">
    <top_bar  :title_name="title_name"></top_bar>
    <h1>ログイン成功</h1>
    <button @click="signout">サインアウト</button>
    <div>{{this.username}}</div>
   
 <bottom_bar class="footer-navbar" @headertitle="headertitle"></bottom_bar>

  
   
  
  </div>
</template>

<script>
import firebase from "firebase";
import top_bar from "../components/Bar/top_bar"
import bottom_bar from "../components/Bar/bottom_bar"

export default {
  components:{
   top_bar,
bottom_bar
    
  },
  data() {
    return {
      username: "",
      message: "",
      comments: [],
      db: null,
      title_name:'HOME'
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
   headertitle:function(message){
     this.title_name= message;
   }


    
  }
};
</script>

<style>

.footer-navbar{
  position: fixed;
  /*基準を画面の左上に*/
  bottom: 0;

}
</style>

