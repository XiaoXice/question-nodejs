<template>
  <el-collapse accordion class="suvey-main">
    <el-collapse-item :index="index" class="suvey-part" v-for="(item, index) in items" :key="index">
      <template slot="title">
        <div :class="{ finished: isFinished(index)}">
          第 {{index+1}} 部分-{{item.title}} ({{theChooseNum(index)}}/{{item.questions.length}})
        </div>
      </template>
      <div v-if="item.type == 0">
        <div class="section" v-for="(question, Qindex) in item.questions" :key="question.QID">
          <p>
          {{ Qindex + 1 }}.
          {{ question.text }}
          </p>
          <div>
            <el-radio v-for="(option, Oindex) in question.options" :key="Oindex" v-model="question.answer" :label="option.oid">{{alphabet(Oindex)}}.{{option.context}}</el-radio>
          </div>
        </div>
      </div>
      <div v-else-if="item.type == 1">
        <div class="section" v-for="(question, Qindex) in item.questions" :key="question.QID">
          <p>
          {{ Qindex + 1 }}.
          {{ question.text }}
          </p>
          <div>
            <el-radio v-for="(option, Oindex) in question.options" :key="Oindex" v-model="question.answer" :label="option.oid">{{option.context}}</el-radio>
            <!-- <el-radio v-model="question.answer" :label="1">正确</el-radio>
            <el-radio v-model="question.answer" :label="0">错误</el-radio> -->
          </div>
        </div>
      </div>
      <div v-else-if="item.type == 2">
        <div class="section" v-for="(question, Qindex) in item.questions" :key="question.QID">
          <p>
          {{ Qindex + 1 }}.
          {{ question.text }}
          </p>
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
var clock = function(that, callback){
  var toString = (second)=>{
    that.$store.state.title = "剩余时间: "+Math.floor(that.timeLim/60)+":"+that.timeLim%60;
  }
  var waitASecond = async ()=>{
    await new Promise((rec)=>{
      setTimeout(()=>{rec();},1000);
    })
    return 0;
  }
  var begin = async()=>{
    for(;that.timeLim>=0 && !that.finished;that.timeLim--){
      toString(that.timeLim);
      await waitASecond(that.timeLim);
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
        // console.log(this);
        let clock1 = new clock(this,()=>{
          if(this.isAllFinished()){
            this.sendPaper();
          }else{
            alert("很抱歉您没有作答完毕，欢迎再次尝试。")
            this.$router.back();
          }
        });
        clock1.begin();
      }else{
        alert("服务器错误，请联系系统管理员！\n 错误信息:"+res.data.message);
      }
    },err=>{
      alert("服务器错误，请联系系统管理员！")
      console.log("err" + err)
    }).catch(err=>{
      console.error(err);
    })
  },
  data() {
    return {
      timeLim: 900,
      finished: false,
      items: null,
      itemsOld:[
        {
        "data": [{
          "qid": 22,
          "title": "霍启刚之妻，有跳水皇后之称的是郭晶晶",
          "type": 0,
          "options": [{
            "context": "正确",
            "oid": 83
            },
            {
            "context": "错误",
            "oid": 84
            }
          ]
          },
          {
          "qid": 23,
          "title": "推出空气污染深度调查《穹顶之下》的记者是杨澜",
          "type": 0,
          "options": [{
            "context": "正确",
            "oid": 85
            },
            {
            "context": "错误",
            "oid": 86
            }
          ]
          },
          {
          "qid": 29,
          "title": "《这个杀手不太冷》的女主角是娜塔莉·惠特曼",
          "type": 0,
          "options": [{
            "context": "正确",
            "oid": 97
            },
            {
            "context": "错误",
            "oid": 98
            }
          ]
          },
          {
          "qid": 28,
          "title": "“未若柳絮因风起”的作者是谢道韫吗？",
          "type": 0,
          "options": [{
            "context": "正确",
            "oid": 95
            },
            {
            "context": "错误",
            "oid": 96
            }
          ]
          },
          {
          "qid": 25,
          "title": "中国第一位在奥运会上获得金牌的女运动员是吴小旋",
          "type": 0,
          "options": [{
            "context": "正确",
            "oid": 89
            },
            {
            "context": "错误",
            "oid": 90
            }
          ]
          },
          {
          "qid": 30,
          "title": "人类的本质是复读机",
          "type": 0,
          "options": [{
            "context": "正确",
            "oid": 99
            },
            {
            "context": "错误",
            "oid": 100
            }
          ]
          },
          {
          "qid": 27,
          "title": "“因为爱过，所以慈悲；因为懂得，所以宽容。”是张爱玲的名句吗？",
          "type": 0,
          "options": [{
            "context": "正确",
            "oid": 93
            },
            {
            "context": "错误",
            "oid": 94
            }
          ]
          },
          {
          "qid": 26,
          "title": "年仅15岁英勇就义，毛泽东为其题字“生的伟大，死的光荣”的优秀共产党员是刘瑞兰吗？",
          "type": 0,
          "options": [{
            "context": "正确",
            "oid": 91
            },
            {
            "context": "错误",
            "oid": 92
            }
          ]
          },
          {
          "qid": 21,
          "title": "2016年《福布斯》公布全球百大名人榜榜首是l14y g1g1",
          "type": 0,
          "options": [{
            "context": "正确",
            "oid": 81
            },
            {
            "context": "错误",
            "oid": 82
            }
          ]
          },
          {
          "qid": 24,
          "title": "中国首位女航天员是刘洋",
          "type": 0,
          "options": [{
            "context": "正确",
            "oid": 87
            },
            {
            "context": "错误",
            "oid": 88
            }
          ]
          }
        ],
        "name": "选择"
        },
        {
        "data": [{
          "qid": 63,
          "title": "民国时期的四大才女有石评梅、张爱玲、庐隐和哪位？",
          "type": 1,
          "options": [{
            "context": "萧红",
            "oid": 169
            },
            {
            "context": "冰心",
            "oid": 170
            },
            {
            "context": "林徽因",
            "oid": 171
            },
            {
            "context": "陆小曼",
            "oid": 172
            }
          ]
          },
          {
          "qid": 53,
          "title": "曾建议扩大书馆，增设学士，代朝廷品评天下诗文，这位历史上才气非常的唐朝女子是?",
          "type": 1,
          "options": [{
            "context": "鱼玄机",
            "oid": 129
            },
            {
            "context": "武则天",
            "oid": 130
            },
            {
            "context": "上官婉儿",
            "oid": 131
            },
            {
            "context": "太平公主",
            "oid": 132
            }
          ]
          },
          {
          "qid": 67,
          "title": "以音域广、高音明亮著名，代表作有《天路》、《美丽的神话》、《那片海》的藏族女歌手是？",
          "type": 1,
          "options": [{
            "context": "降央卓玛",
            "oid": 185
            },
            {
            "context": "阿兰·达瓦卓玛",
            "oid": 186
            },
            {
            "context": "韩红",
            "oid": 187
            },
            {
            "context": "央金兰泽",
            "oid": 188
            }
          ]
          },
          {
          "qid": 58,
          "title": "演过《罗马假日》、《窈窕淑女》，晚年致力于慈善事业的女演员是？ ",
          "type": 1,
          "options": [{
            "context": "玛丽亚·凯莉",
            "oid": 149
            },
            {
            "context": "奥黛丽·赫本",
            "oid": 150
            },
            {
            "context": "艾玛·斯通",
            "oid": 151
            },
            {
            "context": "卡梅隆·迪亚茨",
            "oid": 152
            }
          ]
          },
          {
          "qid": 62,
          "title": "中国古代四大才女为蔡文姬、上官婉儿、卓文君还有？",
          "type": 1,
          "options": [{
            "context": "谢道韫",
            "oid": 165
            },
            {
            "context": "鱼玄机",
            "oid": 166
            },
            {
            "context": "李清照",
            "oid": 167
            },
            {
            "context": "上官婉儿",
            "oid": 168
            }
          ]
          }
        ],
        "name": "判断"
        },
        {
        "data": [{
          "qid": 40,
          "title": "《陆贞传奇》中的女主角借鉴的是哪个历史人物?",
          "type": 2,
          "options": [{
            "context": "",
            "oid": 110
          }]
          },
          {
          "qid": 37,
          "title": "第一位获得诺贝尔生理医学奖的华人科学家是？",
          "type": 2,
          "options": [{
            "context": "",
            "oid": 107
          }]
          },
          {
          "qid": 32,
          "title": "英法百年战争中的法国传奇女英雄是？",
          "type": 2,
          "options": [{
            "context": "",
            "oid": 102
          }]
          },
          {
          "qid": 38,
          "title": "美国史上第一位女性总统竞选人是？",
          "type": 2,
          "options": [{
            "context": "",
            "oid": 108
          }]
          },
          {
          "qid": 34,
          "title": "世界第一位女总统（阿根廷）是？",
          "type": 2,
          "options": [{
            "context": "",
            "oid": 104
          }]
          }
        ],
        "name": "问答"
        }
      ]
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
            alert("提交失败 \n 错误信息:"+res.data.message);
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
