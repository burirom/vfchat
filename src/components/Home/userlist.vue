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

      <v-list-item-group>
        <v-subheader>groups</v-subheader>
        <v-list-item :to="{name:'creategroup',params:{username:this.username}}">
          <v-icon class="material-icons" color="subcolor" large>group_add</v-icon>
          <div class="text-center ma-4">グループ作成</div>
        </v-list-item>

        <v-list-item v-for="(item, i) in grouplist" :key="i"
        :to="{name:'chat',params:{groupname:item.groupname,user2:item.loginuser}}">
          <v-list-item-avatar>
            <img :src="item.imgurl" />
          </v-list-item-avatar>
          <div class="ma-4">{{item.groupname}}</div>
        </v-list-item>
      </v-list-item-group>

      <v-list-item-group>
        <v-subheader>friends</v-subheader>
        <v-list-item
          v-for="(item, i) in userlist"
          :key="i"
          :to="{name:'chat',params:{user1:item.senduser,user2:item.loginuser}}"
        >
          <v-list-item-avatar>
            <img :src="item.imgurl" />
          </v-list-item-avatar>
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
    // username: {
    //   type: String,
    //   required: true
    // },
    userimg: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loginuser: [],
      userlist: [],
      db: null,
      grouplist: [],
      username: ""
    };
  },
  created: function() {
    this.db = firebase.firestore();
    this.getstatus();

    this.getuserlist();
    this.getgrouplist();
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
                loginuser: this.username,
                imgurl: doc.data().userimg
              };
              this.userlist.push(data);
            } else if (this.username == doc.id) {
              let data = {
                username: this.username,
                imgurl: doc.data().userimg
              };
              this.loginuser.push(data);
            }
          });
        });
    },
    getgrouplist: function() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          // User is signed in.
          this.username = user.email;
          this.db
            .collection("groups")
            .where("menber", "array-contains", this.username)
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                this.grouplist.push({
                  groupname: doc.data().groupname,
                  imgurl: doc.data().userimg,
                  loginuser: this.username
                  
                });
              });
            });
        }
      });
    },

    getstatus() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          // User is signed in.
          this.username = user.email;
          console.log("user" + this.username);
        }
      });
    }
  }
};
</script>

<style scoped>
</style>