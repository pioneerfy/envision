<template>
    <div>
        <Head></Head>

        <div class="ques">
            <span id="search-keyword">如何购买下单？</span>
        </div>
        <section class="txt-wrap">
            <p>1. 浏览您要购买的商品，点击“加入购物车”，商品会自动添加到购物车里；</p>
            <p>2. 如果您需要更改商品数量，需在商品数量框中输入购买数量</p>
            <p>3.选好商品后点击购物车进行结算</p>
            <p>4.详细填写收货人信息、支付方式、发票信息，核对送货清单等信息</p>
            <p>5.确认无误后点击“提交订单”，生成新订单并显示订单编号；</p>
            <p>6.查看订单详细信息：可进入“订单中心”查看。</p>
        </section>

        <Foot></Foot>      
    </div>
</template>

<style scoped>
.ques {
    height: 80px;
    padding: 18px 60px;
    border-top: 2px solid #cccccc;
    border-bottom: 2px solid #cccccc;
    font-size: 28px;
    font-weight: 500;
}
#search-keyword {
    display: block;
    float: left;
}

.txt-wrap {
    margin-top: 60px;
    margin-bottom: 90px;
    margin-left: 120px;
}
.txt-wrap>p {
    margin-top: 20px;
}
</style>

<script>

import Head from '../components/head.vue'
import Foot from '../components/foot.vue'

export default {
    name: 'singlepro',
    components: {
        Head,
        Foot
    }    
}
</script>
