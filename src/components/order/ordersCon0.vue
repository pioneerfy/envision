<template>
    <div class="orders" data-index="${ordersArr[i].orders_no}">
        <div class="orders-title">
            <div>订单号：<span id="orders_no">{{order.ordersNo}}</span></div>
            <div>下单时间：<span>{{order.ordersCtime}}</span></div>
        </div>
        <ul class="orders-main" v-for="(good,index) in order.list" :key="index">
            <li>
                <div class="orders-img" :style="{backgroundImage: 'url('+ url + good.url + ')'}"></div>
                <span><router-link class='orders-name' :to="{name:'detail',query:{goodsId:good.goods_id}}">{{good.goods_name}}</router-link></span>
            </li><li>
            <div class="orders-price">￥<span>{{good.goods_price}}</span></div>
        </li><li>
            <div class="orders-num">{{good.number}}</div>
        </li><li>
            <div class="orders-rprice"><span v-if="index==0">￥{{order.ordersRprice}}</span></div>
        </li><li>
            <div class="orders-state"><span v-if="index==0">{{getState}}</span></div>
        </li><li>
            <div class="orders-operate">
                <div  v-if="index==0">
                    <div class="orders-btn check_orders" @click="getOrderInfo(order.ordersId)">查看详情</div>
                    <div class="orders-btn btn-blue pay_orders"><a @click="pay(order.ordersNo,order.ordersPay)">去付款</a></div>
                    <div class="orders-btn btn-red take_orders" @click="cancelOrder(order.ordersId)">取消订单</div>
                </div>
            </div>
        </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "orders-con",
        props:{
            order:Object,
            url:String
        },
        data(){
            return {
                ordersState: ''
            }
        },
        computed: {
            getState() {
                var msg = '';
                switch (this.order.ordersState){
                    case 0 : msg =  '待付款';break;
                    case 1 : msg= '待发货';break;
                    case 2 : msg= '待收货';break;
                    case 3 : msg= '待评价';break;
                    case 4 : msg= '已评价';break;
                    case 5 : msg= '已取消';break;
                }
                return msg;
            }
        },
        created(){
        },
        methods:{
            getOrderInfo(id){
                this.$emit('getOrderInfo',id)
            },
            cancelOrder(id){
                this.$emit('cancelOrder',id)
            },
            pay(id,isPoint){
                localStorage.removeItem('isPoint')
                localStorage.setItem('orderNo',id)
                if(isPoint=='积分'){
                    localStorage.setItem('isPoint',0)
                }
                this.$router.push({name:'pay'})
            },
            getGoodsInfo(id){
                localStorage.setItem('goodsId',id)
                this.$router.push({name:'getGoodsInfo'})
            }
        }
    }
</script>

<style scoped>
    .orders-img+span a{
        cursor: pointer;
    }
</style>