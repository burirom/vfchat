<template>
  <div>
    <backBar :title_name="this.title_name"></backBar>
    <groupname class="groupname" @send_groupname="send_groupname"></groupname>
    <div>グループ</div>
    <groupuser :username="this.loginuser" @send_joinmenber="send_joinmenber"></groupuser>
    <div class="create_btn" @click="create_btn">
      <v-btn x-large color="subcolor" dark block to="/home">Create Group</v-btn>
    </div>
  </div>
</template>

<script>
import backBar from "../../components/Bar/backBar";
import groupname from "../../components/CreateGroup/groupname";
import groupuser from "../../components/CreateGroup/groupuser";
import firebase from "firebase";
import firestore from "../../API/database/firestore"
export default {
  components: {
    backBar,
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
    
    },
    create_btn: function() {
    

      var typegroup = true;  
        firestore.creategroupdata(this.groupmenber,this.groupname,typegroup);  

        
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