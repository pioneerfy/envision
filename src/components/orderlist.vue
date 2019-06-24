<template>
    <ul class="order-goods">
        <li>
            <div class="g-img" @click="$router.push({name:'detail',query:{goodsId:data.goods_id}})">
                <img :src="url+data.pic_url" alt="" class="img">
            </div>
            <div class="g-info">
                <p class="g-name" @click="$router.push({name:'detail',query:{goodsId:data.goods_id}})">{{data.goods_name}}</p>
            </div>
        </li>
        <li><span class="g-attr">{{data.attr_name}}：{{data.attr_value}}</span></li>
        <li><span class="g-price">{{Number(data.goods_price).toFixed(2)}}</span></li>
        <li>
                     <span class="clear nums-wrap">
                        <input type="text" class="goods-nums" v-model="data.cart_number" disabled="true">
                    </span>
        </li>
        <li>
            <p>普通配送</p>
            <p>快递 免邮</p>
        </li>
        <li>
            <span class="calc-price">{{(Number(data.goods_price) * data.cart_number).toFixed(2)}}</span>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "orderlist",
        props:['data'],
        data(){
            return{
                url:''
            }
        },
        created(){
            this.url=localStorage.getItem('URL')
        }
    }
</script>

<style scoped>
    .order-goods{
        margin-bottom: 8px;
        background-color: #fbfcff;
        display: flex;
        justify-content: space-between;
        padding: 15px 0 ;
        border: 1px solid #bbbbbb;
    }
    .order-goods li{
        font-size: 14px;
    }
    .order-goods li:nth-of-type(1){
        width: 370px;
    }
    .order-goods li:nth-of-type(2){
        width: 220px;
        text-align: center;
    }
    .order-goods li:nth-of-type(3){
        width: 120px;
        text-align: center;
    }
    .order-goods li:nth-of-type(4){
        width: 100px;
        text-align: center;
    }
    .order-goods li:nth-of-type(5){
        width: 120px;
        text-align: center;
    }
    .order-goods li:nth-of-type(6){
        width: 120px;
        text-align: center;
    }
    .g-img{
        margin-left: 15px;
        float: left;
        width: 94px;
        height: 94px;
        margin-right: 5px;
        overflow: hidden;
        border: 1px solid #c6c6c6;
        background-color: #ffffff;
        cursor: pointer;
    }
    .g-img img{
        width: 100%;
        height: 100%;
    }
    .g-info{
        height: 94px;
    }
    .g-name{
        cursor: pointer;
    }
    .choice{
        width: 15px;
        height: 15px;
        cursor: pointer;
    }
    .g-price{
        font-weight: bolder;
    }
    .nums-wrap{
        display: inline-block;
    }
    .reduce,.add{
        float: left;
        width: 19px;
        height: 25px;
        border: none;
        outline: none;
        cursor: pointer;
    }
    .goods-nums{
        float: left;
        width: 41px;
        height: 25px;
        text-align: center;
        border: 1px solid #a3a3a3;
    }

    .g-ctrl{
        margin: 0 auto;
        width: 80%;
    }
    .g-ctrl a{
        color: #444444;
        font-size: 14px;
    }
</style>