<template>
    <div>
        <Head></Head>
        <main class="main">
            <div class="cart-top">
                <div class="cart-step">
                    <div class="step-icon"><span class="iconfont icon-diyibu"></span></div>
                    <h2 class="step-word">我的购物车</h2>
                    <div class="step-line step-line1"></div>
                </div>
                <div class="cart-step">
                    <div class="step-icon"><span class="iconfont icon-dierbu"></span></div>
                    <h2 class="step-word">确认并提交订单</h2>
                    <div class="step-line step-line2"></div>
                </div>
                <div class="cart-step">
                    <div class="step-icon"><span class="iconfont icon-disanbu"></span></div>
                    <h2 class="step-word">支付</h2>
                    <div class="step-line step-line3"></div>
                </div>
            </div>

            <div class="pay-info">
                <!--图标-->
                <div class="pay-icon">
                    <span class="iconfont icon-chenggong"></span>
                </div>
                <!--内容-->
                <div class="pay-content">
                    <div class="pc-top">
                        <div class="pt-title">
                            <h3 class="pt-h3">  订单提交成功，请付款!</h3>
                            <p class="ordernum">订单号：<span class="ordernum-value">{{this.orderNo}}</span></p>
                            <p class="pt-tips">请在下单后尽快完成支付</p>
                        </div>
                        <div class="pt-money">
                            <p class="price">待支付金额：<span class="price-value">{{(this.orderData.unpay_amount)}}</span>元</p>
                        </div>
                    </div>
                    <!--内容底部-->
                    <div class="pc-bottom">
                        <p class="addr-info">{{this.orderData.order_address}}</p>
                        <p class="goods-info"><span class="goods_name">{{this.orderData.goods_name}}</span></p>
                        <p class="order-time">{{this.orderData.order_time}}</p>
                    </div>
                </div>
            </div>

            <div class="pay-bottom">
                <div class="pay-style">
                    <p class="style-left">支付方式：</p>
                    <div class="style-content">
                        <div class="style-wrap stylewrap-active" >
                            <p id="money" v-if="isPoint==null">余额支付</p>
                            <p id="point" v-if="isPoint!==null">积分支付</p>
                        </div>
                    </div>
                    <div class="pay-tips">
                        <p v-if="isPoint==null">待支付金额：<span class="pay-value">￥{{this.orderData.unpay_amount}}</span>元</p>
                        <p v-if="isPoint!==null">待支付积分：<span class="pay-value">{{0}}</span>分</p>
                    </div>
                    <div class="relsult" v-if="isPoint==null">
                    <p>可用余额：<span class="p-in">￥{{money}}</span>元</p>
                    </div>
                </div>
                <!--<div class="pay-code" v-if="isPoint==null">-->
                    <!--<button class="pay-btn" type="button" @click="pay()" >去付款</button>-->
                <!--</div>-->

                <div class="pay-pwd" >
                    <div class="safe" ><span class="iconfont icon-AK-MNdunpai_fill"></span><span class="safeword">{{safe}}</span></div>
                    <div class="pay-pass">
                        <p class="pwd-word">支付密码：</p>
                        <div class="pwd-line">
                            <input type="tel" class="rel-pwd" @focus="checkSafe()" @keyup="getPwdValue()" @keydown="delNum()" maxlength="6" v-model="realInput">
                            <span class="forgetpwd" @click="$router.push({name:'accountSafe'})">忘记密码？</span>
                            <ul class="write-pwd">
                                <li  v-for="(disInput,index) in disInputs" :key="index"><input type="password" maxlength="1" v-model="disInput.value"></li>
                            </ul>
                            <p class="pwd-tips">请输入6位支付密码</p>
                        </div>
                        <div class="paybtn-line">
                            <button class="pay-btn" type="button" @click="pay()" :class="{'abled':btnState}" :disabled="btnState">确认付款</button>
                        </div>
                        <p class="nopay">{{nopay}}</p>
                    </div>
                </div>
            </div>
        </main>
        <Foot></Foot>
    </div>
</template>

