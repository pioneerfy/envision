<template>
    <div class="reg-main">
        <div class="top-div">
            <h1 id="lg">
                <a href="/">
                    <img src="../assets/logo.png">
                </a>
            </h1>
        </div>
        <section class="big-section">
            <div class="bigBox clear">
                <!-- 注册框 -->
                <div class="rg">
                    <!-- 注册、登录选项 -->
                    <div class="tab">
                        <!-- 用户注册 -->
                        <div class="tabLeft">用户注册</div>
                        <!-- 跳转登录 -->
                        <div class="tabRight">已注册直接&nbsp;<router-link to="lg">登录</router-link></div>
                    </div>
                    <RegisterForm/>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import RegisterForm from "../components/register/registerForm";
    export default {
        name: "Register",
        components: {RegisterForm},
    }
</script>

<style scoped>
    /*@import '../assets/css/register.css';*/
    @import '../assets/fonts/fonts-s/iconfont.css';
    .clear::before,
    .clear::after{
        display: table;
        content: '';
    }
    .clear::after{
        clear: both;
    }
    .top-div{
        width: 1170px;
        height: 110px;
        padding: 15px;
        margin: 0 auto;
    }
    h1{
        width: 170px;
        height: 80px;
        float: left;
        transition: all linear .2s;
    }

    .mg{
        line-height: 80px;
        text-align: right;
    }
    .mg a{
        display: inline-block;
        text-align: right;
        font-size: 12px;
        color: #222222;
    }

    h1 img{
        width: 100%;
        height: 100%;
    }
    .big-section{
        background: #ffffff;
        background: url("../assets/images/dxm/bg.jpg");
        /*background-position: -350px 0;*/
        background-repeat: no-repeat;
        background-size: cover;
    }
    .bigBox{
        width: 1170px;
        margin: 0 auto;
        padding-right: 200px;
        padding-top: 50px;
        padding-bottom: 80px;
    }
    .rg{
        width: 360px;
        height: 540px;
        box-shadow: #666 0 0 10px;
        float: right;
        background: #ffffff;
    }
    .tab{
        padding-left: 30px;
        padding-right: 30px;
        border-bottom: 1px solid #cccccc;
        font-size: 0;
    }
    /* 注册、登录选项 */
    .tabLeft,.tabRight{
        width: 50%;
        display: inline-block;
        vertical-align: top;
        line-height: 50px;
        position: relative;
    }
    .tabLeft{
        text-align: left;
        font-size: 18px;
        color: #333333;
        font-weight: 700;
        padding-left: 10px;
    }
    .tabRight{
        text-align: right;
        color: #999999;
        font-size: 14px;
        font-weight: normal;
        padding-right: 10px;
    }
    .tabRight a {
        transition: all linear .2s;
        color: #666666;
    }
    .tabRight a:hover{
        color: #333333;
        text-decoration: underline;
    }
</style>