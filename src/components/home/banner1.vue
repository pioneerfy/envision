<template>
    <!--banner-->
    <section class="banner">
        <!--轮播图-->
        <div class="swiper-container">
            <div class="swiper-wrapper" >
                <div class="swiper-slide" v-for="(item,index) in banner1_data" :key='index'>
                    <img :src="url+item.bannerUrl" alt="">
                </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
            <!-- 如果需要导航按钮 -->
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next iconfont icon-lunbo"></div>
        </div>

        <!--banner导航-->
        <ul class="banner-nav"  @mouseleave="bannerleave">
            <li class="li-line" >
                <p class="li-title hot-more" @mouseenter="nav_index=0;getBannerGoods()">热门系列 <span class="iconfont icon-lunbo"></span></p>
            </li>
            <li class="li-line">
                <p class="li-title mouth-more" @mouseenter="nav_index=1;getBannerGoods()">唇部系列 <span class="iconfont icon-lunbo"> </span></p>
            </li>
            <li class="li-line" >
                <p class="li-title eyes-more" @mouseenter="nav_index =2;getBannerGoods()">眼部系列 <span class="iconfont icon-lunbo"></span></p>
            </li>
            <li class="li-line">
                <p class="li-title perfume-more" @mouseenter="nav_index=3;getBannerGoods()">香水系列 <span class="iconfont icon-lunbo"></span></p>
            </li>
            <li class="li-line">
                <p class="li-title face-more" @mouseenter="nav_index=4;getBannerGoods()">面部系列 <span class="iconfont icon-lunbo"></span></p>
            </li>
            <li class="li-line">
                <p class="li-title tools-more" @mouseenter="nav_index=5;getBannerGoods()">美容工具 <span class="iconfont icon-lunbo"></span></p>
            </li>
            <li class="li-aside" v-if="nav_index!==-1">
                <div class="li-aside-line goods-detail" v-for="(item,index) in bannerGoodsData.slice(0,5)" :key="index" @click="$router.push({name:'detail',query:{goodsId:item.goods_id}})">
                    <div class="s-img"><img :src="url+item.pic_url" alt=""></div>
                    <p class="s-word">{{item.goods_name}}</p>
                </div>
                <div class="li-aside-line">
                    <p class="s-more tools-more" @click="moreGoods(nav_index)">查看更多<span class="iconfont icon-gengduo1"></span></p>
                </div>
            </li>
        </ul>
    </section>
</template>

