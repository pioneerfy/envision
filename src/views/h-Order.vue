<template>
    <div class="order">
        <div class="main">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="所有订单" name="first"><all></all></el-tab-pane>
                <el-tab-pane label="待付款" name="second"><pay></pay></el-tab-pane>
                <el-tab-pane label="待发货" name="third"><deliver></deliver></el-tab-pane>
                <el-tab-pane label="待收货" name="fourth"><harvest></harvest></el-tab-pane>
                <el-tab-pane label="待评价" name="fifth"><ToBeEvaluated></ToBeEvaluated></el-tab-pane>
                <el-tab-pane label="已评论" name="sixth"><evaluate></evaluate></el-tab-pane>
                <el-tab-pane label="所有退款记录" name="seventh"><allrefund></allrefund></el-tab-pane>
                <el-tab-pane label="退款中" name="eighth"><refund></refund></el-tab-pane>
                <el-tab-pane label="已退款" name="ninth"><refunded></refunded></el-tab-pane>

            </el-tabs>




        </div>
    </div>
</template>
<style scoped>
    .order{
        min-width: 1170px;
        min-height: 500px;
    }
    .main{
        width: 1000px;
        margin: 0 auto ;
        padding-top: 30px;
        padding-left: 15px;
    }
    .tab-button {
        padding: 6px 10px;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        border: 1px solid #ccc;
        cursor: pointer;
        background: #f0f0f0;
        margin-bottom: -1px;
        margin-right: -1px;
    }
    .tab-button:hover {
        background: #e0e0e0;
    }
    .tab-button.active {
        background: #e0e0e0;
    }
    .tab {
        border: 1px solid #ccc;
        padding: 10px;
    }
    .table span{
        text-align: center;
        margin: 0 20px 20px;
        cursor: pointer;
    }
    .table{
        width: 100%;
        padding: 20px 0;
        border-bottom: 1px solid black;
    }
    .input{
        padding-top: 20px;
        padding-bottom: 20px;
    }
    .el-input{
        width: 200px;
        margin: 0 40px;
    }
    .form{
        margin-top: 50px;
    }
    .order{
        background: #ffffff;
    }
    .search{
        margin-bottom: 30px;
    }


    .router-link-active {
        text-decoration: none;
    }

</style>
<script>
    import all from '../components/all.vue'
    import pay from '../components/ToBepay.vue'
    import deliver from '@/components/deliver.vue'
    import harvest from '@/components/harvest.vue'
    import ToBeEvaluated from '@/components/ToBeEvaluated.vue'
    import evaluate from '@/components/evaluate.vue'
    import refund from '@/components/refund.vue'
    import refunded from '@/components/refunded.vue'
    import allrefund from '@/components/allrefund.vue'


    export default{
        name:"order",
        data(){
            return{
                activeName: 'first',
                currentTabComponent:'all',

            }
        },
        components:{
            all,
            pay,
            deliver,
            harvest,
            ToBeEvaluated,
            evaluate,
            refund,
            refunded,
            allrefund


        },
        methods: {
            handleClick(tab, event) {
            }
        }

    }

</script>
