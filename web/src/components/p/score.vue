<template>
    <el-collapse accordion class="suvey-main">
        <el-card class="box-card green-color">
            <div class="score">{{$store.state.score}}</div>
            <div class="other-text">你的最终得分</div>
            <div style="font-size: 0.25rem;" class="other-text">分享到朋友圈,叫小伙伴们一起来答题</div>
        </el-card>
        <el-card class="box-card">
            <img class="img" src="/static/bupt_wx.svg">
            <div class="other-text">欢迎继续关注北邮学生会公众号<br/>获取相关活动一手资讯</div>
        </el-card>
    </el-collapse>
</template>

<script>
export default {
    name: "score",
    data(){
        return {

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
            document.title = "我在" + res.data.data.title + "得到" + this.$store.state.score + "分的好成绩,快来试试吧";
            this.$store.state.DocTitle = document.title;
            }else{
            alert("服务器错误，请联系系统管理员！\n 错误信息:"+res.data.message);
            }
        }, function(err) {
            alert("服务器错误，请联系系统管理员！")
            console.log("err" + err);  
        })
  },
}
</script>

<style scoped>
.box-card {
    max-width: 480px;
    width: 90%;
    display : flex;
    flex-direction: column;
    flex-wrap: wrap;
    flex-flow: center;
    margin: 10px;
}

.green-color {
    background-color: aquamarine;
}
.score{
    text-align:center;
    font-size: 2rem;
}
.other-text{
    text-align:center;
    color: gray;
    font-size: 0.3rem;
}

.suvey-main{
    display : flex;
    flex-direction: column;
    flex-wrap: wrap;
    flex-flow: center;
    align-items: center;
    justify-content: center;
}

.img{
    width: 80%;
    margin: 10%;
}
</style>
