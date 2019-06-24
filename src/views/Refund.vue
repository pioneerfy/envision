<template>
    <div class="sbody">
        <div class="content">
            <div class="wrap">
                <h1>退款记录</h1>
                <ul id="order-nav">
                    <li><router-link to="/refund" exact>全部退款记录</router-link></li>
                    <li><router-link to="/refund/refund1">退款中</router-link></li>
                    <li><router-link to="/refund/refund2">已退款</router-link></li>
                </ul>
                <div class="form">
                    <div class="con-title">
                        <ul>
                            <li>商品名称</li><li>单价</li><li>数量</li><li>退款金额</li><li>状态</li><li>操作</li>
                        </ul>
                    </div>
                    <div id="orders-content">
                        <router-view/>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "refund",
        created(){

        }
    }
</script>

<style scoped>

</style>