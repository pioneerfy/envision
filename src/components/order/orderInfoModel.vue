<template>
    <el-dialog
            title="订单信息"
            :visible.sync="infoDialogVisible"
            width="30%"
            @close="infoDialogVisible=false">
        <div class="modal check-modal">
            <div class="modal-title"><h2 class="del-h">订单信息</h2> <span class="close iconfont icon-guanbi"></span></div>
            <div class="modal-content">
                <h3>收货地址：<span id="address">${res.data1[0].orders_address}</span></h3>
                <div class="clearFix log">
                    <h3 class="fl">物流公司：<span id="log_name">${res.data1[0].log_name}</span></h3><h3 class="fr">物流编号：<span id="log_number">${res.data1[0].log_number}</span></h3>
                </div>
                <div class="orders_info">
                    <h3>订单信息</h3>
                    <ul class="orders_info_top">
                        <li>订单编号：<span id="orders_no">${res.data1[0].orders_no}</span></li>
                        <li>下单时间：<span id="orders_ctime">${ctime}</span></li>
                        <li>支付流水号：<span id="orders_number">${res.data1[0].orders_number}</span></li>
                        <li>付款时间：<span id="orders_paytime">${ptime}</span></li>
                        <li>订单备注：<span id="orders_remark">${res.data1[0].order_remark}</span></li>
                    </ul>
                    <div class="con-title">
                        <ul>
                            <li>商品名称</li>
                            <li>商品属性</li>
                            <li>单价</li>
                            <li>数量</li>
                            <li>商品总价</li>
                        </ul>
                    </div>
                    <div class="con-main">
                    </div>
                    <div class="orders_info_bottom">
                        <div>订单状态：<span class="info_state">${state}</span></div>
                        <div>订单总金额：<span class="info_rprice">￥${res.data1[0].orders_rprice}</span></div>
                    </div>
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "order-info-model",
        props:{
            isVisible:Boolean,
            orderInfo:Object
        },
        data(){
            return{
                infoDialogVisible:false
            }
        }
    }
</script>

<style scoped>

</style>