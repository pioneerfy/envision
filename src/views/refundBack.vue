<template>
    <div class="order">
        <div class="main">
            <el-tabs v-model="activeName">
                <el-tab-pane label="所有记录" name="first"><all></all></el-tab-pane>
                <el-tab-pane label="退款中" name="second"><refund1></refund1></el-tab-pane>
                <el-tab-pane label="已退款" name="third"><refund2></refund2></el-tab-pane>
            </el-tabs>




        </div>
    </div>
</template>
<style scoped>
    .order{
        width: 1170px;
        min-height: 500px;
    }
    .main{
        width: 1000px;
        margin: 0 auto ;
        padding-top: 30px;
        padding-left: 15px;
        text-align: center;
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
    .refundSearch{
        margin-bottom: 30px;
    }


    .router-link-active {
        text-decoration: none;
    }

</style>
<script>
    import all from '../components/refundBack/refundAllBack'
    import refund1 from '../components/refundBack/refundBack1'
    import refund2 from '../components/refundBack/refundBack2'
    export default {
        name: "refund-back",
        data(){
            return{
                activeName: 'first',
                currentTabComponent:'all',

            }
        },
        components:{
            all,
            refund1,
            refund2
        },
    }
</script>
