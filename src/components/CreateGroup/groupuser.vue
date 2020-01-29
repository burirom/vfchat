<template>
  <div>
    <div>
      <v-list>
        <v-list-item-group>
          <v-subheader>friends</v-subheader>
          <v-list-item v-for="(item, i) in userlist" :key="i" @click="join">
            <v-list-item-avatar>
              <img :src="item.imgurl" />
            </v-list-item-avatar>
            <div class="ma-4">{{item.senduser}}</div>
            <div>
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
      sendjoin: []
    };
  },
  created: function() {
    this.db = firebase.firestore();
    this.getuserlist();
  },
  watch: {},

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

    join: function() {
      var joinmenber = this.userlist.filter(e => e.checkbox == true);
       this.sendjoin = [];
      joinmenber.forEach(value => {
        this.sendjoin.push(value.senduser);
      });

      this.$emit("send_joinmenber", this.sendjoin);
    }
  }
};
</script>

<style>
</style>