<script>
    import Swiper from 'swiper';
    export default {
        name: "banner1",
        data(){
            return{
                banner1_data:'',
                bannerGoodsData:[],
                nav_index:-1,
                url:''
            }
        },
        methods:{
            //初始化banner
            swiperinit(){
                 let  mySwiper = new Swiper ('.swiper-container', {
                    direction: 'horizontal', // 水平切换选项
                    loop: true, // 循环模式选项
                    autoplay:{
                        delay:5000
                    },
                     observeParents: true,
                    // 如果需要分页器
                    pagination: {
                        el: '.swiper-pagination',
                        clickable :true,
                    },
                    // 如果需要前进后退按钮
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }
                });
            },
            //请求banner的数据
            getBanner1Data(){
                this.$http.get('/goods/getBanner2.do',{
                    params:{
                        bannerType:1,
                }})
                    .then((res)=>{
                        console.log('banner1信息',res);
                        this.banner1_data = res.data.data;
                        this.$nextTick(function(){
                            this.swiperinit();
                        })
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
            },
            //获取banner1中的商品数据
            getBannerGoods(){
                console.log(this.nav_index);
                if (this.nav_index===0){
                    //获取热门商品
                    this.$http.get('/goods/getHotGoods.do',{
                        params:{
                            num:5
                        }
                    })
                        .then((res)=>{
                            console.log('热门商品')
                            console.log(res);
                            if (res.data.returncode ==='200'){
                                this.bannerGoodsData = res.data.data
                            }
                        })
                        .catch((err)=>{
                            console.log(err);
                        })
                } else{
                    this.$http.get('/goods/getGoods.do',{
                        params:{
                            goodsTypeId:this.nav_index
                        }
                    })
                        .then((res)=>{
                            console.log(res);
                            if (res.data.returncode ==='200'){
                                this.bannerGoodsData = res.data.data
                            }
                        })
                        .catch((err)=>{
                            console.log(err);
                        })
                }
            },
            //移出banner
            bannerleave(){
                this.nav_index =-1;
            },
            //查看更多
            moreGoods(index){
                if (index ===0){
                    this.$router.push({name:'search',query: {isHot:0}})
                } else{
                    this.$router.push({name:'search',query: { typePidId:index}})
                }
            }
        },
        created() {
            this.getBanner1Data();
            this.url=localStorage.getItem('URL')

        },
        mounted() {

        }
    }
</script>

<style scoped>
    @import '../../assets/plugins/swiper/css/swiper.min.css';

    /*banner*/
    .banner{
        width: 1170px;
        height: 420px;
        margin: 0 auto;
        position: relative;
    }
    .swiper-container,.swiper-wrapper,.swiper-slide{
        width: 100%;
        height: 100%;
        border-radius: 10px;
    }
    .swiper-slide{
        cursor: pointer;
    }
    .swiper-slide img{
        width: 100%;
        height: 100%;
    }
    .swiper-pagination-bullet{
        width: 10px;
        height: 10px;
        background-color: #FFFFFF;
    }
    .swiper-pagination-bullet-active{
        background: #d7d7d7;
    }
    .swiper-button-prev,.swiper-button-next{
        background-image: unset;
    }
    .swiper-container .icon-lunbo{
        height: 60px;
        line-height: 60px;
        margin-top: -30px;
        font-size: 45px!important;
        right: 20px;
        width: 35px;
        text-align: center;
        color: #e8e8e8;
    }
    /*banner导航*/
    .banner-nav{
        width: 160px;
        height: 360px;
        position: absolute;
        background-color: #FFFFFF;
        left: 25px;
        top: calc(50% - 180px);
        z-index: 1;
        border-radius: 8px;
        flex-direction: column;
        display: flex;
        justify-content: space-between;
    }
    .banner-nav .li-line{
        width: 100%;
        height: 60px;
        margin: 0 auto;
        line-height: 60px;
        text-align: center;
        cursor: pointer;
    }
    .li-line .li-title{
        width: 100%;
        height: 100%;
        margin: 0 auto;
    }
    .banner-nav:hover{
        border-radius: 8px 0 0 8px;
    }
    .li-line:hover{
        background-color: #F5F5F5;
    }
    .li-aside{
        position: absolute;
        width: 230px;
        height: 100%;
        background-color: #ffffff;
        left: 100%;
        top: 0;
    }
    .hidden{
        display: none;
    }
    .li-aside-line{
        width: 100%;
        height: 60px;
        text-align: center;
        padding: 11px;
        font-size: 14px;
        cursor: pointer;
    }
    .li-aside-line:hover{
        background-color: #f5f5f5;
    }
    .s-img{
        float: left;
        width: 38px;
        height: 38px;
        margin-right: 5px;
        background-color: #FFFFFF;
    }
    .s-img img{
        width: 100%;
        height: 100%;
    }
    .s-word{
        line-height: 38px;
        height: 38px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        color: #444444;
    }
    .li-aside-line:hover .s-word{
        color: #f10000;
    }
    .s-more{
        line-height: 38px;
        height: 38px;
    }
    .s-more a{
        color: #1e89f6;
    }
    .icon-gengduo1{
        font-size: 14px!important;
        line-height: 38px;
        margin-left: 5px;
        /*vertical-align: middle;*/
    }
    .li-line .icon-lunbo{
        font-size: 14px;
        margin-left: 10px;
    }
</style>