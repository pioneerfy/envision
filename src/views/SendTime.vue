<template>
    <div>
        <!-- 头部 -->
        <Head/>
        <div class="content">
            <h2>
                配送时间：
            </h2>
            <p>
                <h3>一、如约送货</h3>

                <p>由苏宁物流配送的商品，苏宁承诺在订单确认页面显示的送货时间送达该商品。若用户另行约定配送时间，则苏宁按另行约定时间配送。</p>

                <p>特殊说明</p>

                <p>1、若用户要求配送的地址不在苏宁承诺提供服务的区域，则苏宁不提供此服务。</p>

                <p>2、如存在以下特殊情形的，苏宁不承诺在原约定时间内送达：</p>

                <p>1）因用户原因（更改收货地址、地址不详、地址错误、联系不上、要求改期派送、拒收、无代收人、买家自提等）导致商品延误派送或无法送达的；</p>

                <p>2）收件人学校、单位或住宅小区不允许配送人员入内，或用户代收方原因导致延误的；</p>

                <p>3）收件人地址为机关、单位等机构，周六、周日和公众节假日不接收邮件、包裹，造成延误的；</p>

                <p>4）因不可抗力或政府行为造成延误的（“不可抗力”指不可预见、不可避免或不可克服的客观情况以及其他影响配送时间、造成包裹配送延误的客观情况，包括但不限于全国性或区域性空中或地面交通系统管制或中断（如天气原因等）、或通讯系统干扰或故障、邮政主管部门政策变化、战争、地震、台风、洪水、火灾、大雾、大雨等其他类似事件）。</p>
        </div>
    </div>
</template>

<script>
    import Head from '@/components/head.vue'
    export default {
        name: "PayTime",
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
        height: 500px;
        border: 2px solid #cccccc;
        margin: 30px auto;
    }
    p{
        color: #666666;
        font-size: 14px;
        padding: 5px;
    }
</style>