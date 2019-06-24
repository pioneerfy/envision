<template>
    <div class="container clear">
        <!--图片-->
        <router-link :to="{name:'detail',query:{goodsId:item.goods_id}}" type='div' class="demo" data-index="" v-for="item in goodsInfo" :key="item.goods_id">
            <div class="img">
                <img :src="url+item.pic_url">
                <div class="stock"></div>
            </div>
            <div class="descript">
                <h2 v-html="item.goods_name"></h2>
                <p class="price">￥&nbsp;{{item.goods_price.toFixed(2)}}</p>
            </div>
        </router-link>
    </div>
</template>

<script>

    export default {
        name: "typeContent",
        props: ['goodsInfo'],
        data(){
            return{
                url: ''
            }
        },
        created(){
            this.url=localStorage.getItem('URL')
        }
    }
</script>

<style scoped>
    .clear::before,
    .clear::after{
        display: table;
        content: '';
    }
    .clear::after{
        clear: both;
    }
    /* 热门商品 */
    #hot-div{
        background: #cccccc;
    }
    #hot-div>h2,#lip>h2,#foundation>h2,#eye>h2,#perfume>h2,#tool>h2{
        color: #333333;
        text-align: center;
        padding: 10px 0 !important;
    }
    .hot .swiper-container,.container{
        padding: 10px 0;
    }
    .hot .swiper-slide:not(:last-child),.demo:not(:nth-child(4n)){
        margin-right: 18px;
    }
    .hot .swiper-slide,.demo{
        position: relative;
        width: 271.5px;
        transition: all linear .2s;
        background-color: #ffffff;
        cursor: pointer;
        margin-bottom: 20px;
    }
    .demo:not(:last-child){
        margin-bottom: 20px;
    }
    .hot .swiper-slide:hover,.demo:hover{
        box-shadow: #666 0 0 10px;
    }
    .hot .swiper-button-next, .hot .swiper-button-prev{
        top: 155px;
        z-index: 100;
    }

    .demo{
        float: left;
    }
    .img img{
        width: 271.5px;
        height: 271.5px;
        cursor: pointer;
        transition: all linear .2s;
    }
    .stock{
        position: absolute;
        width: 271.5px;
        height: 355.5px;
        background: rgba(255,255,255,.4);
        transition: all linear .2s;
        top: 0;
        left: 0;
        text-align: center;
        line-height: 271.5px;
        opacity: 0;
    }
    .descript{
        width: 100%;
        height: 80px;
        padding: 5px 10px;
    }
    .descript h2{
        font-weight: 500;
    }
    .descript h2,.descript p{
        padding: 5px;
        color: #333333;
        text-align: center;
    }
    .descript p{
        font-weight: 600;
    }
</style>