<template>
  <el-container>
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['2', '3']">
        <el-menu-item @click="goTo({name: 'admin'})" index="1">首页</el-menu-item>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-message"></i>答卷管理</template>
          <el-menu-item-group>
            <template slot="title">操作</template>
            <el-menu-item @click="goTo({name: 'newApaper'})" index="2-1">创建问卷</el-menu-item>
            <!-- <el-menu-item index="2-2">选项2</el-menu-item> -->
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">查看</template>
            <el-menu-item index="2-2">我创建的问卷</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!-- <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>导航二</template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu> -->
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-setting"></i>系统管理</template>
          <el-menu-item index="3-1">用户管理</el-menu-item>
          <el-menu-item index="3-2">首页管理</el-menu-item>
          <el-menu-item index="3-3">退出系统</el-menu-item>
          <!-- <el-menu-item-group>
            <template slot="title">用户管理</template>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="3-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="3-4">
            <template slot="title">选项4</template>
            <el-menu-item index="3-4-1">选项4-1</el-menu-item>
          </el-submenu> -->
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
export default {
    name: "admin-index",
    data (){
      this.$store.state.title = "后台管理"
      return {
        
      }
    },
    methods: {
      goTo: function (path){
        this.$router.push(path);
      }
    }
}
</script>

<style> 
  .el-aside {
    color: #333;
  }

</style>