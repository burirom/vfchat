<template>
  <div>
    <back_bar :title_name="this.title_name"></back_bar>
    <groupname class="groupname" @groupname="send_groupname"></groupname>
    <div>グループ</div>
    <groupuser :username="this.loginuser"   @joinmenber="send_joinmenber"></groupuser>
    <create_btn class="create_btn"></create_btn>
  </div>
</template>

<script>
import back_bar from "../../components/Bar/back_bar";
import create_btn from "../../components/CreateGroup/create_btn";
import groupname from "../../components/CreateGroup/groupname";
import groupuser from "../../components/CreateGroup/groupuser"
export default {

  components: {
    back_bar,
    create_btn,
    groupname,
    groupuser,
   
  },
  data() {
    return {
      title_name: "Create Group",
      loginuser: this.$route.params.username,
      groupname: "",
       groupmenber: []
    };
  },
  methods:{
      send_groupname:function(message){
          this.groupname = message;
      },
      send_joinmenber:function(message){
          this.groupmenber = message;
           this.groupmenber.push(this.loginuser);
      },

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