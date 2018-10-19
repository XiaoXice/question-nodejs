<template>
  <el-collapse v-loading="loading" accordion class="suvey-main">
    <el-header style="position: fixed;z-index:999;left:0;top:0; width:100vw;">
      <el-row type="flex" class="header" justify="space-around">
        <div class="header-text header-col">{{title}}</div>
      </el-row>
    </el-header>
    <el-collapse-item :index="index" class="suvey-part" v-for="(item, index) in items" :key="index">
      <template slot="title">
        <div :class="{ finished: isFinished(index)}">第 {{index+1}} 部分-{{item.title}} ({{theChooseNum(index)}}/{{item.questions.length}})</div>
      </template>
      <div v-if="item.type == 0">
        <div class="section" v-for="(question, Qindex) in item.questions" :key="question.QID">
          <p>{{ Qindex + 1 }}.{{ question.text }}</p>
          <div>
            <el-radio v-for="(option, Oindex) in question.options" :key="Oindex" v-model="question.answer" :label="option.oid">{{alphabet(Oindex)}}.{{option.context}}</el-radio>
          </div>
        </div>
      </div>
      <div v-else-if="item.type == 1">
        <div class="section" v-for="(question, Qindex) in item.questions" :key="question.QID">
          <p>{{ Qindex + 1 }}.{{ question.text }}</p>
          <div>
            <el-radio v-for="(option, Oindex) in question.options" :key="Oindex" v-model="question.answer" :label="option.oid">{{option.context}}</el-radio>
            <!-- <el-radio v-model="question.answer" :label="1">正确</el-radio>
            <el-radio v-model="question.answer" :label="0">错误</el-radio> -->
          </div>
        </div>
      </div>
      <div v-else-if="item.type == 2">
        <div class="section" v-for="(question, Qindex) in item.questions" :key="question.QID">
          <p>{{ Qindex + 1 }}.{{ question.text }}</p>
          <div>
            <el-input v-model="question.answer" placeholder="请输入内容"></el-input>
          </div>
        </div>
      </div>
    </el-collapse-item>
    <div class="button-flex-cent">
      <el-button type="primary" :disabled="!isAllFinished() || finished" @click="sendPaper" round>提交答案</el-button>
    </div>
  </el-collapse>
</template>

