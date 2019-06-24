<template>
    <div>
        <Head></Head>
        <main class="main">
            <div class="pay-su">
                <!--图标-->
                <div class="ps-icon">
                    <span class="iconfont icon-chenggong"></span>
                </div>
                <!--内容-->
                <div class="ps-content" >
                    <div class="ps-line1">您已经成功付款 <span class="ps-value1">{{orderData.unpay_amount}}</span> 元</div>
                    <div class="ps-line2">收货地址：<span class="ps-value2">{{orderData.order_address}}</span> </div>
                    <div class="ps-line3">付款时间：<span class="ps-value3">{{orderData.ordersPaytime}}</span></div>
                    <div class="ps-line4"><router-link to="/">返回首页</router-link> <router-link to="/myOrders" class="toOrder">查看订单</router-link> </div>
                </div>

                <!--<div class="ps-content" v-if="isPoint!==undefined">-->
                    <!--<div class="ps-line1">您已经成功支付积分 <span class="ps-value1">{{orderData.unpayed_point}}</span> 分</div>-->
                    <!--<div class="ps-line2">收货地址：<span class="ps-value2">{{orderData.order_address}}</span> </div>-->
                    <!--<div class="ps-line3">付款时间：<span class="ps-value3">{{orderData.payed_time}}</span></div>-->
                    <!--<div class="ps-line4"><router-link to="/">返回首页</router-link> <router-link to="/myOrders" class="toOrder">查看订单</router-link> </div>-->
                <!--</div>-->
            </div>

            <!--为你推荐-->
            <Recommend></Recommend>
        </main>
        <Foot></Foot>
    </div>
</template>

<script>
    import Head from '@/components/head.vue'
    import Foot from '@/components/foot.vue'
    import Recommend from '@/components/recommend.vue'
    export default {
        name: "paySuccess",
        components:{
            Head,Foot,Recommend
        },
        data(){
            return{
                orderNo:'',
                isPoint:'',
                orderData:[]
            }
        },
        methods:{
            //查询订单信息
            getOrders(){
                this.$http.get('/order/selectOrder.do',{
                    params:{
                        uuid:JSON.parse(localStorage.getItem('userinfo')).uuid,
                        orderNo:this.orderNo
                    }
                })
                    .then((res)=>{
                        this.orderData = res.data.data[0]
                        console.log(this.orderData);
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
            }
        },
        created() {
            //获取订单流水号和商品的类型
            this.orderNo = localStorage.getItem('orderNo')
            this.isPoint = localStorage.getItem('isPoint')

            //获取订单信息
            this.getOrders()
        }
    }
</script>

<style scoped>
    .pay-su{
        background-color: #fff;
        box-shadow: 0 3px 10px -3px #a8a8a8;
        height: auto;
        padding: 20px;
        display: flex;
        justify-content: space-between;
    }
    .ps-icon{
        width: 8%;
        height: 55px;
    }
    .ps-icon .icon-chenggong{
        font-size: 50px;
    }
    .ps-content{
        width: 91%;
        height: auto;
    }
    .ps-line1{
        font-weight: bolder;
        font-size: 20px;
    }
    .ps-value1{
        color: #f10000;
    }
    .ps-line2{
        margin: 20px 0;
    }
    .ps-line3{
        margin-bottom: 20px;
    }
    .ps-line4 a{
        margin-right: 20px;
        color: #1e89f6;
    }
    /*为你推荐*/
    .recommend{
        margin: 50px auto;
        width: 100%;
        height: auto;
        text-align: center;
    }
    .recommend-title{
        font-size: 18px;
        font-weight: bolder;
    }
    .recommend-content{
        margin-top: 15px;
        width: 100%;
        height: auto;
        display: flex;
        justify-content: space-between;
    }
    .recommend-wrap{
        width: 230px;
        height: 240px;
        border-radius: 5px;
        padding: 30px 5px 0 5px;
        cursor: pointer;
        background-color: #fff;
        box-shadow: 0 3px 10px -3px #a8a8a8;
    }
    .recommend-img{
        width: 160px;
        height: 130px;
        margin: 0 auto 20px;
    }
    .recommend-img img{
        width: 100%;
        height: 100%;
    }
    .recommend-name{
        font-weight: bolder;
        margin-bottom: 10px;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
    }
    .recommend-price{
        color: #ff6037;
        font-size: 14px;
    }
</style>