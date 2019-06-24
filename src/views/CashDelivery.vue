<template>
    <div>
        <!-- 头部 -->
        <Head/>
        <div class="content">
            <h2>
                货到付款范围：
            </h2>
            <p>易美逊在全国大部分城市中开通了货到付款服务。</p>

             <p>您可选择现金、POS机刷卡、支票的方式支付货款：</p>

             <p>POS机刷卡：目前仅支持带有银联标识的银行卡，信用卡POS机刷卡消费赠送积分以各银行为准，具体信息请致电发卡行确认。若您下单时在订单中填写POS机刷卡，支付时也可换成现金支付。</p>

             <p>支票支付：需要您将支票内容填写完整且需要款到账后方可送货，目前仅北京、上海两地客户可使用此服务，其余区域暂不支持支票支付。支票支付详情查询请点击此处</p>

             <p>其中，京东快递配送时可支持现金、POS机刷卡、支票支付（仅限北京、上海两个地区）。（具体支付方式您可与为您送货时的配送员联系咨询）</p>
        </div>
    </div>
</template>

<script>
    import Head from '@/components/head.vue'
    export default {
        name: "CashDelivery",
        components: {
            Head
        }
    }
</script>

<style scoped>
    h2{
        font-size: 16px;
        font-weight: bolder;
        padding: 10px 0;
    }
.content{
    padding: 50px;
    width: 50%;
    height: 400px;
    border: 2px solid #cccccc;
    margin: 30px auto;
}
    p{
        color: #666666;
        font-size: 14px;
        padding: 5px;
    }
</style>