<script>
var clock = function(callback){
  var toString = (second)=>{
    this.title = "剩余时间: "+Math.floor(this.timeLim/60)+":"+this.timeLim%60;
  }
  var waitASecond = async ()=>{
    await new Promise((rec)=>{
      setTimeout(()=>{rec();},1000);
    })
    return 0;
  }
  var begin = async()=>{
    for(;this.timeLim>=0 && !this.finished && !this.back;this.timeLim--){
      toString(this.timeLim);
      await waitASecond(this.timeLim);
    }
    callback()
  }
  return {
    begin
  }
}
export default {
  name: "survey",
  mounted(){
    let titleList = ['判断题','选择题','填空题'];
    let user = this.$store.state;
    //console.log(this);
    this.$http.post(
      '/api/getPaper',
      JSON.stringify({
        id: Number(this.$route.params.id),
        user:{ //用户信息
          name:user.name,
          number:user.number,
          school:user.school,
          class:user.class,
          phone:user.phone,
          // other:user.other || {},
        }
      })
    ).then(res=>{
      // console.log(res);
      if(res.data.code == 200){
        let out = [];
        for (const item of res.data.data.questions) {
          let questions = [];
          let type = item.data[0].type;
          for (const question of item.data) {
            questions.push({
              QID: question.qid,
              text: question.title,
              options: question.options,
              answer: '' 
            })
          }
          out.push({
            title: titleList[type],
            type: type,
            questions: questions
          })
        }
        this.$data.items = out;
        this.loading = false;
        // console.log(this);
        let clock1 = clock.call(this,()=>{
          if(this.isAllFinished()){
            this.sendPaper();
          }else{
            this.$alert("很抱歉您没有作答完毕，欢迎再次尝试。", "提示：",{
              confirmButtonText: '确定',
              callback: action => {
                // this.$router.replace({name: 'checkin'});
                this.$router.back();
              }
            })
          }
        });
        clock1.begin();
      }else{
        var errMsg = {
          400: "您已经挑战过一次了，请关注以后的活动",
          403: "活动尚未开始或已过期，别灰心，学生会好玩的活动有的是",
          404: "你可能到了外星球，这个活动我们没有",
          500: "%^&$%^%&^^$%^%$%"
        }
        this.$alert(errMsg[res.data.code]||res.data.message,"提示：",{
          confirmButtonText: '确定',
          callback: action => {
            // this.$router.replace({name: 'checkin'});
            window.location.href = "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MjM5NzY1MjYyMg==&scene=124#wechat_redirect";
          }
        })
      }
    },err=>{
      this.$alert("未知错误，请联系管理员或稍后再试", "错误：", {
          confirmButtonText: '确定',
          callback: action => {
            // this.$router.replace({name: 'checkin'});
            this.$router.back();
          }
        })
      console.log("err" + err)
    }).catch(err=>{
      this.$alert("未知错误，请联系管理员或稍后再试", "错误：",{
          confirmButtonText: '确定',
          callback: action => {
            // this.$router.replace({name: 'checkin'});
            this.$router.back();
          }
        })
      console.error(err);
    })
  },
  beforeDestroy(){
    this.data.back = true;
  },
  data() {
    return {
      timeLim: 900,
      finished: false,
      loading: true,
      items: null,
      back: false,
      title: this.$store.state.title,
      /*
        // items: [
        //   {
        //     // 部分
        //     title: "选择题",
        //     type: 0, // 0 选择 1 判断
        //     questions: [
        //       {
        //         // 题目
        //         QID: "", // 题目唯一标识
        //         text: "题目",
        //         options: [
        //           {Context: "第一个选项的内容选项的内容选项内容选项的内容选项的内容",ID:''},
        //           {Context: "第二个选项的内容选项的内容选项的内容选项的内容选项的内容选项的内容",ID:''},
        //           {Context: "第三个选项的内的内容选项的内容",ID:''},
        //           {Context: "第四个选项的内容选项的内容选项的内容选项的内容选项的内容选项的内容",ID:''},
        //           {Context: "第五个选项的",ID:''},
        //         ],
        //         answer: -1 // 第几个选项,从0开始数 这个暂存答案,用以提交
        //       }
        //     ]
        //   },
        //   {
        //     // 部分
        //     title: "判断题",
        //     type: 1, // 0 选择 1 判断
        //     questions: [
        //       {
        //         // 题目
        //         QID: "", // 题目唯一标识
        //         text: "题目",
        //         answer: -1 // 第几个选项,从0开始数 这个暂存答案,用以提交
        //       }
        //     ]
        //   },
        //   {
        //     // 部分
        //     title: "填空题",
        //     type: 2, // 0 选择 1 判断 2 填空
        //     questions: [
        //       {
        //         // 题目
        //         QID: "", // 题目唯一标识
        //         text: "题目",
        //         answer: '' // 第几个选项,从0开始数 这个暂存答案,用以提交
        //       }
        //     ]
        //   }
        // ]
      */
    };
  },
  methods: {
    theChooseNum: function(partNum) {
      //console.log(this.items);
      let count = 0;
      if(this.items){
        for (const question of this.items[partNum].questions) {
          if (question.answer != -1 && !(question.answer === '')) {
            count++;
          }
        }
        return count;
      }else
        return 0;
    },
    alphabet: function(num) {
      let table = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      return table[num];
    },
    isFinished: function(partNum){
      if(this.items && this.items[partNum].questions)
        return this.theChooseNum(partNum)==this.items[partNum].questions.length;
      else
        return false;
    },
    isAllFinished: function(){
      if(this.items){
        for(let index of [...Array(this.items.length).keys()]){
          if(!this.isFinished(index)){
            return false;
          }
        }
        return true;
      }else{
        return false;
      }
    },
    sendPaper: function(){
      if(!this.finished){
        this.finished = true;
        let out = [];
        for (const item of this.items) {
          for (const question of item.questions) {
            switch (item.type) {
              case 0:
              case 1:
                out.push({
                  oid: question.answer
                });
                break;
              case 2:
                out.push({
                  oid: question.options[0].oid,
                  context: question.answer
                })
                break;
              default:
                break;
            }
          }
        }
        this.$http.post(
          '/api/answer',
          JSON.stringify(out)
        ).then(res=>{
          if(res.data.code == 200){
            this.$store.state.score = res.data.data.score;
            this.$store.state.power = 2;
            this.$router.push({name: 'score'})
          }else{
            alert("提交失败\n 错误信息："+res.data.message);
          }
        },err=>{
          alert("服务器错误，请联系系统管理员！")
          console.log("err" + err)
        })
        //console.log("end");
      }
    }
  }
};
</script>


<style>
.el-radio + .el-radio {
  margin-left: 0;
}
.el-radio {
  margin: 10px 30px 10px 0;
  white-space:normal;
}
.finished {
  color: #3cde90;
  transition: color .5s;
}
.button-flex-cent {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 10px;
}

</style>
