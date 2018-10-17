<template>
  <div>
    <h1>
      欢迎光临学生会问卷系统
    </h1>
    <el-row>
      <el-col class="box-col" :lg="6" :md="8" :sm="12" :xs="24" v-for="(i, index) in indexData" :key="index">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{i.t}}</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <div class="text item">
            {{i.o}}
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>

</template>

<script>
export default {
  name: "index",
  data (){
    return {
      indexData:[
        {
          t: "方便易用",
          o: "按照模板添加题库,一键导入"
        },
        {
          t: "直观明显",
          o: "后天可以直接看到答卷的实时数据,玩法多样可拓展"
        },
        {
          t: "开源免费",
          o: "整套系统自主开发,可拓展性强"
        },
        {
          t: "上面都是胡扯",
          o: "没开发完在这里BB个球,滚去写代码"
        }
      ]
    }
  }
}
</script>

<style>
  .text {
    font-size: 14px;
    white-space:normal;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-col{
    padding: 10px;
  }

  .box-card {
    width: 100%;
  }

</style>
