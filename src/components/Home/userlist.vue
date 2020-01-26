<template>
  <div>
    <h1>firend</h1>
    <ul id="example-1">
      <li v-for="item in userlist" :key="item.id">
        <router-link @click="test"  :to="{name:'chat',params:{user1:item.senduser,user2:item.loginuser}}">{{item.senduser}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  props: {
    username: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      userlist: [],
      loginuser: 'tesut'
    };
  },
  created: function() {
    this.getuserlist();
  },
  methods: {
    getuserlist: function() {
      var db = firebase.firestore();
      db.collection("users")
        .get()
        .then(querySnapshot => {
           
          querySnapshot.forEach(doc => {
            if (this.username != doc.id) {
              let data = {
                senduser: doc.id,
                loginuser:this.username

              };
              this.userlist.push(data);
            }
          });
        });
    },
    test:function(){

    }

  }
};
</script>

<style>
</style>