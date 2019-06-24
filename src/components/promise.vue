<template>
    <!--商城承诺-->
    <section class="promise">
        <div class="promise-box">
            <p class="p-icon"><span class="iconfont icon-zhengpinbaozhang"></span></p>
            <p class="p-word">100%官方正品</p>
        </div>
        <div class="promise-box">
            <p class="p-icon"><span class="iconfont icon-tuikuan"></span></p>
            <p class="p-word">无障碍退款</p>
        </div>
        <div class="promise-box">
            <p class="p-icon"><span class="iconfont icon-shouhoubaoyou"></span></p>
            <p class="p-word">消费者保障</p>
        </div>
        <div class="promise-box">
            <p class="p-icon"><span class="iconfont icon-shunfeng-"></span></p>
            <p class="p-word">顺丰包邮</p>
        </div>
    </section>
</template>

<script>
    export default {
        name: "promise"
    }
</script>

<style scoped>
    /*商城承诺*/
    .promise{
        width: 1170px;
        height: auto;
        border-top: 1px dashed #000000;
        border-bottom: 1px dashed #000000;
        margin: 100px auto 50px;
        display: flex;
        justify-content: space-between;
        box-sizing: unset;
        padding: 20px 0;
    }
    .promise-box{
        width: 200px;
        height: 100%;
        text-align: center;
    }
    .p-icon>.iconfont{
        font-size: 45px;
    }
    .p-word{
        margin-top: 20px;
        font-size: 18px;
    }
</style>