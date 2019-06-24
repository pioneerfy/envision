<template>
    <div>
        <div v-for="(refund,index) in refundsList" :key="index">
            <refund-con :refund="refund" @getRefundInfo="getRefundInfo" :url="url"></refund-con>
        </div>
        <div v-if="refundsList.length==0">
            <div class="err">暂无相关退款记录</div>
        </div>
        <el-dialog
                title="退款记录详情"
                :visible.sync="infoDialogVisible"
                width="800px"
                @close="infoDialogVisible=false">
            <div class="check-modal">
                <div class="modal-content">
                    <!--<div class="clearFix address">-->
                    <!--<h3 class="fl">收货地址：<span id="address">{{refundInfo.address_info}}</span></h3><h3 class="fl">收件人：<span >{{refundInfo.address_name}} {{refundInfo.address_tel}}</span></h3>-->
                    <!--</div>-->
                    <!--<div class="clearFix log">-->
                    <!--<h3 class="fl">物流公司：<span id="log_name">{{refundInfo.log_name}}</span></h3><h3 class="fl">物流编号：<span id="log_number">{{refundInfo.log_number}}</span></h3>-->
                    <!--</div>-->
                    <div class="orders_info">
                        <!--<h3>退款记录信息</h3>-->
                        <ul class="orders_info_top">
                            <li>订单编号：<span id="orders_no">{{refundInfo.ordersNo}}</span></li>
                            <li>下单时间：<span id="orders_ctime">{{refundInfo.ordersCtime}}</span></li>
                            <li>支付流水号：<span id="orders_number">{{refundInfo.ordersNumber}}</span></li>
                            <li>付款时间：<span id="orders_paytime">{{refundInfo.ordersPaytime}}</span></li>
                            <li>支付方式：<span id="orders_pay">{{refundInfo.ordersPay}}</span></li>
                            <li>申请退款时间：<span id="orders_refund">{{refundInfo.refundTime}}</span></li>
                            <li>退款理由：<span id="orders_remark">{{refundReason}}</span></li>
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
                            <ul>
                                <li>
                                    <div class='info_img' :style="{backgroundImage: 'url('+ url + goodUrl + ')'}"></div>
                                    <div class="info_name">{{good.goods_name}}</div>
                                </li>
                                <li>
                                    <div class="info_attr">{{good.attr_name}}{{good.attr_value}}</div>
                                </li>
                                <li>
                                    <div class="info_price">￥<span>{{good.goods_price}}</span></div>
                                </li>
                                <li>
                                    <div class="info_num">{{good.number}}</div>
                                </li>
                                <li>
                                    <div class="info_rprice">￥<span>{{good.zprice}}</span></div>
                                </li>
                            </ul>
                        </div>
                        <div class="orders_info_bottom">
                            <div>退款状态：<span class="info_state">{{refundState}}</span></div>
                            <div>退款金额:<span class="info_rprice">￥{{good.refund_price}}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </el-dialog>
        <el-pagination
                background
                layout="prev, pager, next"
                :current-page.sync="page.currentPage"
                :total="total"
                style="text-align: right"
                @current-change="currentChange"
                v-if="refundsList.length!=0"
        >
        </el-pagination>
    </div>
</template>

<script>
    import refundCon from '@/components/order/refundCon.vue'
    export default {
        name: "refund1",
        components:{
            refundCon
        },
        data() {
            return {
                refundsList: [{}],
                page: {
                    currentPage: 1
                },
                infoDialogVisible: false,
                refundInfo: {},
                orderId: 0,
                total: 0,
                url: '',
                refundReason:'',
                good:{},
                goodUrl:'',
                refundState:''
            }
        },
        created(){
            this.url=localStorage.getItem('URL')
            this.getRefund()
        },
        methods: {
            getRefund() {
                let uuid = JSON.parse(localStorage.getItem('userinfo')).uuid
                console.log('uuid:',uuid)
                this.$http.post('/user/getOrderRefund.do', this.$qs.stringify({
                    uuid: uuid,
                    currentPage: this.page.currentPage,
                    ordersSestate: 1,
                    pageSize: 2
                })).then((res) => {
                    console.log('11111',res)
                    this.refundsList = res.data.data[0]
                    this.page = res.data.data[1]
                    this.total = this.page.totalPage * 10
                }).catch((err) => {
                    console.log(err)
                    this.$message({
                        message: '服务器错误！',
                        type: 'error'
                    });
                })
            },
            currentChange() {
                this.getRefund()
            },
            getRefundInfo(id1,id2) {
                console.log(id1,id2)
                this.infoDialogVisible = true
                let uuid = JSON.parse(localStorage.getItem('userinfo')).uuid
                this.$http.post('/user/getOrderRefundInfo.do', this.$qs.stringify({
                    uuid: uuid,
                    ordersId: id1,
                    attrId:id2
                })).then((res) => {
                    console.log('退款详情',res)
                    this.refundInfo = res.data.data[0]
                    this.refundInfo.list[0].zprice = (this.refundInfo.list[0].goods_price) * (this.refundInfo.list[0].number)
                    this.refundReason=this.refundInfo.list[2].refundReason
                    this.good=this.refundInfo.list[0]
                    this.goodUrl=this.refundInfo.list[1]
                    console.log('11111',this.goodUrl)
                    switch (this.good.is_refund) {
                        case 1 :
                            this.refundState = '退款中';
                            break;
                        case 2 :
                            this.refundState = '已退款';
                            break;
                    }
                }).catch((err) => {
                    console.log(err)
                })
            },
        }
    }
</script>

<style scoped>

</style>