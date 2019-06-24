<template>
    <div class="main">
        <Head></Head>
        <!--轮播-->
        <el-carousel indicator-position="none">
            <el-carousel-item v-for="(item,index) in imgdata" :key="index">
                <img class="bannerImg" :src='item.idView' alt="">
            </el-carousel-item>
        </el-carousel>
        <!--介绍-->
        <div class="introduction">
            <h1>香奈儿美妆</h1>
            <p>自然时尚、精致优雅、迷人诱惑,<br>通透的光泽与色彩，打造光彩夺目的动人妆容。
            </p>
        </div>
        <!--<div class="sale" v-for="item in dataTil" :key="item.id">-->
            <!--<div class="title-other">-->
            <!--{{item.til}}-->
        <!--</div>-->
        <!--<div class="goods" data-goodstype=8 >-->
            <!--<div class="goods-module"  v-for="(dataimg,dex) in item.img" :key="dex">-->
            <!--<div class="goods-pic" data-goodsID=""><img :src="dataimg" alt=""></div>-->
            <!--<h3>123</h3>-->
            <!--<p class="goods-price">￥200.00</p>-->
            <!--</div>-->
            <!--</div>-->
            <!--<div class="more">-->
            <!--查看更多-->
            <!--</div>-->
        <!--</div>-->
        //
            <div class="sale" v-for="item in dataTils" :key="item.id">
                <div class="title-other">
                {{item.til}}
                </div>
                <!--男士香水-->
                <div class="goods" v-for="(itema,l) in item.info" :key="l">
                    <div class="goods-module"   :goodstype_id="itema.goodstype_id">
                    <div class="goods-pic" data-goodsID="">
                        <img :src="url+itema.pic_url" alt=""></div>
                        <h3>{{itema.goods_name}}</h3>
                        <p class="goods-price">￥{{itema.goods_price.toFixed(2)}}</p>
                    </div>
                </div>
                <div class="more">查看更多</div>
            </div>
        <Foot></Foot>
        </div>

</template>
<script>
    import Head from"../components/head.vue";
    import Foot from "../components/foot.vue";
    export default {
        data() {
            return {
                datasAll:[],
                imgdata: [
                    {id: 0, idView: require("../assets/images/chanel/eyebanner.jpg")},
                    {id: 1, idView: require("../assets/images/chanel/fun-banner.jpg")},
                    {id: 2, idView: require("../assets/images/chanel/lipbanner.jpg")}
                ],
                dataTils: [
                    {
                        id: 0, til: '男士香水',
                        info: []
                    },
                    {
                        id: 1, til: '唇部',
                        info: []
                    }
                    ,
                    {
                        id: 2, til: '眼部',
                        info: []
                    }
                    ,
                    {
                        id: 3, til: '底妆',
                        info: []
                    }
                    ,
                    {
                        id: 4, til: '眉毛',
                        info: []

                    },
                    {
                        id: 5, til: '美妆工具',
                        info: []
                    }
                ],
                url:''
            }
        },
        components:{
            Head,
            Foot
        },
        created(){
            this.url=localStorage.getItem('URL')
            this.goodsinfo(2,0)//香水
            this.goodsinfo(7,1)//唇部
            this.goodsinfo(3,2)//眼部
            this.goodsinfo(12,3)//底妆
            this.goodsinfo(10,4)//眉毛
            this.goodsinfo(5,5)//美妆工具
        },
        methods:{
           goodsinfo(gti,sub){
               this.$http.get('/goods/dior.do',{
                   params:{

                       // goodsTypeId=11&brandId=1&goodsTypePid=3&current=&size=&isHot=0
                   goodsTypeId:gti,
                   brandId: 1,
                   current: 1,
                   size: 3
           }
               })
                   .then(res =>{
                       if(res.status==200){
                           //数据处理
                           var newArray=res.data.data.filter(function (item,index){
                               if(index>0) return item
                           })
                           console.log(newArray[0][0],1)
                           for(let i=0;i<newArray.length;i++){
                               for(let j=0;j<newArray.length;j++){
                                   this.dataTils[sub].info.push(newArray[i][j])
                                   // this.datasAll=this.datasAll.concat(newArray[i][j])
                               }
                           }
                           console.log(this.datasAll,'对象')
                       }else{
                           console.log(res)
                       }

                   })
                   .catch(err => {
                       console.log(err)
                   })
           }
        }


    }
</script>
<style scoped>
    @import "../assets/css/chanel.css";
</style>