<script>
    import Head from '@/components/head.vue'
    import Foot from '@/components/foot.vue'
    import  qs  from 'qs'
    export default {
        name: "pay",
        components:{
            Head,Foot
        },
        data(){
            return{
                orderNo:'',
                isPoint:'',
                orderData : '',
                safe:'安全保障中',
                safeState:false,
                disInputs:[{value:''},{value:''},{value:''},{value:''},{value:''},{value:''}],
                realInput:'',
                nopay:'',
                payTimes:3,
                btnState:'',
                money:54958
            }
        },
        methods:{
            //获取订单的基础信息
            getOrderInfo(){
                this.$http.get('/order/selectOrder.do',{
                    params:{
                        orderNo:this.orderNo,
                        // uuid:'92628a3fbd1044b2aa5c78ccbaf1e7f2',
                        uuid:JSON.parse(localStorage.getItem('userinfo')).uuid
                    }
                })
                    .then((res)=>{
                        console.log(res);
                        if (res.data.returncode ==='200'){
                            this.orderData = res.data.data[0]
                            this.isClick()
                        }

                    })
                    .catch((err)=>{
                        console.log(err);
                    })
            },
            //安全检测动画
            checkSafe(){
                this.safe = '正在检测您的支付环境'
                this.safeState=true
                let _this = this
                setTimeout(function () {
                    _this.safe = '当前环境安全，请放心支付'
                },1500)
            },
            //获取支付密码输入的值
            getPwdValue(){
                for(let i=0;i<this.realInput.length;i++){
                    this.disInputs[i].value=this.realInput.charAt(i)
                    // 表示字符串中某个位置的数字，即字符在字符串中的下标。
                }
            },
            //删除密码
            delNum(){
                let oEvent = window.event;
                if (oEvent.keyCode === 8) {
                    if(this.realInput.length>0){
                        this.disInputs[this.realInput.length-1].value=''
                    }
                }
            },
            //确认付款
            pay(){
                if (this.realInput ==666666) {
                    //密码正确，改变订单状态
                    this.$http.post('/user/takeOrder.do',qs.stringify({
                        uuid:JSON.parse(localStorage.getItem('userinfo')).uuid,
                        // uuid:'92628a3fbd1044b2aa5c78ccbaf1e7f2',
                        ordersId:this.orderData.ordersId,
                        ordersState:1
                    }))
                        .then((res)=>{
                            console.log(res);
                            if (res.data.returncode ==='200'){
                                // 支付成功，跳转到付款成功页面
                                this.$router.push({name:'paySuccess'})
                            }
                        })
                }else{
                    if (this.payTimes <=1){
                        this.payTimes =0
                        this.nopay = '密码输错3次，请重新登录'
                        let _this = this
                       setTimeout(function () {
                           localStorage.removeItem('userinfo')
                           _this.$router.push({name:'lg'})
                       },1000)
                    } else{
                        --this.payTimes
                        this.nopay = '密码错误,还剩'+this.payTimes+'次机会'
                    }
                     this.isClick()
                }
                // this.$http.post('/order/payment.do',qs.stringify({
                //     // uuid:'92628a3fbd1044b2aa5c78ccbaf1e7f2',
                //     uuid:JSON.parse(localStorage.getItem('userinfo')).uuid,
                //     orderNo:this.orderNo
                // }))
                //     .then((res)=>{
                //         console.log(res.data)
                //         const div = document.createElement('div');
                //         div.innerHTML  = res.data
                //         document.body.appendChild(div)
                //         const form = document.getElementsByTagName('form')[0]
                //         // document.forms[0].acceptCharset='GBK'
                //         form.submit();
                //     })
                // this.$http.post('/order/orderPayment.do',{
                //     // uuid:JSON.parse(localStorage.getItem('userinfo')).uuid,
                //     uuid:'92628a3fbd1044b2aa5c78ccbaf1e7f2',
                //     // payPwd:this.realInput,
                //     orderNo:this.orderNo
                // })
                //     .then((res)=>{
                //         if (res.data.returncode ==='200'){
                //             //密码正确，改变订单状态
                //             this.$http.post('/order/takeOrder',{
                //                 // uuid:JSON.parse(localStorage.getItem('userinfo')).uuid,
                //                 uuid:'92628a3fbd1044b2aa5c78ccbaf1e7f2',
                //                 orderNo:this.orderNo,
                //                 orderState:1
                //             })
                //                 .then((res)=>{
                //                     if (res.data.returncode ==='200'){
                //                         //支付成功，跳转到付款成功页面
                //                         this.$router.push({name:'paySuccess'})
                //                     }
                //                 })
                //         } else{
                //             if (this.payTimes <=1){
                //                 this.payTimes =0
                //                 this.nopay = '密码输错3次，请重新登录'
                //                 localStorage.removeItem('userinfo')
                //                 this.$router.push({name:'lg'})
                //             } else{
                //                 --this.payTimes
                //                 this.nopay = '密码错误,还剩'+this.payTimes+'次机会'
                //             }
                //              this.isClick()
                //         }
                //     })
            },
            //判断按钮是否能够点击
            isClick(){
                console.log(this.orderData.unpay_amount);
                console.log(this.money);
                // if (this.orderData.user_point >=this.orderData.unpayed_point){
                if (this.orderData.unpay_amount < this.money){
                    this.btnState =false
                    if (this.payTimes>0){
                        this.btnState =false
                    }else{
                        this.btnState =true
                    }
                }else{
                    this.btnState =true
                    this.nopay = '账户余额不足，无法完成交易'
                }
                // console.log(this.btnState);
            }
        },
        created() {
            //获取订单流水号和商品的类型
            this.orderNo = localStorage.getItem('orderNo')

            this.getOrderInfo()

            console.log(this.orderNo);
            this.isPoint = localStorage.getItem('isPoint')

        }
    }
</script>

