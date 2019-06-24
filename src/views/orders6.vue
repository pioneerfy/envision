<template>
    <div>
        <div v-for="(order,index) in ordersList" :key="index">
            <orders-con5  :order="order" @getOrderInfo="getOrderInfo" @delOrder="delOrder" :url="url"></orders-con5>
        </div>
        <div v-if="ordersList.length==0">
            <div class="err">暂无相关订单信息</div>
        </div>
        <el-dialog
                title="订单信息"
                :visible.sync="infoDialogVisible"
                width="800px"
                @close="infoDialogVisible=false">
            <div class="check-modal">
                <div class="modal-content">
                    <div class="clearFix address">
                        <h3 class="fl">收货地址：<span id="address">{{orderInfo.address_info}}</span></h3><h3 class="fl">收件人：<span >{{orderInfo.order_name}} {{orderInfo.order_tel}}</span></h3>
                    </div>
                    <div class="clearFix log">
                        <h3 class="fl" v-if="orderInfo">物流公司：<span id="log_name">{{orderInfo.log_name}}</span></h3><h3 class="fl">物流编号：<span id="log_number">{{orderInfo.log_number}}</span></h3>
                    </div>
                    <div class="orders_info">
                        <h3>订单信息</h3>
                        <ul class="orders_info_top">
                            <li>订单编号：<span id="orders_no">{{orderInfo.orders_no}}</span></li>
                            <li>下单时间：<span id="orders_ctime">{{orderInfo.orders_ctime}}</span></li>
                            <li>支付流水号：<span id="orders_number">{{orderInfo.orders_number}}</span></li>
                            <li>付款时间：<span id="orders_paytime">{{orderInfo.orders_paytime}}</span></li>
                            <li>退款时间：<span id="orders_refund">{{orderInfo.refund_time}}</span></li>
                            <li>发货时间：<span id="orders_begin">{{orderInfo.begin_time}}</span></li>
                            <li>收货时间：<span id="orders_end">{{orderInfo.end_time}}</span></li>
                            <li>订单备注：<span id="orders_remark">{{orderInfo.order_remark}}</span></li>
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
                            <ul v-for="(good,index) in orderInfo.attr" :key="index">
                                <li>
                                    <div class='info_img' :style="{backgroundImage: 'url('+ url + good.url + ')'}"></div>
                                    <div class="info_name">{{good.goods_name}}</div>
                                </li>
                                <li>
                                    <div class="info_attr">{{good.attr_name}}:{{good.attr_value}}</div>
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
                            <div>订单状态：<span class="info_state">{{orderInfo.state}}</span></div>
                            <div>订单总金额：<span class="info_rprice">￥{{orderInfo.orders_price}}</span></div>
                            <div>订单实付金额:<span class="info_rprice">￥{{orderInfo.orders_rprice}}</span></div>
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
                v-if="ordersList.length!=0"
        >
        </el-pagination>
    </div>
</template>

<script>
    import ordersCon5 from '@/components/order/ordersCon5.vue'
    export default {
        name: "orders6",
        components: {
            ordersCon5
        },
        data() {
            return {
                ordersList: [{}],
                page: {
                    currentPage: 1
                },
                infoDialogVisible: false,
                AlertDialogVisible: false,
                orderInfo: {},
                orderId: 0,
                total: 0,
                url:''
            }
        },
        created() {
            this.url=localStorage.getItem('URL')
            this.getOrder()
        },
        methods: {
            getOrder() {
                let uuid = JSON.parse(localStorage.getItem('userinfo')).uuid
                this.$http.post('/user/getOrders.do', this.$qs.stringify({
                    uuid: uuid,
                    ordersState:5,
                    currentPage: this.page.currentPage,
                    pageSize: 2
                })).then((res) => {
                    console.log(res)
                    this.ordersList = res.data.data[0]
                    console.log(this.ordersList)
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
                this.getOrder()
            },
            delOrder(data){
                let uuid=JSON.parse(localStorage.getItem('userinfo')).uuid
                this.$http.post('/user/deleOrders.do',this.$qs.stringify({
                    uuid:uuid,
                    ordersId:data
                })).then((res)=>{
                    if(res.data.returncode=="200") {
                        this.$message({
                            message:'删除订单成功',
                            type: 'success'
                        })
                        this.getOrder()
                    }else {
                        this.$message({
                            message:'删除订单失败',
                            type: 'success'
                        })
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            getOrderInfo(data) {
                this.infoDialogVisible = true
                let uuid = JSON.parse(localStorage.getItem('userinfo')).uuid
                this.$http.post('/user/getOrderInfo.do', this.$qs.stringify({
                    uuid: uuid,
                    ordersId: data,
                })).then((res) => {
                    console.log(res)
                    this.orderInfo = res.data.data[0]
                    for (let i = 0; i < this.orderInfo.attr.length; i++) {
                        this.orderInfo.attr[i].zprice = (this.orderInfo.attr[i].goods_price) * (this.orderInfo.attr[i].number)
                    }
                    switch (this.orderInfo.orders_state) {
                        case 0 :
                            this.orderInfo.state = '待付款';
                            break;
                        case 1 :
                            this.orderInfo.state = '待发货';
                            break;
                        case 2 :
                            this.orderInfo.state = '待收货';
                            break;
                        case 3 :
                            this.orderInfo.state = '待评价';
                            break;
                        case 4 :
                            this.orderInfo.state = '已评价';
                            break;
                        case 5 :
                            this.orderInfo.state = '已取消';
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