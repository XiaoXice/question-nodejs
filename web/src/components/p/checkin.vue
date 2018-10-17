<template>
  <div class="checkin-main">
    <el-input :class="{ 'rad-border': (checked&&!$store.state.name)}" placeholder="一定是真名呦~" v-model="$store.state.name" clearable>
      <template slot="prepend"><div>姓名:</div></template>
    </el-input>
    <el-input :class="{ 'rad-border': (checked&&!$store.state.number)}" type="number" placeholder="注意别填错啦~" v-model="$store.state.number" clearable>
      <template slot="prepend">学号:</template>
    </el-input>
    <el-input :class="{ 'rad-border': (checked&&!$store.state.school)}" placeholder="学识渊博,一定来自一个出色的学院吧" v-model="$store.state.school" clearable>
      <template slot="prepend">学院:</template>
    </el-input>
    <el-input :class="{ 'rad-border': (checked&&!$store.state.class)}" type="number" placeholder="不知道说什么了,认真点,哼~" v-model="$store.state.class" clearable>
      <template slot="prepend">班级:</template>
    </el-input>
    <el-input :class="{ 'rad-border': (checked&&!$store.state.phone)}" type="number" placeholder="联系不上是没有奖励的(任性" v-model="$store.state.phone" clearable>
      <template slot="prepend">手机:</template>
    </el-input>
    <div class="section">
      <h5>
        本次答题限时 15 分钟。
      </h5>
    </div>
    <el-button type="primary" @click="checkTable" round>让我们开始吧</el-button>
  </div>
</template>
<script>
export default {
  name: "checkin",
  data() {
    // console.log(BASE_URL);
    this.$store.state.routerPush = (string)=>{
      return this.$router.push(string);
    }
    return {
      checked: false,
    }
  },
  mounted(){
    this.$http.post(
      '/api/getTitle', 
      JSON.stringify({id: Number(this.$route.params.id)})
    ).then(function(res) {
        console.log(res);
        if(res.data.code == 200){
          this.$store.state.title = res.data.data.title;
          document.title = res.data.data.title + '--学生会答题系统';
          this.$store.state.DocTitle = res.data.data.title + '--学生会答题系统';
        }else{
          alert("服务器错误，请联系系统管理员！\n 错误信息:"+res.data.message);
        }
      }, function(err) {
        alert("服务器错误，请联系系统管理员！")
        console.log("err" + err);  
    })
  },
  methods:{
    checkTable: function(){
      let state = this.$store.state;
      if(!(state.name && state.number && state.school && state.class && state.phone)){
        this.$notify.error({
          title: '好像哪里不太对(●ˇ∀ˇ●)',
          message: '亲的信息还没有填全面(●ˇ∀ˇ●)'
        });
        this.checked = true;
        return false;
      }
      let re = /^1\d{10}$/;
      if (!re.test(state.phone)) {
        this.$notify.error({
          title: '好像哪里不太对(●ˇ∀ˇ●)',
          message: '手机号好像不太对劲的说(●ˇ∀ˇ●)'
        });
        return false;
      }
      re = /^\d{10}$/
      if (!re.test(this.$store.state.number)) {
        this.$notify.error({
          title: '好像哪里不太对(●ˇ∀ˇ●)',
          message: '学号好像不太对劲的说(●ˇ∀ˇ●)'
        });
        return false;
      }
      if (!re.test(this.$store.state.class)) {
        this.$notify.error({
          title: '好像哪里不太对(●ˇ∀ˇ●)',
          message: '班号好像不太对劲的说(●ˇ∀ˇ●)'
        });
        return false;
      }
      this.$store.state.power = 1;
      this.$router.push({name: 'survey'});
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
.rad-border > * {
  /* color: red; */
  border: 1px solid #ce2121;
  transition: border-color 0.2s;
}
.el-input > * {
  transition: border-color 0.2s;
}
</style>

