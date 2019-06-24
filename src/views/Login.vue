<template>
    <div class="lg-main">
        <div class="top-div">
            <h1 id="lg">
                <a href="/">
                    <img src="../assets/logo.png">
                </a>
            </h1>
            <div class="war-div">
                <!--<p>依据网络安全法律法规，请认真阅读用户<a href="/">《隐私政策》</a></p>-->
            </div>
        </div>
        <section class="big-section">
            <div class="bigBox clear">
                <!-- 登录框 -->
                <div class="lg">
                    <!-- 登录选项 -->
                    <div class="tab">
                        <!-- 密码登录 -->
                        <div class="tabLeft" v-bind:class="{ active: showUser}" @click="userTab">密码登录</div>
                        <!-- 手机验证登录 -->
                        <div class="tabRight" v-bind:class="{ active: showPhone}" @click="phoneTab">验证码登录</div>
                    </div>
                    <div class="lgContent">
                        <div class="warDiv"></div>
                        <LoginForm :showUser="showUser" :showPhone="showPhone"/>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import LoginForm from "../components/login/loginForm";
    export default {
        name: "Login",
        components: {LoginForm},
        data() {
            return {
                showUser: true,
                showPhone: false,
            }
        },
        methods: {
            userTab() {
                this.showUser=true;
                this.showPhone=false
                // console.log(this.$route)
            },
            phoneTab() {
                this.showUser=false;
                this.showPhone=true
            },
        }
    }
</script>

<style scoped>
    /*@import '../assets/css/login.css';*/
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
    /* 警告框 */
    .warDiv{
        margin-top: 16px;
        min-height: 19px;
        margin-bottom: 5px;
        line-height: 1.5;
        display: block;
        width: 500px;
        float: right;
        transition: all linear .2s;
    }
    h1 img{
        width: 100%;
        height: 100%;
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
    .lg{
        width: 360px;
        height: 450px;
        box-shadow: #666 0 0 10px;
        float: right;
        background: #ffffff;
    }
    .tab{
        border-bottom: 1px solid #cccccc;
        font-size: 0;
    }
    /* 登录选项 */
    .tabLeft,.tabRight{
        width: 50%;
        display: inline-block;
        vertical-align: top;
        text-align: center;
        color: #cccccc ;
        font-size: 18px ;
        font-weight: 700 ;
        line-height: 50px;
        cursor: pointer;
        position: relative;
    }
    .tabLeft::after{
        position: absolute;
        top: 15px;
        right: 0;
        width: 1px;
        height: 20px;
        background-color: #ccc;
        content: '';
        font-size: 0;
        line-height: 0;
    }
    .lgContent{
        padding: 0px 30px 0px 30px;
    }
    .active{
        color: #333333;
    }
</style>