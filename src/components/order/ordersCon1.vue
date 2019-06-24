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
            </li><li :class="index==0?'':'border'">
                <div class="orders-operate">
                    <div>
                        <div class="orders-btn check_orders"  v-if="index==0" @click="getOrderInfo(order.ordersId)">查看详情</div>
                        <div class="orders-btn btn-red take_orders" v-show="good.is_refund==0&&order.ordersPay!='积分'"><router-link :to="{name:'refundQequest',query:{ordersId:order.ordersId,goodsId:good.goods_id,attrId:good.attr_id}}">申请退款</router-link></div>
                        <div style="text-align: center" v-show="good.is_refund==1">退款中</div>
                        <div style="text-align: center" v-show="good.is_refund==2">已退款</div>
                    </div>
                </div>
            </li>
            </ul>
    </div>
</template>

<script>
    export default {
        name: "orders-con1",
        props:{
            order:Object,
            url:String
        },
        data(){
            return{

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
            getGoodsInfo(id){
                localStorage.setItem('goodsId',id)
                this.$router.push({name:'getGoodsInfo'})
            }
        }
    }
</script>

<style scoped>
    .orders ul li.border{
        border-top: 1px solid #ececec;
    }
    .orders-img+span a{
        cursor: pointer;
    }
</style>