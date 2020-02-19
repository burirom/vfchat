<template>
  <div>
    <v-list-item-group>
      <v-subheader>groups</v-subheader>
      <v-list-item :to="{name:'creategroup',params:{username:this.loginuser}}">
        <v-icon class="material-icons" color="subcolor" large>group_add</v-icon>
        <div class="text-center ma-4">グループ作成</div>
      </v-list-item>

      <v-list-item
        v-for="(item, i) in grouplist"
        :key="i"
        @click="changegrup(item.menber,item.docid)"
      >
        <v-list-item-avatar>
          <img :src="item.imgurl" />
        </v-list-item-avatar>
        <div class="ma-4">{{item.groupname}}</div>
      </v-list-item>
    </v-list-item-group>
  </div>
</template>

<script>
import firebase from "firebase";
import firestore from "../../API/database/firestore";
export default {
  data() {
    return {
    loginuser:"",
      db: null,
      grouplist: []
    };
  },
  created: function() {
     this.db = firebase.firestore();
    this.getstatus();
    
  },
  methods: {
    getgrouplist: function() {
      this.db
        .collection("groups")
        .where("menber", "array-contains", this.loginuser)
       .onSnapshot(querySnapshot => {
           this.grouplist= [];
          querySnapshot.forEach(doc => {
            if (doc.data().typegroup == true) {
              this.grouplist.push({
                groupname: doc.data().groupname,
                imgurl: doc.data().userimg,
                loginuser: this.loginuser,
                menber: doc.data().menber,
                docid: doc.id
              });
            }
          });
        }
       );
    },
     getstatus() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.loginuser = user.email;
          this.getgrouplist();
        }
      });
    },
    changegrup: function(mymenber,id) {
      var menber = mymenber;
      var pathchat = this.$router;
      this.setactivechat(id);
      pathchat.push({ name: 'chat', params: { groupId: id ,groupmenber: menber} });
    },
   setactivechat:function(activeid){
      firestore.setactivechat(this.loginuser,activeid);
    }
  }
};
</script>

<style>
</style>