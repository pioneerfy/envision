<template>
    <div class="parent">
        <header class="manage-head">
            <div class="logo-wrap"><h1 class="manageHead-logo"><a href="/"><img src="../assets/logo.png" alt="易美逊购物商城"></a></h1></div>
            <div class="userinfo">
                <a href="javascript:;" style="margin-right: 40px">用户名: <span>{{username}}</span> </a>
                <a href="javascript:;" @click="logout()">退出登录</a>
            </div>
        </header>
        <main class="manage-main">
            <nav class="manage-nav">
                <el-col :span="12">
                    <el-menu
                            :default-active="this.$route.path"
                            class="el-menu-vertical-demo"
                            background-color="#545c64"
                            text-color="#fff"
                            :router="true"
                            active-text-color="#ffd04b">

                        <el-menu-item index="/manage">
                            <i class="el-icon-location"></i>
                            <span>首页</span>
                        </el-menu-item>

                        <el-submenu index="/manage/goodsList">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>商品管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="/manage/goodsList">商品列表</el-menu-item>
                            </el-menu-item-group>

                        </el-submenu>

                        <el-menu-item index="/manage/HOrder">
                            <i class="el-icon-document"></i>
                            <span slot="title">订单管理</span>
                        </el-menu-item>

                        <el-menu-item index="/manage/backStage_Itemevaluate">
                            <i class="el-icon-setting"></i>
                            <span slot="title">评价管理</span>
                        </el-menu-item>


                    </el-menu>
                </el-col>
            </nav>
            <div class="manage-content">
                <router-view/>
            </div>
        </main>
    </div>
</template>

<script>
    export default {
        name: "manage",
        data(){
            return {
                username:'',
            }
        },
        methods:{
            logout(){
                localStorage.removeItem('userinfo')
                this.$router.push({name:'lg'})
            }
        },
        created() {
            //获取username
            this.username = JSON.parse(localStorage.getItem('userinfo')).username
        }
    }
</script>

<style >
#app{
    width: 100%;
    height: 100%;
}
.parent{
    width: 100%;
    height: 100%;
}
.manage-head{
    width: 100%;
    height: 54px;
    background-color: #545c64;
    display: flex;
    justify-content: space-between;
}
.logo-wrap{
    width: 10%;
    height: 100%;
    overflow: hidden;
}
.manageHead-logo{
    height: 46px;
    width: 90px;
    background-color: #fff;
    margin: 4px auto;
}
.manageHead-logo img{
    width: 100%;
    height: 100%;
}
.userinfo{
    height: 100%;
    margin: 0 100px;
    line-height: 54px;
}
.userinfo a{
    color: #ffffff;
    font-weight: 400;
}
.userinfo a span{
    color:  rgb(255, 208, 75);
}
.manage-main{
    width: 100%;
    height: calc(100% - 54px);
    background-color: #d1ffc8;
}
.manage-nav{
    float: left;
    width: 10%;
    height: 100%;
    background-color: #545c64;
}
.el-col.el-col-12{
    width: 100%;
}
.el-menu{
    border: none;
}
.el-menu-item{
    height: 63px;
    line-height: 63px;

}
.el-submenu .el-menu-item{
    width: 100%;
    min-width: unset;
}
.el-submenu{
    width: 100%;
}
.el-menu-item-group{
    width: 100%;
}
.manage-content{
    height: 100%;
    background-color: #ffffff;
    margin-left: 10%;
    overflow: auto;
    padding-bottom: 50px;
}
.title{
    width: 100%;
    height: 45px;
    line-height: 45px;
    border-bottom: 1px solid #444444;
    padding-left: 15px;
}
</style>