<template>
    <div>
        <!--头部-->
        <div class="top">
            <h1>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>首页</el-breadcrumb-item>
                </el-breadcrumb>
            </h1>
        </div>

        <!--交易信息-->
        <section class="transaction-section">
            <div class="transaction-wrap">
                <div class="value">100</div>
                <p class="key">昨日交易额</p>
            </div>
            <div class="transaction-wrap">
                <div class="value">100</div>
                <p class="key">待付款</p>
            </div>
            <div class="transaction-wrap">
                <div class="value">100</div>
                <p class="key">待发货</p>
            </div>
            <div class="transaction-wrap">
                <div class="value">100</div>
                <p class="key">退货申请</p>
            </div>
            <div class="transaction-wrap">
                <div class="value">100</div>
                <p class="key">已取消</p>
            </div>
        </section>

        <!--分类、分品牌销量-->
        <section class="Sales-volume">
            <div class="brand-volume"></div>
            <div class="type-volume"></div>
        </section>

    </div>
</template>

<script>

    export default {
        name: "managehome",
        data(){
            return{
                msg: 'Welcome to Your Vue.js App'
            }
        },
        methods:{
            drawLine(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart'))
                // 绘制图表
                myChart.setOption({
                    title: { text: '在Vue中使用echarts' },
                    tooltip: {},
                    xAxis: {
                        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                });
            }
        },
        mounted() {
            // this.drawLine()
        }
    }
</script>

<style scoped>
/*头部信息*/
.top{
    width: 100%;
    height: 50px;
    border-bottom: #444444;
    line-height: 50px;
    background-color: #fff;
    padding-left: 15px;
    border-bottom: 1px solid #e6e6e6;
}
.top h1 .el-breadcrumb{
    line-height: 50px;
}
.el-breadcrumb{
    font-size: 16px;
}
/*交易信息*/
.transaction-section{
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
}
.transaction-wrap{
    height: auto;
    width: 220px;
    background-color: #ffffff;
    /*box-shadow: 0 3px 6px -3px #a8a8a8;*/
    border: 1px solid #e6e6e6;
    padding: 10px 0;
}
.value{
    width: 75px;
    height: 75px;
    background-color: #E6A23C;
    border-radius: 50%;
    margin: 0 auto;
    text-align: center;
    line-height: 80px;
    color: #ffffff;
    font-size: 30px;
    font-weight: bolder;
}
.key{
    text-align: center;
    margin-top: 10px;
    letter-spacing: 2px;
    font-size: 18px;
    color: #E6A23C;
    font-weight: bolder;
}
.Sales-volume{
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
}
.Sales-volume>div{
    padding: 20px;
    border: 1px solid #e6e6e6;
    background-color: #ffffff;
    margin-top: 50px;
    width: 45%;
    height: 300px;
}
</style>