<template>
  <div>
    <h1>チャット</h1>
    <ul>
      <li
        v-for="chat in this.messagelist"
        :key="chat.id"
      >ユーザー名：{{chat.username}} メッセージ：{{chat.message}}</li>
    </ul>
    <sendmessage
      class="sendmessage"
      @sendmessage="getmessage"
      :groupname="this.groupname"
      :loginuser="this.loginuser"
    ></sendmessage>
  </div>
</template>

<script>
import firebase from "firebase";
import sendmessage from "../../components/Home/sendmessage";
export default {
  components: {
    sendmessage
  },
  data() {
    return {
      groupid: "",
      messagelist: [],
      message: "",
      db: null,
      loginuser: "",
      groupname: ""
    };
  },
  created: function() {
    this.db = firebase.firestore();
    this.read_db();
  },
  watch: {},

  methods: {
    create_group(groupname) {
      this.db
        .collection("data")
        .doc(groupname)
        .set({
          message: {}
        })
        .then(function() {
          
        })
        .catch(function() {
          
        });
    },
    getmessage(message) {
      this.message = message;
    },
    addmessage: function(groupname) {
      let data = {
        username: this.loginuser,
        message: this.message
      };
      this.db
        .collection("data")
        .doc(groupname)
        .update({
          messsage: firebase.firestore.FieldValue.arrayUnion(data)
        });
    },
    read_db: function() {
      var user1 = this.$route.params.user1;
      var user2 = this.$route.params.user2;
      this.loginuser = this.$route.params.user2;
      this.db.collection("data").onSnapshot(querySnapshot => {
        this.messagelist = [];
        var flg = false;
        querySnapshot.forEach(doc => {
          if (user1 + user2 == doc.id || user2 + user1 == doc.id) {
            if (doc.data().messsage) {
              for (var i = 0; i < doc.data().messsage.length; ++i) {
                var data = {
                  username: doc.data().messsage[i].username,
                  message: doc.data().messsage[i].message
                };
                this.messagelist.push(data);
              }
              this.messagelist.push(doc.data().messsage);
            }
            flg = true;
            this.groupname = doc.id;
          }
        });
        if (flg == false) {
          this.create_group(user1 + user2);
          this.groupname = user1 + user2;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.sendmessage {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
}
</style>