<template>
  <div>
    <conversation
      class="conversation"
      :groupid="this.groupid"
      :loginuser="this.loginuser"
    />
    <backBar :title_name="this.chat" class="backBar" />
    <sendmessage
      class="sendmessage"
      :groupid="this.groupid"
      :loginuser="this.loginuser"
    ></sendmessage>
  </div>
</template>

<script>
import sendmessage from "../../components/Chat/sendmessage";
import backBar from "../../components/Bar/backBar";
import conversation from "../../components/Chat/conversation";
import firebase from "firebase";

export default {
  components: {
    sendmessage,
    backBar,
    conversation
  },
  data() {
    return {
      message: "",
      loginuser: "",
      groupid: "",
      chat: "Chat",
      db: null
    };
  },
  created: async function() {
    this.db = firebase.firestore();
    this.loginuser = await this.setloginuser();
    this.groupid = await this.setgroopid();
  },
  watch: {},
  methods: {
    getmessage(message) {
      this.message = message;
    },
    getgroupname: function(message) {
      this.groupname = message;
    },
    getusername: function() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.loginuser = user.email;
        }
      });
    },
    setloginuser: function() {
      return new Promise(function(resolve) {
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            resolve(user.email);
          }
        });
      });
    },
    setgroopid: function() {
      var users = this.db.collection("users").doc(this.loginuser);
      return new Promise(function(resolve) {
        users
          .get()
          .then(function(doc) {
            if (doc.exists) {
              resolve(doc.data().activeid);
            }
          })
          // .catch(function(error) {
          //   console.log("Error getting document:", error);
          // });
      });
    },
    
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
.backBar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
}

.conversation {
  margin: {
    top: 70px;
    left: 10px;
    right: 10px;
    bottom: 70px;
  }
}
</style>