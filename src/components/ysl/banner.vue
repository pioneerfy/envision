<template>
    <div class="ysl-banner">
        <div class="banner" v-if="banners">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item,index) in banners" :key="index">
                        <router-link  tag="a" :to="{name:'detail',query:{goodsId:item.goods_id}}">
                            <img :src="url+item.banner_url" alt="pic">
                        </router-link>
                    </div>
                </div>
                <!-- 分页 -->
                <div class="swiper-pagination"></div>
                <!-- 按钮 -->
                <div class="swiper-button-prev swiper-button-white"></div>
                <div class="swiper-button-next swiper-button-white"></div>
            </div>
        </div>
    </div>
</template>

<script>
    // import { mapState } from 'vuex'
    import Swiper from 'swiper';
    export default {
        name: 'banner',
        props: ['brandId'],
        data () {
            return {
                banners:  [
                    {
                        banner_url: require('../../assets/images/dxm/52.jpg'),
                        goods_id: 52
                    },{
                        banner_url: require('../../assets/images/dxm/49.jpg'),
                        goods_id: 49
                    },{
                        banner_url: require('../../assets/images/dxm/50.jpg'),
                        goods_id: 50
                    }
                ],
                url:''
            }
        },
        methods: {
            // 获取 banners
            /*getBanner() {
                this.$http.get('goods/dior/banner.do',{
                    params: {brandId: this.brandId}})
                    .then((res) => {
                        console.log(res.data)
                        if (res.data.returncode==='200') {
                            this.banners = res.data.data[0]
                        }
                    })
                .catch(err => {
                    console.log(err)
                })
            },*/
        },
        created() {
            // this.url=localStorage.getItem('URL')
            // this.getBanner();
        },
        mounted(){
            new Swiper ('.swiper-container', {
                autoplay: true,
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    dynamicBullets: true,
                    dynamicMainBullets: 2
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            })
        }
    }
</script>

<style scoped>
    @import '../../assets/plugins/swiper/css/swiper.min.css';
    .ysl-banner .banner{
        width: 1140px;
        margin: 0 auto;
        /*padding: 15px;*/
        padding: 15px 0;
    }
    .ysl-banner .banner img{
        height: 320px;
        cursor: pointer;
    }
    .ysl-banner .banner .swiper-pagination-bullet{
        width: 10px;
        height: 10px;
        background: #cccccc;
    }
    .ysl-banner .banner .swiper-pagination-bullet-active{
        background: #b3d4fc;
    }
</style>
