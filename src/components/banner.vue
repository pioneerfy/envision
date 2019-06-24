<template>
    <div id="banner">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,index) in banners" :key="index">
                    <router-link  tag="a" :to="{name:'detail',query:{goodsId:item.goods_id}}">
                        <img :src="item.banner_url" alt="pic">
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
</template>

<script>
import Swiper from 'swiper';
export default {
  name: 'banner',
  props: ['brandId'],
  data () {
    return {
        banners: [
          {
            goods_id: 1,
            banner_url: require('../assets/images/dior/dior-banner-01.jpg')
          },
          {
            goods_id: 2,
            banner_url: require('../assets/images/dior/dior-banner-02.jpg')
          },
          {
            goods_id: 3,
            banner_url: require('../assets/images/dior/dior-banner-03.jpg')
          }
      ],
    }
  },
  methods: {
// 请求轮播图信息
    getBanner() {
        this.$http.get('goods/dior/banner.do',{
            params: {brandId: this.brandId,}
        })
        .then((res) => {
            console.log(res.data.data[0])
            this.banners = res.data.data[0]
        })
        .catch()
    }
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
  },
  created() {
    //   this.getBanner()
  }
}
</script>

<style scoped>
    @import '../assets/plugins/swiper/css/swiper.min.css';
</style>
