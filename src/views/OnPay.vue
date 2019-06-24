<template>
    <div>
        <!-- 头部 -->
        <Head/>
        <div class="content">
            <h2>
                在线支付方式：
            </h2>
            <p>支付宝--扫码支付</p>

            <p>1、余额支付</p>
            <p>为了您能使用余额支付服务进行消费、转账以及购买投资理财等金融类产品（以支付账户类型支持为准），我们需要记录您的支付账户余额信息以及交易信息。如您不同意我们记录前述信息，可能无法使用余额支付服务。</p>
            <p>2、快捷支付</p>
            <p>为了您能使用快捷支付服务，实现使用银行卡对支付宝账户余额的充值、提现以及基于银行卡的消费、转账及购买投资理财等金融类产品，您需提供您的开户行名称、银行卡卡号、银行卡有效期、姓名、身份证号码、银行预留手机号。我们会将前述信息与发卡银行进行验证。在您使用快捷支付服务时，我们需要记录您的交易信息。如您不提供前述信息，可能无法使用快捷支付服务，但不影响您使用我们提供的其他服务。</p>
        </div>
    </div>
</template>

<script>
    import Head from '@/components/head.vue'
    export default {
        name: "OnPay",
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