<template>
  <div>
    <div>
      <v-list>
        <v-list-item-group>
          <v-subheader>friends</v-subheader>
          <v-list-item v-for="(item, i) in userlist" :key="i">
            <v-list-item-avatar>
              <img :src="item.imgurl" />
            </v-list-item-avatar>
            <div class="ma-4">{{item.senduser}}</div>
            <div @click="check_btn">
              <v-checkbox v-model="item.checkbox"></v-checkbox>
            </div>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  props: {
    username: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      userlist: [],
      db: null,
      joinmenber: []
    };
  },
  created: function() {
    this.db = firebase.firestore();
    this.getuserlist();
  },
  watch: {
    joinmenber: function() {
      
       this.$emit(this.userlist);
    }
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
                imgurl: doc.data().userimg,
                checkbox: false
              };
              this.userlist.push(data);
            }
          });
        });
    },
    check_btn: function() {
      
    //   this.joinmenber.push(user.loginuser);

      this.userlist.forEach((value) => {
          this.joinmenber = [];
       
        if(value.checkbox == true){
            this.joinmenber.push(value.senduser);
        }
       
      });

    
    }
  }
};
</script>

<style>
</style>