<style scoped>
    .cart-top{
        background-color: #fff;
        box-shadow: 0 3px 10px -3px #a8a8a8;
        height: auto;
        padding: 20px 0 20px 0;
        display: flex;
        justify-content: space-between;
    }
    .cart-step{
        width: 300px;
        height: auto;
        text-align: center;
    }
    .step-icon>.iconfont{
        font-size: 30px!important;
    }
    .step-word{
        margin: 10px auto;
    }
    .step-line{
        margin: 0 auto;
        width: 220px;
        height: 15px;
    }
    .step-line1{
        background: url("../assets/images/gwy/nextstep.png")no-repeat;
        background-size: 100% 100%;
    }
    .step-line2{
        background: url("../assets/images/gwy/nextstep.png")no-repeat;
        background-size: 100% 100%;
    }
    .step-line3{
        background: url("../assets/images/gwy/currentstep.png")no-repeat;
        background-size: 100% 100%;
    }
    .pay-info{
        margin-top: 20px;
        background-color: #fff;
        box-shadow: 0 3px 10px -3px #a8a8a8;
        height: auto;
        padding: 20px;
        display: flex;
        justify-content: space-between;
    }
    .pay-icon{
        width: 8%;
        height: 55px;
    }
    .pay-icon .icon-chenggong{
        font-size: 50px;
    }
    .pay-content{
        width: 91%;
        height: auto;
    }
    .pc-top{
        display: flex;
        justify-content: space-between;
        padding-bottom: 25px;
        border-bottom: 2px solid rgba(193, 191, 191, 0.8);
    }
    .pt-title{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .pt-h3{
        font-weight: bolder;
        font-size: 22px;
    }
    .ordernum{
        margin: 15px 0;
    }
    .ordernum-value{
        color: #f10000;
    }
    .price{
        font-weight: bolder;
        font-size: 22px;
    }
    .price-value{
        font-size: 22px;
        color: #f10000;
    }
    .pc-bottom{
        padding: 20px 0;
    }
    .goods-info{
        margin: 15px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .addr-info::before{
        content: '收货地址：';
        font-weight: 600;
    }
    .goods-info::before{
        content: '商品信息：';
        font-weight: 600;
    }
    .order-time::before{
        content: '下单时间：';
        font-weight: 600;
    }
    .goods_name{
        margin-right: 10px;
    }
    .pay-bottom{
        margin-top: 20px;
        padding: 20px;
        background-color: #fff;
        box-shadow: 0 3px 10px -3px #a8a8a8;
        height: auto;
    }
    .pay-style{
        display: flex;
        padding-bottom: 20px;
        border-bottom: 2px solid rgba(193, 191, 191, 0.8);
        margin-bottom: 20px;
    }
    .style-left{
        width: 10%;
        height: 60px;
        line-height: 60px;
    }
    .style-content{
        width: 50%;
        display: flex;
    }
    .pay-tips,.relsult{
        width: 20%;
        font-weight: bolder;
        height: 100%;
        line-height: 60px;
    }
    .pay-value{
        color: #f10000;
    }
    .relsult .p-in{
        color: #f10000;
    }
    .style-wrap{
        width: 180px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        cursor: pointer;
        margin-right: 35px;
        box-shadow: 0 3px 10px -3px #a8a8a8;
        border: 1px solid #e0e0e0;
        background-color: #ffffff;
    }
    .stylewrap-active{
        background-image: url("../assets/images/gwy/select.png");
        background-repeat: no-repeat;
        background-position:right top;
        background-size: 35px 35px;
        border: 1px solid #111111;
    }
    .pay-pwd .safe{
        margin-bottom: 20px;
        height: 25px;
        line-height: 25px;
        color: #1e89f6;
    }
    .safe .icon-AK-MNdunpai_fill{
        color: #1e89f6;
    }
    .pwd-line{
        margin-bottom: 10px;
        position: relative;
    }
    .rel-pwd{
        width: 168px;
        height: 30px;
        position: absolute;
        opacity: 0;
        border-width: 1px;
    }
    .write-pwd{
        width: 168px;
        background-color: rgba(228, 255, 219, 0.34);
        display: flex;
    }
    .write-pwd li{
        height: 30px;
        width: 28px;

    }
    .write-pwd li input{
        height: 100%;
        width: 100%;
        border-width: 1px;
        text-align: center;
    }
    .forgetpwd{
        color: #1e89f6;
        font-size: 14px;
        cursor: pointer;
        position: absolute;
        left: 175px;
        line-height: 30px;
    }
    .pwd-tips{
        color: #a8a8a8;
        font-size: 14px;
    }
    .pay-btn{
        width: 90px;
        height: 35px;
        background-color: #000000;
        border-radius: 5px;
        border: none;
        outline: none;
        cursor: pointer;
        color: #FFFFFF;
    }
    .pay-btn.abled{
        background-color: #959595;
    }
    .nopay{
        height: 25px;
        line-height: 25px;
        font-size: 14px;
        color: #f10000;

    }
    .pay-code{
        margin-left: 10%;
    }
</style>