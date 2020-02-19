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
    groupid: {
      type: String,
      required: true
    },
    loginuser: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      message: "",
      db: null,
      size: ""
    };
  },
  created: function() {
    this.db = firebase.firestore();
  },
  methods: {
    submit: function() {
      if(this.message){
        this.getnumber(this.message);
        this.message = "";
      }
      
    },
    addmessage: function(no, message) {
      var docid = this.groupid;
      let data = {
        No: no,
        senduser: this.loginuser,
        message: message
      };
      this.db
        .collection("chat")
        .doc(docid)
        .update({
          message: firebase.firestore.FieldValue.arrayUnion(data)
        });
    },
    getnumber: function(message) {
      this.db
        .collection("chat")
        .doc(this.groupid)
        .get()
        .then(doc => {
          this.addmessage(Object.keys(doc.data().message).length, message);
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
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