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

        <v-list-item v-for="(item, i) in grouplist" :key="i" @click="changegrup(item.menber,item.docid)">
          <v-list-item-avatar>
            <img :src="item.imgurl" />
          </v-list-item-avatar>
          <div class="ma-4">{{item.groupname}}</div>
        </v-list-item>
      </v-list-item-group>

      <v-list-item-group>
        <v-subheader>friends</v-subheader>
        <v-list-item v-for="(item, i) in userlist" :key="i" @click="changechat(item.senduser)">
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
import firestore from "../../API/database/firestore";
export default {
  props: {

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
                if (doc.data().typegroup == true) {
                  this.grouplist.push({
                    groupname: doc.data().groupname,
                    imgurl: doc.data().userimg,
                    loginuser: this.username,
                    menber: doc.data().menber,
                    docid: doc.id
                  });
                }
              });
            });
        }
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

    changegrup: function(mymenber,id) {
      var menber = mymenber;
      var pathchat = this.$router;
      pathchat.push({ name: 'chat', params: { groupId: id ,groupmenber: menber} });
    },

  }
};
</script>

<style scoped>
</style>