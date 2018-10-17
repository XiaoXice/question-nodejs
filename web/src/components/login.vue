<template>
  <div class="checkin-main">
    <el-input :class="{ 'rad-border': (checked&&!username)}" v-model="username" clearable>
      <template slot="prepend">账号:</template>
    </el-input>
    <el-input :class="{ 'rad-border': (checked&&!password)}" type="password" v-model="password" clearable>
      <template slot="prepend">密码:</template>
    </el-input>
    <el-button type="primary" @click="checkTable" round>登陆</el-button>
  </div>
</template>
<script>
export default {
  name: "checkin",
  data() {
    this.$store.state.routerPush = (string)=>{
      return this.$router.push(string);
    }
    return {
      checked: false,
      username: '',
      password: ''
    }
  },
  methods:{
    checkTable: function(){
      if(!(this.username && this.password)){
        this.$notify.error({
          title: '好想哪里不太对',
          message: '亲的信息还没有填全面'
        });
        this.checked = true;
        return false;
      }
      this.$store.state.power = 3;
      this.$store.state.adminUserName = this.username;
      this.$router.push('/admin/');
    }
  }
}
</script>

<style>
.checkin-main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.rad-border > *{
  /* color: red; */
  border: 1px solid #ce2121;
  transition: border-color .2s;
}
.el-input > * {
  transition: border-color .2s;
}
.el-button {
    margin-top: 10px;
}
</style>

