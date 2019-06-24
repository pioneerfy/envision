<template id="header">
    <header>
        <!--顶部黑色导航-->
        <nav class="nav-top">
            <ul class="nav-left">
                <li>区域：中国</li>
                <li>语言：简体中文</li>
                <li class="piont-mall" @click="$router.push({path:'/point'})">积分商城</li>
                <li v-if="this.auth===1" @click="$router.push({path:'/manage'})">后台管理</li>

            </ul>
            <ul class="nav-right">
                <li class="user-li" v-if="userinfo !==null">{{userinfo.username}}<span class="iconfont icon-xiala"></span>
                    <div class="user-panel">
                        <div class="up-line usercenter" @click="$router.push({name:'userInfo'})">个人中心</div>
                        <div class="up-line myorders" @click="$router.push({name:'allOrders'})">我的订单</div>
                        <div class="up-line logout" @click="logout()">退出登录</div>
                    </div>
                </li>
                <li id="login" v-if="userinfo ===null" @click="$router.push({name:'lg'})">登录</li>
                <li id="register" v-if="userinfo ===null" @click="$router.push({name:'rg'})">注册</li>
                <li class="cart-li" @click="$router.push({name:'shopCart'})">购物车 <span class="iconfont icon-gouwuche"></span></li>
                <li class="help-li">帮助中心 <span class="iconfont icon-xiala"></span>
                    <div class="help-panel">
                        <h3 class="help-title">如何获得我们的帮助？</h3>
                        <p class="help-p">想要咨询任何有关网站，产品或品牌服务的信息？</p>
                        <p class="help-p">我们随时在这里帮助您.</p>
                        <div class="help-linkwrap">
                            <router-link to="/help" class="help-link">常见问题</router-link>
                            <router-link to="" class="help-link">安全条款</router-link>
                            <router-link to="" class="help-link">隐私说明</router-link>
                            <router-link to="" class="help-link">使用条款</router-link>
                        </div>
                    </div>
                </li>
            </ul>
        </nav>
        <!--logo和导航还有搜索框-->
        <section class="h-nav">
            <h1 class="h-logo "><a href="/"><img src="../assets/logo.png" alt="易美逊购物商城"></a></h1>
            <nav class="main-nav">
                <router-link to="/" class="nav-link">首页</router-link>
                <router-link to="/dior" class="nav-link">迪奥</router-link>
                <router-link to="/armani" class="nav-link">阿玛尼</router-link>
                <router-link to="/givenchy" class="nav-link">纪梵希</router-link>
                <router-link to="/chanel" class="nav-link">香奈儿</router-link>
                <router-link to="/ysl" class="nav-link">圣罗兰</router-link>
            </nav>
            <SearchPoint></SearchPoint>
        </section>
    </header>
</template>

<script>
    import SearchPoint from './searchPoint.vue'
    export default {
        name: "heads",
        data(){
            return {
                userinfo:'',
                user:{
                    'uuid':'92628a3fbd1044b2aa5c78ccbaf1e7f2',
                    'username':'苏小博'
                },
                auth:2
            }
        },
        methods:{
            //退出登录
            logout(){
                localStorage.removeItem('userinfo')
                this.$router.push({name:'lg'})
            }
        },
        created() {
            // localStorage.setItem('userinfo',JSON.stringify(this.user));

            this.userinfo=JSON.parse(localStorage.getItem('userinfo'));
            if (JSON.parse(localStorage.getItem('userinfo'))!==null){
                this.auth = this.userinfo.identity_id
            }
        },
        components:{
            SearchPoint
        }
    }
</script>

<style scoped>
    @import '../assets/css/header.css';
    @import '../assets/fonts/fonts-s/iconfont.css';
</style>