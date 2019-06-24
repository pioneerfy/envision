<template>
    <div class="orders" data-index="${ordersArr[i].orders_no}">
        <div class="orders-title">
            <div>订单号：<span id="orders_no">{{refund.ordersNo}}</span></div>
            <div>下单时间：<span>{{refund.ordersCtime}}</span></div>
        </div>
        <ul class="orders-main" v-for="(good,index) in refund.list" :key="index">
            <li>
                <div class="orders-img" :style="{backgroundImage: 'url('+ url + good.goods_pic + ')'}"></div>
                <span><router-link class='orders-name' :to="{name:'detail',query:{goodsId:good.goods_id}}">{{good.goods_name}}</router-link></span>
            </li><li>
            <div class="orders-price">￥<span>{{good.goods_price}}</span></div>
        </li><li>
            <div class="orders-num">{{good.number}}</div>
        </li><li>
            <div class="orders-rprice"><span>￥{{good.refund_price}}</span></div>
        </li><li>
            <div class="orders-state"><span>{{good.is_refund==1?'退款中':'已退款'}}</span></div>
        </li><li :class="index==0?'':'border'">
            <div class="orders-operate">
                <div>
                    <div class="orders-btn check_orders" @click="getRefundInfo(refund.ordersId,good.attr_id)">查看详情</div>
                </div>
            </div>
        </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "refund-con",
        props:{
            refund:Object,
            url:String
        },
        data(){
            return {

            }
        },
        methods:{
            getRefundInfo(id,attrid){
                this.$emit('getRefundInfo',id,attrid)
            }
        }
    }
</script>

<style scoped>
    .orders ul li:nth-child(4){
        border-left: none;
        border-top: 1px solid #ececec
    }
    .orders ul li:nth-child(5){
        border-left: none;
        border-top: 1px solid #ececec
    }
    .orders ul li.border{
        border-top: 1px solid #ececec;
    }
</style>