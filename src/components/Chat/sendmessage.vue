<template>
  <div class="form-container">
    <input type="text" class="message" v-model="message" />
    <button class="submit" @click="submit">send</button>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  props: {
    groupname: {
      type: String,
      required: true
    },
    loginuser: {
      type: String,
      required: true,
      
    }
  },
  data() {
    return {
      message: "",
      db: null,
      size: "",
      myuser: ""
    };
  },
  created: function() {
    this.db = firebase.firestore();
    this.getmyuser();
  },
  methods: {
    submit: function() {
      this.$emit("sendmessage", this.message);
      this.addmessage();
      this.message = "";
    },
    addmessage: function() {
     var docid = this.$route.params.groupId
      let data = {
        senduser: this.myuser,
        message: this.message
      };
      this.db
        .collection("chat")
        .doc(docid)
        .update({
          message: firebase.firestore.FieldValue.arrayUnion(data)
        });
    },
    getmyuser:function(){
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.myuser = user.email;
        }
      });

    }
  }
};
</script>

<style lang="scss" scoped>
/* ボタンスタイルのリセット */
button {
  background-color: $sub-color;
}

.form-container {
  position: relative;
  height: 40px;
  border: 1px solid $text-color;
  > .message {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 80px;
    width: 100%;
    background-color: $main-color;
    font-size: 1.3rem;
    padding: 0 20px;
  }
  > .submit {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;

    width: 80px;
    text-align: center;
    background-color: $sub-color;
    color: white;
    font-size: 1.6rem;
  }
}
</style>