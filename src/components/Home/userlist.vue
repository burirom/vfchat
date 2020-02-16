<template>
  <div>
    <v-list>
      <v-list-item-group>
        <v-subheader>users</v-subheader>
        <v-list-item v-for="(item, i) in loginuser" :key="i">
          <v-list-item-avatar>
            <img :src="item.imgurl" />
          </v-list-item-avatar>
          <div>{{item.username}}</div>
        </v-list-item>
      </v-list-item-group>
      <grouplist></grouplist>
      <v-list-item-group>
        <v-subheader>friends</v-subheader>
        <v-list-item v-for="(item, i) in userlist" :key="i" @click="changechat(item.senduser)">
          <v-list-item-avatar>
            <img :src="item.imgurl" />
          </v-list-item-avatar>
          <div class="ma-4">{{item.username}}</div>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import firebase from "firebase";
import firestore from "../../API/database/firestore";
import grouplist from "./grouplist"
export default {
  components:{
    grouplist
  },
  data() {
    return {
      loginuser: [],
      userlist: [],
      db: null,
      username: ""
    };
  },
  created: function() {
    this.db = firebase.firestore();
    this.getstatus();
    this.getuserlist();
   
  },

  methods: {
    getuserlist: function() {
      this.db
        .collection("users")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            if (this.username != doc.id) {
              let data = {
                senduser: doc.id,
                username: doc.data().username,
                imgurl: doc.data().userimg
              };
              this.userlist.push(data);
            } else if (this.username == doc.id) {
              let data = {
                username: doc.data().username,
                imgurl: doc.data().userimg
              };
              this.loginuser.push(data);
            }
          });
        });
    },

    getstatus() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.username = user.email;
        }
      });
    },

    changechat: function(senduser) {
      var menber = [this.username, senduser];
      var maincollection = this.db
        .collection("groups")
        .where("menber", "array-contains", senduser);
      var pathchat = this.$router;

      maincollection.get().then(function(querySnapshot) {
        var alrady_group = false;
        querySnapshot.forEach(function(doc) {
          if (doc.data().typegroup == false) {
            alrady_group = true;
            pathchat.push({ name: 'chat', params: { groupId: doc.data().id ,groupmenber: menber} });
          }
        });
        if (alrady_group == false) {
          firestore.createdata(menber, null, false);
        }
      });
    },

    

  }
};
</script>

<style scoped>
</style>