<template>
    <footer class="footer">
        <div class="footer-logo"><a href="/"><img src="../assets/logo.png" alt="易美逊购物商城"></a></div>
        <nav class="footer-nav">
            <dl>
                <dt>购物流程</dt>
                <dd><a href="">如何登录/注册</a></dd>
                <dd><a href="">下单流程</a></dd>
            </dl>
            <dl>
                <dt>支付/配送</dt>
                <dd><a href="">货到付款</a></dd>
                <dd><a href="">在线支付</a></dd>
                <dd><a href="">配送时间</a></dd>
            </dl>
            <dl>
                <dt>售后服务</dt>
                <dd><a href="">退换货规定</a></dd>
                <dd><a href="">退款说明</a></dd>
            </dl>
            <dl>
                <dt>关于我们</dt>
                <dd><a href="">公司介绍</a></dd>
                <dd><a href="">联系我们</a></dd>
            </dl>
            <dl>
                <dt>咨询热线</dt>
                <dd>400 800 5678</dd>
            </dl>
        </nav>
        <p class="delacre"><img src="../assets/images/gwy/gnba.png" alt="">XXXX公司版权所有-京ICP备10046444-京公网安备11010802020134号-京ICP证110507号</p>
    </footer>
</template>

<script>
    export default {
        name: "foot"
    }
</script>

<style scoped>
    .footer{
        width: 100%;
        height: auto;
        background-color: #000;
        margin: 0 auto;
        padding: 20px 35px 10px;
    }
    .footer-logo{
        width: 160px;
        height: 70px;
        background-color: #fff;
        margin: 0 auto;
    }
    .footer-logo img{
        width: 100%;
        height: 100%;
    }
    .footer-nav{
        width: 100%;
        height: 120px;
        margin-top: 55px;
        display: flex;
        justify-content: space-between;
    }
    .footer-nav dl dt{
        color: #FFFFFF;
        margin-bottom: 20px;
    }
    .footer-nav dl dd{
        margin-bottom: 13px;
        color: #e0e0e0;
        font-size: 14px;
    }
    .footer-nav dl dd a{
        color: #e0e0e0;
    }
    .footer-nav dl dd a:hover{
        color: #acacac;
    }
    .delacre{
        font-size: 14px;
        text-align: center;
        margin-top: 40px;
        color: #FFFFFF;
    }
    .delacre img{
        vertical-align: middle;
        margin-right: 5px;
        height: 21px;
    }
</style>