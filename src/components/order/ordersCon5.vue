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
                    <div class="orders-btn btn-red take_orders" @click="delOrders(order.ordersId)">删除订单</div>
                </div>
            </div>
        </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "orders-con5",
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
        methods:{
            getOrderInfo(id){
                this.$emit('getOrderInfo',id)
            },
            getGoodsInfo(id){
                localStorage.setItem('goodsId',id)
                this.$router.push({name:'getGoodsInfo'})
            },
            delOrders(id){
                this.$emit('delOrder',id)
            }
        }
    }
</script>

<style scoped>
    .orders-img+span a{
        cursor: pointer;
    }
</style>