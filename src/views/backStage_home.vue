<template>
    <el-container id="back-container">
      <el-header class="header">
        <!-- logo -->
        <div id="logoImg">
          <img src="../assets/logo.png" alt>
        </div>
        <div class="header-content">
          <span>欢迎 {{userName}}</span>
          <span>修改密码</span>
          <span><a href="javascript:;" @click="quit">退出</a> </span>
        </div>
      </el-header>
      <el-container class="container">
        <el-aside id="aside" style="width:150px">
          <el-row class="tac">
            <el-col>
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
              >
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span><router-link to='/backStage_home' class="bc_link">首页</router-link></span>
                  </template>
                </el-submenu>
                <el-submenu index="2">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>商品管理</span>
                  </template>
                  <el-menu-item-group class="item-group">
                    <el-menu-item index="2-1"><router-link to='/backStage_home/backStage_Itemshopping' class="bc_link">商品信息</router-link></el-menu-item>
                    <el-menu-item index="2-2"><router-link to='/backStage_home/backStage_Itemspecification' class="bc_link">商品规格</router-link></el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span><router-link to='/backStage_home/backStage_Itemorders' class="bc_link">订单管理</router-link></span>
                  </template>
                </el-submenu>
                <el-submenu index="4">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span><router-link to='/backStage_home/backStage_Itemevaluate' class="bc_link">评价管理</router-link></span>
                  </template>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>
<script>
export default {
    name:'backStage_home',
    data(){
        return{
            uuid:'',
            userName:''
        }
    },

  created() {
      this.uuid = JSON.parse(localStorage.getItem("userinfo")).uuid ;
    this.userName= JSON.parse(localStorage.getItem('userinfo')).username;
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },

    // 退出按钮
    quit(){
        localStorage.removeItem('userinfo').uuid;
        localStorage.removeItem('userinfo').username;
        this.$router.push('/lg')
        // console.log('已经退出了')
    }
  }
};
</script>
<style scoped>
@import "../assets/css/backStage_home.css";
</style>

