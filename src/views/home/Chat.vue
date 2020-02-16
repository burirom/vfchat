<template>
  <div>
    <conversation
      class="conversation"
      :message="this.message"
      @loginuser="getusername"
      @groupname="getgroupname"
    />

    <back_bar :title_name="this.chat" class="back_bar" />
    <sendmessage
      class="sendmessage"
      @sendmessage="getmessage"
      :groupname="this.groupname"
      :loginuser="this.loginuser"
    ></sendmessage>
  </div>
</template>

<script>
import sendmessage from "../../components/Chat/sendmessage";
import back_bar from "../../components/Bar/back_bar";
import conversation from "../../components/Chat/conversation";
import firebase from "firebase";
export default {
  components: {
    sendmessage,
    back_bar,
    conversation
  },
  data() {
    return {
      message: "",
      loginuser: "",
      groupname: "",
      chat: "Chat"
    };
  },
  created: function() {
    this.getusername();
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
.back_bar {
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