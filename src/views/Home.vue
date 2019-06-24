<template>
  <div>
    <Head></Head>
    <main class="main">
        <!--右边导航-->
        <aside class="right-nav">
            <div class="rv-line cart" @click="$router.push({name:'shopCart'})"><span class="iconfont icon-gouwuche"></span></div>
            <div class="rv-line usercenter" @click="$router.push({name:'userInfo'})"><span class="iconfont icon-personalCenter"></span></div>
            <div class="rv-line returntop" @click="returnTop()"><span class="iconfont icon-huidaodingbu"></span></div>
        </aside>

        <banner1></banner1>
        <banner2></banner2>
        <goodspart :title="item" v-for="(item,index) in goodspart_title" :key="index"></goodspart>
        <promise></promise>
    </main>
    <foot></foot>
  </div>
</template>

<script>
// @ is an alias to /src
import Head from '@/components/head.vue'
import Foot from '@/components/foot.vue'
import Banner1 from '@/components/home/banner1.vue'
import Banner2 from '@/components/home/banner2.vue'
import Goodspart from '@/components/home/goodspart.vue'
import Promise from '@/components/promise.vue'


export default {
  name: 'home',
  components: {
    Head,Banner1,Banner2,Goodspart,Promise,Foot
  },
    data(){
      return {
          goodspart_title:[{name:'热门',typeid:0},{name:'唇部',typeid:1},{name:'眼部',typeid:2},{name:'香水',typeid:3},{name:'面部',typeid:4},{name:'美容工具',typeid:5}],
          banner3_data:[],
          banner4_data:[]
      }
    },
    mounted() {
        //初始化右边导航的位置
        const main = document.getElementsByClassName('main')[0]
        const nav = document.getElementsByClassName('right-nav')[0]
        let left = main.offsetWidth+30;
        let h = document.body.clientHeight/2;
        nav.style.left = left+'px'
        nav.style.top = h+'px';
      //监听滚动事件
        window.addEventListener('scroll', this.handleScroll)
    },
    destroyed () {//离开该页面需要移除这个监听的事件
        window.removeEventListener('scroll', this.handleScroll)
    },
    methods:{
      //滚动事件
        handleScroll () {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            let h = scrollTop+ document.body.clientHeight/2;
            const nav = document.getElementsByClassName('right-nav')[0];
            const footer = document.getElementsByClassName('footer')[0];
            nav.style.top = h+'px';
            let endt = footer.offsetTop-footer.offsetHeight;
            if (scrollTop >=endt-500) {
                    nav.style.top = endt+'px'
                }
        },
        //回到顶部
        returnTop(){
            let returntopTimer = setInterval(function () {
                let top = document.body.scrollTop || document.documentElement.scrollTop;
                let speed = top / 4;
                if (document.body.scrollTop!=0) {
                    document.body.scrollTop -= speed;
                }else {
                    document.documentElement.scrollTop -= speed;
                }
                if (top === 0) {
                    clearInterval(returntopTimer);
                }
            },20);
        },
        //获取banner3
        getBanner3(){
            this.$http.get('/goods/getBanner2.do',{
                params:{
                    bannerType:3,
                }})
                .then((res)=>{
                    console.log('banner3信息',res);
                    this.banner3_data = res.data.data;
                    //遍历goodspart
                    for (let i=0;i<this.goodspart_title.length;i++){
                        this.goodspart_title[i].banner3url = this.banner3_data[i].bannerUrl
                    }
                })
                .catch((err)=>{
                    console.log(err);
                })
        },
        //获取banner4
        getBanner4(){
            this.$http.get('/goods/getBanner2.do',{
                params:{
                    bannerType:4,
                }})
                .then((res)=>{
                    console.log('banner4信息',res);
                    this.banner4_data = res.data.data;
                    //遍历goodspart
                    for (let i=0;i<this.goodspart_title.length;i++){
                        this.goodspart_title[i].banner4url = this.banner4_data[i].bannerUrl
                    }
                })
                .catch((err)=>{
                    console.log(err);
                })
        },
    },
    created() {
      this.getBanner3()
      this.getBanner4()
        console.log(this.goodspart_title);
      localStorage.setItem('URL','')
        // localStorage.setItem('URL',config.url)
    }
}
</script>

<style scoped>
    /*右边导航*/
    .right-nav{
        width: 48px;
        height: 150px;
        background-color: #ffffff;
        position: absolute;
        transition: top 10ms;
        box-shadow: 0 3px 10px -3px #a8a8a8;
    }
    .rv-line{
        width: 100%;
        height: 50px;
        text-align: center;
        line-height: 50px;
        cursor: pointer;
        transition: background-color 200ms;
    }
    .rv-line:hover{
        background-color: #a5a5a5;
    }
    .rv-line:hover .iconfont{
        color: #ffffff;
    }
    .rv-line .iconfont{
        font-size: 22px;
        color: #a5a5a5;
        transition: color 200ms;
    }
</style>
