<template>
  <div>
      <form class="my-8" >
        <v-text-field  label="GroupName" v-model="groupname" />
      </form>
  </div>
</template>

<script>
export default {
data(){
    return{
        groupname: "",
    }
},
watch:{
groupname:function(){
    this.$emit("send_groupname",this.groupname);
   
}
}
}
</script>

<style>

</style>