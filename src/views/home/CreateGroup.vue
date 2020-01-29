<template>
  <div>
    <back_bar :title_name="this.title_name"></back_bar>
    <groupname class="groupname" @send_groupname="send_groupname"></groupname>
    <div>グループ</div>
    <groupuser :username="this.loginuser" @send_joinmenber="send_joinmenber"></groupuser>
    <div class="create_btn" @click="create_btn">
      <v-btn x-large color="subcolor" dark block to="/home">Create Group</v-btn>
    </div>
  </div>
</template>

<script>
import back_bar from "../../components/Bar/back_bar";
import groupname from "../../components/CreateGroup/groupname";
import groupuser from "../../components/CreateGroup/groupuser";
import firebase from "firebase";
import firestorage from "../../API/storage/storage"
export default {
  components: {
    back_bar,
    groupname,
    groupuser
  },
  data() {
    return {
      title_name: "Create Group",
      loginuser: this.$route.params.username,
      groupname: "",
      groupmenber: [],
      db: null
    };
  },
  created: function() {
    this.db = firebase.firestore();
  },
  methods: {
    send_groupname: function(message) {
      this.groupname = message;
     
    },
    send_joinmenber: function(message) {
      this.groupmenber = [];
      this.groupmenber = message;
      this.groupmenber.push(this.loginuser);
    //   console.log("ユーザーリスト" + this.groupmenber);
    },
    create_btn: function() {
    
      this.db.collection("groups").doc(this.groupname).set({
          menber: this.groupmenber,
          groupname: this.groupname
          
        },{ merge: true });
        
      

        firestorage.set_img(this.groupname,"group.png","groups")

        
    }
  }
};
</script>

<style lang="scss" >
.create_btn {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
}
.groupname {
  margin: {
    left: 20px;
    right: 20px;
  }
}
</style>