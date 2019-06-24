<template>
    <div class="sbody">
        <div class="content">
            <div class="wrap">
                <h1>我的订单</h1>
                <ul id="order-nav">
                    <li><router-link to="/myOrders" exact>全部订单记录</router-link></li>
                    <li><router-link to="/myOrders/orders1">待付款</router-link></li>
                    <li><router-link to="/myOrders/orders2">待发货</router-link></li>
                    <li><router-link to="/myOrders/orders3">待收货</router-link></li>
                    <li><router-link to="/myOrders/orders4">待评价</router-link></li>
                    <li><router-link to="/myOrders/orders5">已评价</router-link></li>
                    <li><router-link to="/myOrders/orders6">已取消</router-link></li>
                </ul>
                <div class="form">
                    <div class="con-title">
                        <ul>
                            <li>商品名称</li><li>单价</li><li>数量</li><li>实付款</li><li>状态</li><li>操作</li>
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
        name: "my-orders",
        data(){
            return {
                infoDialogVisible:false,
            }
        }
    }
</script>

<style>
    #Loading {
        top: 50%;
        left: 50%;
        position: absolute;
        -webkit-transform: translateY(-50%) translateX(-50%);
        transform: translateY(-50%) translateX(-50%);
        z-index: 100;
    }
    @-webkit-keyframes ball-beat{
        50% {
            opacity: 0.2;
            -webkit-transform: scale(0.75);
            transform: scale(0.75);
        }
        100% {
            opacity: 1;
            -webkit-transform: scale(1);transform: scale(1);
        }
    }
    @keyframes ball-beat {
        50% {
            opacity: 0.2;
            -webkit-transform: scale(0.75);
            transform: scale(0.75);
        }
        100% {
            opacity: 1;
            -webkit-transform: scale(1);
            transform: scale(1);
        }
    }
    .ball-beat > div {
        background-color: #279fcf;
        width: 10px;
        height: 10px;
        border-radius: 100% ! important;
        margin: 2px;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        display: inline-block;
        -webkit-animation: ball-beat 0.7s 0s infinite linear;
        animation: ball-beat 0.7s 0s infinite linear;
    }
    .ball-beat > div:nth-child(2n-1) {
        -webkit-animation-delay: 0.35s ! important;
        animation-delay: 0.35s
    }

    .orders-operate a:-webkit-any-link{
        color: white;
    }
    .el-dialog .el-dialog__body{
        padding: 10px 20px 10px 20px;
    }
    #orders-content .el-pagination.is-background .el-pager li:not(.disabled).active{
        background-color: #111;
    }
    #orders-content .el-pagination.is-background .el-pager li:not(.disabled):hover{
        color: white;
        background-color: #111;
    }
    .sbody.router-link-active{
        text-decoration: none;
        color: black;
        font-weight: bold;
    }
    .sbody .router-link-exact-active{
        text-decoration: none;
        color: black;
        font-weight: bold;
    }
    .sbody a:-webkit-any-link {
        color: black;
    }
    .sbody .content{
        padding: 20px 0px;
    }
    .sbody .wrap{
        padding: 0 80px;
    }
    .sbody .content h1{
        font-size: 24px;
        font-weight: bold;
        border-bottom: 1px solid #BBBBBB;
        padding-bottom: 30px;
    }

    .sbody #order-nav{
        padding: 20px 0;
    }
    .sbody #order-nav li{
        display: inline-block;
        border-right: 1px solid #e0e0e0;
        padding: 0 20px;
        color: #757575;
        cursor: pointer;
    }
    .sbody #order-nav .active{
        font-weight: bold;
        color: black;
    }
    .sbody #order-nav li:hover{
        font-weight: bold;
    }
    .sbody .con-title{
        background-color: #111111;
        color: #ececec;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        margin-bottom: 10px;
    }
    .sbody .con-title ul li {
        display: inline-block;
        text-align: center;
    }
    .sbody .con-title ul li:nth-child(1){
        width: 320px;
    }
    .sbody .con-title ul li:nth-child(2){
        width: 100px;
    }
    .sbody .con-title ul li:nth-child(3){
        width: 90px;
    }
    .sbody .con-title ul li:nth-child(4){
        width: 100px;
    }
    .sbody .con-title ul li:nth-child(5){
        width: 100px;
    }
    .sbody .con-title ul li:nth-child(6){
        width: 110px;
    }
    .sbody .orders ul li{
        display: inline-block;
        height: 130px;
        padding: 25px 20px;
        vertical-align: top;
        border-top: 1px solid #ececec;
    }
    .sbody .orders ul li:nth-child(1){
        width: 320px;
        /*background-color: #2aabd2;*/
    }
    .sbody .orders ul li:nth-child(2){
        width: 100px;
        /*background-color: #00a0af;*/
    }
    .sbody .orders ul li:nth-child(3){
        width: 90px;
        /*background-color: #00c3b6;*/
    }
    .sbody .orders ul li:nth-child(4){
        width: 100px;
        /*background-color: #1e89f6;*/
        border-top: none;
        border-left: 1px solid #ececec;
    }
    .sbody .orders ul li:nth-child(5){
        width: 100px;
        /*background-color: #2a5394;*/
        border-top: none;
        border-left: 1px solid #ececec;
        border-right:  1px solid #ececec;
    }
    .sbody .orders ul li:nth-child(6){
        width: 110px;
        padding: 8px 20px;
        border-top: none;
        /*background-color: #2e6da4;*/
    }
    .sbody .orders .orders-main:nth-child(2) li:nth-child(4){
        border-top:  1px solid #ececec;
    }
    .sbody .orders .orders-main:nth-child(2) li:nth-child(5){
        border-top:  1px solid #ececec;
    }
    .sbody .orders .orders-main:nth-child(2) li:nth-child(6){
        border-top:  1px solid #ececec;
    }
    .sbody .orders{
        box-shadow: 0 3px 10px -3px #a8a8a8;
        font-size: 12px;
        padding-bottom: 10px;
        margin-bottom: 20px;
    }
    .sbody .orders-title{
        background-color: #ececec;
        font-size: 12px;
        padding-left: 20px;
        height: 30px;
        line-height: 30px;
    }
    .sbody .orders-title div{
        display: inline-block;
        margin-right: 20px;
    }
    .sbody .orders-main:last-child{
        border-bottom: 1px solid #ececec;
    }
    .sbody .orders-main .orders-img{
        display: inline-block;
        width: 80px;
        height: 80px;
        background-size: cover;
        background-position: center;
    }
    .sbody .orders-main .orders-img+span{
        display: inline-block;
        vertical-align: top;
        padding-top: 20px;
        width: 190px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .sbody .orders-main .orders-name{
        vertical-align: top;
    }
    .sbody .orders-main .orders-name:hover{
        text-decoration: underline;
        cursor: pointer;
    }
    .sbody .orders-main .orders-num,.orders-rprice,.orders-price,.orders-state{
        padding-top: 20px;
        text-align: center;
    }
    .sbody .orders-operate .orders-btn:last-child{
        margin-bottom: 0;
    }
    .sbody .orders-btn{
        padding: 8px 10px;
        border-radius: 5px;
        background-color: #111111;
        color: white;
        cursor: pointer;
        margin-bottom: 5px;
        transition: all .2s;
        border: 1px solid #cccccc;
        text-align: center;
    }
    .sbody .orders-btn a{
        text-decoration:none;
        out-line: none;
        color:white;
    }
    .sbody .btn-blue{
        background-color: #1e89f6;
    }
    .sbody .btn-red{
        background-color: red;
    }
    .sbody .err{
        padding-top: 50px;
        padding-bottom: 50px;
        font-size: 18px;
        text-align: center;
        color: #888888;
    }
    .sbody .pay_orders a{
        color: white;
    }
    /*模态框*/
    .sbody .modal{
        position: fixed;
        width: 300px;
        background-color: #f5f5f5;
        left: calc(50% - 150px);
        top:-200px;
        z-index: 6;
        padding: 10px 15px;
        border-radius: 5px;
        visibility: hidden;
        transition: all 0.3s;
    }
    .sbody .check-modal{
        width: 100%;
    }
    .sbody .modal-title{
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #bbbbbb;
    }
    .sbody .del-h{
        float: left;
        font-weight: 600;
    }
    .sbody .close{
        float: right;
        font-size: 12px!important;
        vertical-align: middle;
        cursor: pointer;
    }
    .sbody .check-modal h3{
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 5px;
    }
    .sbody .del-p{
        margin: 30px 0;
    }
    .sbody .modal-content{
        margin: 10px 0;
        font-size: 12px;
    }
    .sbody .btn-wrap{
        text-align: center;
    }
    .sbody .btn-wrap button{
        padding: 6px 12px;
        border: none;
        outline: none;
        background-color: #000;
        color: #FFFFFF;
        border-radius: 5px;
        cursor: pointer;
        margin-right: 20px;
    }
    .sbody .check-modal .log h3:first-child{
        width: 372px;
        padding-bottom: 10px;
    }
    .sbody .check-modal .address h3:first-child{
        width: 372px;
        padding-bottom: 10px;
    }
    .sbody .orders_info{
        border-top: 1px solid #dbdbdb;
        padding-top: 10px;
    }
    .sbody .orders_info_top{
        padding: 0 10px;
    }
    .sbody .orders_info_top li{
        display: inline-block;
        width: 246px;
        margin-bottom: 5px;
    }
    .sbody .orders_info_top li:last-child{
        width: 100%;
        margin-bottom: 5px;
    }
    .sbody .check-modal .con-title{
        font-size: 0;
    }
    .sbody .check-modal .con-title li{
        font-size: 12px;
    }
    .sbody .check-modal .con-title li:first-child{
        width: 315px;
    }
    .sbody .check-modal .con-title li:nth-child(2){
        width: 110px;
    }
    .sbody .check-modal .con-title li:nth-child(3){
        width: 100px;
    }
    .sbody .check-modal .con-title li:nth-child(4){
        width: 90px;
    }
    .sbody .check-modal .con-title li:nth-child(5){
        width: 120px;
    }
    .sbody .check-modal .con-main li{
        height: 80px;
        display: inline-block;
        vertical-align: top;
        font-size: 12px;
        padding: 10px;
    }
    .sbody .check-modal .con-title{
        margin-bottom: 0;
        margin-top: 10px;
    }
    .sbody .check-modal .con-main{
        font-size: 0;
        border-bottom: 1px solid #d9d9d9;
        border-left:  1px solid #d9d9d9;
        border-right:  1px solid #d9d9d9;
        box-shadow: 0 3px 10px -3px #a8a8a8;
        max-height: 165px;
        overflow: auto;
    }
    .sbody .check-modal .con-main ul{
        border-bottom: 1px solid #d9d9d9;
    }
    .sbody .check-modal .con-main li{
        font-size: 12px;
        text-align: center;
    }
    .sbody .check-modal .con-main li:first-child{
        width: 315px;
        text-align: left;
    }
    .sbody .check-modal .con-main li:nth-child(2){
        width: 110px;
    }
    .sbody .check-modal .con-main li:nth-child(3){
        width: 100px;
    }
    .sbody .check-modal .con-main li:nth-child(4){
        width: 90px;
    }
    .sbody .check-modal .con-main li:nth-child(5){
        width: 118px;
    }
    .sbody .check-modal .con-main li div{
        padding-top: 10px;
    }
    .sbody .con-main{
        color: #888888;
    }
    .sbody .con-main .info_img{
        display: inline-block;
        width: 60px;
        height: 60px;
        /*background-color: red;*/
        background-size: cover;
        background-position: center;
    }
    .sbody .con-main .info_name{
        display: inline-block;
        vertical-align: top;
        margin-left: 5px;
        padding-top: 10px;
    }
    .sbody .orders_info_bottom{
        margin-top: 10px;
        text-align: right;
    }
    .sbody .orders_info_bottom div{
        display: inline-block;
        margin-left: 20px;
    }
    .sbody .orders_info_bottom .info_rprice{
        font-size: 14px;
        color: red;
        font-weight: bold;
    }
    .sbody .check-modal span{
        font-size: 12px;
        color: #888;
        font-weight: normal;
    }
    .sbody .check-modal .info_state{
        font-size: 14px;
        color:black;
        font-weight: bold;
    }
    /*滚动条样式*/
    .sbody .con-main::-webkit-scrollbar{
        width: 8px;
        height: 0;
    }
    .sbody .con-main::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: #666666;
    }
    .sbody .con-main::-webkit-scrollbar-track { /*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background: #dedede;
    }

    /*分页*/
    .pagination {
        margin-top: 20px;
        text-align: right;
    }
    .pagination button {
        width: 28px;
        padding: 5px 0;
        margin-right: 10px;
        border: 1px solid #e2e2e2;
        background-color: white;
        color: #888;
        outline: none;
        border-radius: 5px;
        cursor: pointer;
        text-align: center;
    }
    .pagination .on {
        background-color: #111111;
        color: #fff;
        border: none;
    }
    .sbody .btn-wrap button{
        padding: 6px 25px;
        border: none;
        outline: none;
        background-color: #000;
        color: #FFFFFF;
        border-radius: 5px;
        cursor: pointer;
    }
    .sbody .btn-wrap button:nth-child(1){
        margin-right: 15px;
    }
    .sbody .btn-wrap .del-close{
        background-color: #FFFFFF;
        color: #000;
        border: 1px solid #cccccc;
    }
    .sbody .btn-wrap .del-sure:hover{
        background-color: #333333;
    }
    .sbody .btn-wrap .del-close:hover{
        background-color: #e9e9e9;
    }
</style>