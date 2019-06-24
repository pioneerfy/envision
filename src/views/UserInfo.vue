<template>
    <div class="sbody ">
        <div class="con-top clearFix">
            <div class="con-top-l fl">
                <div class="head">
                    <form id="headForm" enctype="multipart/form-data">
                        <div id="head" :style="{backgroundImage: 'url('+ url + userInfoData1.userHead + ')'}"></div>
                    </form>
                </div>
                <div class="username">
                    <h2 id="user_name"><div v-if="userInfoData1.userName">{{userInfoData1.userName}}</div><div v-else>{{userInfoData1.userTelephone}}</div></h2>
                    <p>用户等级: <span id="user_level">{{userlevel}}</span></p>
                    <p>剩余积分: <span id="user_point">{{userInfoData1.userPoint}}</span> <router-link to="/point">去使用 ></router-link></p>
                </div>
            </div>
            <div class="con-top-r fr">
                <ul>
                    <li>绑定手机: <span id="user_tel">{{userInfoData1.userTelephone}}</span><span></span></li>
                    <li>绑定邮箱: <span id="user_email">{{userInfoData1.userEmail}}</span><router-link id='getAccountSafe' to="/accountSafe" v-if="!userInfoData1.userEmail">去绑定</router-link></li>
                    <li> <router-link id='getPersonInfo' to="/personalInfo">修改个人资料 ></router-link></li>
                </ul>
            </div>
        </div>
        <div class="con-bottom">
            <ul class="flex">
                <li>
                    <h5>待付款的订单：<span id="orders_0_count">{{userInfoData2.order_0}}</span></h5>
                    <div class="iconfont icon-zhifu"></div>
                    <router-link to="/myOrders/orders1">查看待付款的订单 ></router-link>
                </li>
                <li>
                    <h5>待发货的订单：<span id="orders_2_count">{{userInfoData2.order_1}}</span></h5>
                    <div class="iconfont icon-che"></div>
                    <router-link to="/myOrders/orders2">查看待发货的订单 ></router-link>
                </li>
                <li>
                    <h5>退款中的订单：<span id="orders_1_count">{{userInfoData2.order_2}}</span></h5>
                    <div class="iconfont icon-shouhoutuikuan"></div>
                    <router-link to="/refund/refund1">查看退款中的订单 ></router-link>
                </li>
                <li>
                    <h5>我的心愿单：<span id="fav_count">{{userInfoData2.countFav}}</span></h5>
                    <div class="iconfont icon-xin"></div>
                    <router-link to="/fav">查看我的心愿单 ></router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

    export default {
        name: "user-info",
        data() {
            return {
                userInfoData1:{},
                userInfoData2:{},
                userlevel:'',
                url:''
            }
        },
        created(){
            let uuid=JSON.parse(localStorage.getItem('userinfo')).uuid
            this.url = localStorage.getItem('URL')
            this.$http.post('/user/getUserInfo.do', this.$qs.stringify({uuid:uuid})).then((res)=>{
                console.log(res)
                this.userInfoData1=res.data.data[0]
                this.userInfoData2=res.data.data[1]
                switch (res.data.data[0].userLevel){
                    case 0:this.userlevel='普通用户';break;
                    case 1:this.userlevel='白银会员';break;
                    case 2:this.userlevel='钻石会员';break;
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
        methods:{

        }
    }
</script>

<style scoped lang="less">
    @import '../assets/fonts/fonts-s/iconfont.css';
    .con-top{
        padding: 30px 100px 0 100px;
        border-bottom: 1px solid #888888;
        background-color: #f5f8fa;
    }
    .head{
        display: inline-block;
    }
    #head{
        width: 200px;
        height: 200px;
        border-radius: 50%;
        border: 5px solid white;
        background-size: cover;
        background-position: center;
        background-color: white;
        box-shadow: 0 3px 10px -3px #a8a8a8;
        margin-bottom: 20px;
    }
    .con-bottom{
        padding: 30px 50px;
        background-color: white;
    }
    #head-msg{
        color: red;
        height: 21px;
    }
    #headForm{
        position: relative;
        text-align: center;
    }
    #edit-head{
        position: absolute;
        clip: rect(0,0,0,0);
    }
    #edit-head-btn{
        display: inline-block;
        width: 120px;
        padding: 8px 20px;
        border-radius: 5px;
        background-color: #111111;
        color: white;
        cursor: pointer;
        margin-bottom: 20px;
        transition: all .2s;
        border: 1px solid #cccccc;
        font-size: 12px;
    }
    #edit-head-btn:hover{
        background-color: #383838;
        border: 1px solid #333333;
    }
    .username{
        display: inline-block;
        padding: 10px 40px;
        vertical-align: top;
        color: #616161;
    }
    .username a{
        font-size:12px;
        color: red;
    }
    .username a:hover{
        text-decoration: underline;
    }
    h2{
        font-weight: 400;
        font-size: 24px;
        color: #616161;
        margin-bottom: 20px;
    }
    .username p{
        font-size:12px;
    }
    #user_level{
        display: inline-block;
        padding: 5px 8px;
        background-color: #111111;
        color: white;
        border-radius: 5px;
    }
    .username p:nth-child(3) span{
        color: #8bc34a;
        font-weight: bold;
        margin-right: 10px;
    }
    .username p:nth-child(4) span{
        color: #8bc34a;
        font-weight: bold;
    }
    .username p:nth-child(3){
        margin: 20px 0;
    }
    .con-top-r{
        padding: 60px 20px;
    }
    .con-top-r li{
        font-size: 12px;
        margin-bottom: 20px;
    }
    .con-top-r li a{
        font-size: 12px;
        color: red;
        cursor: pointer;
    }
    .con-top-r li a:hover{
        text-decoration: underline;
    }
    #user_email+a{
        display: inline-block;
        padding: 8px 20px;
        border-radius: 5px;
        background-color: white;
        cursor: pointer;
        transition: all .2s;
        border: 1px solid #cccccc;
        margin-left: 10px;
        position: relative;
        z-index: 1;
        color: black;
    }
    #user_email+a:before{
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 0;
        height: 100%;
        background-color: #111;
        z-index: -1;
        transition: all 0.5s ease;
        border-radius: 5px;
    }
    #user_email+a:hover{
        color: white;
    }
    #user_email+a:hover:before{
        width: 100%;
    }
    .con-bottom ul li{
        text-align: center;
        padding: 20px;
    }
    .con-bottom ul li a{
        font-size:14px;
        color: black;
    }
    .con-bottom ul li a:hover{
        color: red;
        text-decoration:underline ;
        cursor: pointer;
    }
    .content .iconfont{
        width: 110px;
        height: 110px;
        border-radius: 50%;
        color: white;
        text-align: center;
        font-size: 65px;
        line-height: 110px;
        margin: 20px auto;
    }
    .con-bottom ul li:nth-child(1) div{
        background-color: #ffab00;
    }
    .con-bottom ul li:nth-child(2) div{
        background-color: #8bc34a;
    }
    .con-bottom ul li:nth-child(3) div{
        background-color: #2196f3;
    }
    .con-bottom ul li:nth-child(4) div{
        background-color: red;
    }
    h5{
        font-size: 18px;
        font-weight: 400;
        margin-bottom: 20px;
    }
    h5 span{
        color: red;
    }
</style>