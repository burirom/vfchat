<template>
  <div>
    <v-list>
      <v-list-item-group>
        <v-subheader>users</v-subheader>
        <v-list-item>
          <v-list-item-avatar>
            <img :src="this.userimg" />
          </v-list-item-avatar>
          <div>{{this.username}}</div>
        </v-list-item>
      </v-list-item-group>
      <v-list-item-group>
        <v-subheader>groups</v-subheader>
        <v-list-item>
          <v-icon class="material-icons" color="subcolor" large>group_add</v-icon>
          <div class="text-center ma-4">グループ作成</div>
        </v-list-item>
        <v-list-item
          v-for="(item, i) in userlist"
          :key="i"
          :to="{name:'chat',params:{user1:item.senduser,user2:item.loginuser}}"
        >
          <div class="ma-4">{{item.senduser}}</div>
        </v-list-item>
      </v-list-item-group>
      <v-list-item-group>
        <v-subheader>friends</v-subheader>
        <v-list-item
          v-for="(item, i) in userlist"
          :key="i"
          :to="{name:'chat',params:{user1:item.senduser,user2:item.loginuser}}"
        >
          <div class="ma-4">{{item.senduser}}</div>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  props: {
    username: {
      type: String,
      required: true
    },
    userimg: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      userlist: [],
      loginuser: "tesut"
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
                loginuser: this.username
              };
              this.userlist.push(data);
            }
          });
        });
    },
    testimg: function() {
      var storageRef = firebase.storage().ref();
      var imgSample = storageRef.child("kouryou1.png");
      imgSample.getDownloadURL().then(url => {
        console.log(url);
      });
    }
  }
};
</script>

<style scoped>

</style>